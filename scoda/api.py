import json

import gviz_api
import pandas as pd
from flask import jsonify, request

from scoda.app import app, db, redisClient
from scoda.constants import AFRICAN_COUNTRIES, CHART_COLOURS
from scoda.models.codebook_temp_table import CbTempIndicators
from scoda.models.datasets import Indicator
from scoda.models.findex_african_table import CoreFinancialInclusion, FindexIndicator


def _build_explore_payload(filtered_df, include_regions=False, region_column='african_regions'):
  years = sorted(filtered_df['year'].dropna().unique())
  cities = sorted(filtered_df['re_name'].unique())
  datasets = sorted(filtered_df['ds_name'].unique())

  options_list = [{'optid': i, 'optname': d} for i, d in enumerate(datasets, start=1)]
  years_list = [{'optid': i, 'optname': 'Year: %s' % y} for i, y in enumerate(years, start=1)]
  plot_type = 2 if len(datasets) > 1 or len(years) == 1 else 1

  series = {i: {'color': CHART_COLOURS[i]} for i in range(len(datasets))}
  view = [0] + list(range(2, len(datasets) + 2))

  head = ['City', 'Year'] + [str(dataset) for dataset in datasets]
  if include_regions:
    head.append('Region')
  table = [head]

  for city in cities:
    for year in years:
      row = [str(city), str(year)]
      for dataset in datasets:
        datapoint = filtered_df.loc[
          (filtered_df['re_name'] == city)
          & (filtered_df['year'] == year)
          & (filtered_df['ds_name'] == dataset),
          'value',
        ]
        row.append(float(datapoint.iloc[0]) if not datapoint.empty else None)

      if include_regions:
        region_row = filtered_df.loc[
          (filtered_df['re_name'] == city) & (filtered_df['year'] == year),
          region_column,
        ]
        region = region_row.iloc[0] if not region_row.empty and pd.notna(region_row.iloc[0]) else 'None'
        row.append(str(region))

      table.append(row)

  table_plot = []
  if plot_type == 1 and datasets:
    df_subset = filtered_df.iloc[:, [0, 1, 3]]
    schema = [('City', 'string'), ('Year', 'string'), ('%s' % datasets[0], 'number')]
    data_table = gviz_api.DataTable(schema)
    data_table.LoadData(df_subset.values)
    table_plot = data_table.ToJSon(columns_order=('City', datasets[0], 'Year'))

  min_val = float(filtered_df['value'].min())
  max_val = float(filtered_df['value'].max()) * 1.1

  payload = {
    'plot': 1,
    'table': table,
    'table_plot': table_plot,
    'colours': CHART_COLOURS,
    'year': str(max(years)) if len(years) else None,
    'series': series,
    'view': view,
    'plot_type': plot_type,
    'min': min_val,
    'max': max_val,
    'cities': list(cities),
    'options_list': options_list,
    'years_list': years_list,
    'years': ['Year'] + [str(year) for year in years[::-1]],
  }

  if include_regions:
    payload['regions'] = sorted(filtered_df[region_column].dropna().unique())
    pivot_df = filtered_df.pivot_table(
      index='year', columns='ds_name', values='value', aggfunc='mean'
    ).reset_index()
    payload['averages'] = {
      str(int(row['year'])): {dataset: row[dataset] for dataset in datasets}
      for _, row in pivot_df.iterrows()
    }

  return payload


def _normalize_indicator_frame(df):
  df = df.rename(columns={'name': 're_name', 'name.1': 'ds_name'})
  if 'start_dt' in df.columns and df['start_dt'].notnull().any():
    df['year'] = df['start_dt']
  elif 'end_dt' in df.columns and df['end_dt'].notnull().any():
    df['year'] = df['end_dt']
  return df.drop_duplicates()


def _filter_african_countries(df):
  return df[df['re_name'].isin(AFRICAN_COUNTRIES)]


# -------------------- WDI --------------------

