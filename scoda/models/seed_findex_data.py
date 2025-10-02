from ..app import app
import pandas as pd
from scoda.models.findex_african_table import CoreFinancialInclusion, FindexIndicator
from sqlalchemy.exc import SQLAlchemyError

CHUNK_SIZE = 50000

def seed_financial_inclusion_mapped(db):
    """Seed CoreFinancialInclusion in long format from CSV, matching group + group2 exactly"""

    metadata_path = f"{app.root_path}/data/Africa_FindexDatabase2025_V2_Metadata.csv"
    data_path = f"{app.root_path}/data/Copy_Africa_FindexDatabase2025_Data_Africa.csv"

    # --- Step 1. Load metadata (for numeric columns) ---
    meta_df = pd.read_csv(metadata_path, usecols=['Series'], encoding='utf-8-sig')
    numeric_cols = [c.strip().lower().replace('.', '_') for c in meta_df['Series']]
    print(f"Found {len(numeric_cols)} numeric columns (series) in metadata.")

    # --- Step 2. Load data ---
    df = pd.read_csv(
        data_path,
        encoding='utf-8-sig',
        keep_default_na=False,
        na_values=['', 'NA', 'N/A', 'NULL'],
        low_memory=False
    )
    df.columns = [col.strip().lower().replace('.', '_') for col in df.columns]

    # --- Step 3. Clean categorical columns ---
    categorical_cols = [
        'countrynewwb', 'codewb', 'continent', 'africanunion_region',
        'regionwb24_hi', 'incomegroupwb24', 'group', 'group2', 'year', 'pop_adult'
    ]
    for col in categorical_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip()

    # --- Step 4. Clean numeric columns (% -> float) ---
    for col in numeric_cols:
        if col in df.columns:
            df[col] = (
                df[col].astype(str)
                       .str.replace('%', '', regex=False)
                       .str.strip()
                       .replace({'': None, 'na': None, 'n/a': None, 'null': None})
                       .astype(float)
            )

    # --- Step 5. Load indicator lookup from DB ---
    indicators = db.session.query(FindexIndicator).all()
    indicator_lookup = {
        (i.series.strip().lower().replace('.', '_'), i.group2.strip().lower()): i.id
        for i in indicators
    }
    indicator_name_lookup = {
        (i.series.strip().lower().replace('.', '_'), i.group2.strip().lower()): i.indicator_name
        for i in indicators
    }
    print(f"Loaded {len(indicators)} indicators from FindexIndicator table.")

    missing_keys = set()
    all_records = []

    # --- Step 6. Iterate over rows ---
    for row in df.itertuples(index=False):
        row_dict = row._asdict()

        group_key = row_dict.get('group')
        group2_key = row_dict.get('group2')
        if not group_key or not group2_key:
            continue  # skip rows with missing grouping info

        group2_norm = group2_key.strip().lower()

        for series in numeric_cols:
            if series not in row_dict:
                continue

            key = (series, group2_norm)
            indicator_id = indicator_lookup.get(key)
            indicator_name = indicator_name_lookup.get(key)

            if indicator_id is None:
                missing_keys.add(key)
                continue

            record = {
                'countrynewwb': row_dict.get('countrynewwb'),
                'codewb': row_dict.get('codewb'),
                'continent': row_dict.get('continent'),
                'africanunion_region': row_dict.get('africanunion_region'),
                'year': int(row_dict.get('year')) if row_dict.get('year') else None,
                'pop_adult': float(row_dict.get('pop_adult')) if row_dict.get('pop_adult') else None,
                'regionwb24_hi': row_dict.get('regionwb24_hi'),
                'incomegroupwb24': row_dict.get('incomegroupwb24'),
                'group': group_key,
                'group2': group2_key,
                'series': series,
                'indicator_id': indicator_id,
                'indicator_name': indicator_name,
                'value': row_dict[series]
            }
            all_records.append(record)

        # Insert in chunks
        if len(all_records) >= CHUNK_SIZE:
            try:
                db.session.bulk_insert_mappings(CoreFinancialInclusion, all_records)
                db.session.commit()
                print(f"✅ Inserted {len(all_records)} rows")
            except SQLAlchemyError as e:
                print(f"❌ Error inserting chunk: {e}")
                db.session.rollback()
            all_records = []

    # --- Step 7. Insert remaining records ---
    if all_records:
        try:
            db.session.bulk_insert_mappings(CoreFinancialInclusion, all_records)
            db.session.commit()
            print(f"✅ Inserted {len(all_records)} rows")
        except SQLAlchemyError as e:
            print(f"❌ Error inserting final chunk: {e}")
            db.session.rollback()

    # --- Step 8. Log missing mappings ---
    if missing_keys:
        print("⚠️ Missing (series, group2) mappings that were skipped:")
        for key in sorted(missing_keys):
            print(f" - {key}")

    print("🎉 Finished seeding CoreFinancialInclusion in long format.")