@app.route('/api/indicators-list/codebook', methods=['GET'])
def api_wdi_indicators():
  indicators_list = [[str(indicator.id), indicator.in_name] for indicator in Indicator.query.all()]
  return jsonify(indicators_list)


def get_data_from_cache(indicator_id):
  cached_data = redisClient.get(f'indicator_{indicator_id}')
  return json.loads(cached_data) if cached_data else None


def fetch_data_from_db(indicator_id):
  query_result = (
    db.session.query(CbTempIndicators)
    .filter(CbTempIndicators.indicator_id == indicator_id)
    .with_entities(
      CbTempIndicators.re_name,
      CbTempIndicators.start_dt,
      CbTempIndicators.ds_name,
      CbTempIndicators.value,
    )
  )

  return [
    {
      're_name': row.re_name,
      'start_dt': row.start_dt,
      'ds_name': row.ds_name,
      'value': row.value,
    }
    for row in query_result
  ]


def store_data_in_cache(indicator_id, data):
  redisClient.setex(f'indicator_{indicator_id}', 3600, json.dumps(data))


@app.route('/api/explore/codebook', methods=['GET', 'POST'])
def api_wdi_explore():
  indicator_id = request.args.get('indicator_id', 76)
  cities = request.args.getlist('city')

  cached_data = get_data_from_cache(indicator_id)
  if cached_data is None:
    cached_data = fetch_data_from_db(indicator_id)
    store_data_in_cache(indicator_id, cached_data)

  if not cached_data:
    return jsonify({})

  df = pd.DataFrame(cached_data)
  if cities:
    df = df[df['re_name'].isin(cities)]
  if df.empty:
    return jsonify({})

  df = _normalize_indicator_frame(df)
  filtered_df = _filter_african_countries(df)
  if filtered_df.empty:
    return jsonify({})

  return jsonify(_build_explore_payload(filtered_df))


# -------------------- FINDEX --------------------

def get_findex_data_from_cache(indicator_id):
  key = f'findex:core_financial_inclusion:indicator_{indicator_id}'
  cached_data = redisClient.get(key)
  return json.loads(cached_data) if cached_data else None


def store_findex_data_in_cache(indicator_id, data):
  key = f'findex:core_financial_inclusion:indicator_{indicator_id}'
  redisClient.setex(key, 3600, json.dumps(data))


def fetch_findex_data_from_db(indicator_id):
  query_result = (
    db.session.query(
      CoreFinancialInclusion.countrynewwb,
      CoreFinancialInclusion.year,
      CoreFinancialInclusion.indicator_name,
      CoreFinancialInclusion.africanunion_region,
      CoreFinancialInclusion.value,
    )
    .filter(CoreFinancialInclusion.indicator_id == indicator_id)
    .all()
  )

  return [
    {
      're_name': row.countrynewwb,
      'start_dt': row.year,
      'ds_name': row.indicator_name,
      'value': float(row.value) if row.value is not None else None,
      'african_regions': row.africanunion_region,
    }
    for row in query_result
  ]


@app.route('/api/findex/indicators-list/codebook', methods=['GET'])
def api_findex_indicators():
  indicators_list = [
    [str(indicator.id), indicator.indicator_name.capitalize(), indicator.short_definition]
    for indicator in FindexIndicator.query.all()
  ]
  return jsonify(indicators_list)


@app.route('/api/findex/codebook', methods=['GET', 'POST'])
def api_findex_explore():
  indicator_id = request.args.get('indicator_id', 76, type=int)

  data = get_findex_data_from_cache(indicator_id)
  if data is None:
    data = fetch_findex_data_from_db(indicator_id)
    store_findex_data_in_cache(indicator_id, data)

  if not data:
    return jsonify({})

  df = pd.DataFrame(data)
  if df.empty:
    return jsonify({})

  df = _normalize_indicator_frame(df)
  filtered_df = _filter_african_countries(df)
  if filtered_df.empty:
    return jsonify({})

  return jsonify(_build_explore_payload(filtered_df, include_regions=True))
