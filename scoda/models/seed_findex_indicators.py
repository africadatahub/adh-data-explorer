from ..app import app
import pandas as pd
from datetime import datetime
from scoda.models.findex_african_table import FindexIndicator
from sqlalchemy.exc import SQLAlchemyError

CHUNK_SIZE = 10000

# Define group mapping
group_map = {
    "all": ["all"],
    "gender": ["men", "women"],
    "income": ["richest 60%", "poorest 40%"],
    "age_cat": ["age 25+", "ages 15-24"],
    "laborforce": ["out of laborforce", "in laborforce"],
    "education": ["secondary edu or more", "prim edu or less"]
}

def seed_findex_indicators(db):
    """Seed Findex indicators metadata with group mappings (optimized)"""
    
    metadata_path = f"{app.root_path}/data/Africa_FindexDatabase2025_V2_Metadata.csv"

    # 1. Load metadata
    meta_df = pd.read_csv(
        metadata_path,
        sep=",",
        encoding="utf-8-sig",
        keep_default_na=False
    )
    meta_df.columns = [col.strip().lower().replace(' ', '_') for col in meta_df.columns]

    # Keep only required metadata columns
    meta_df = meta_df[['series', 'indicator_name', 'short_definition', 'source',
                       'unit_of_measure', 'periodicity', 'reference_period']]

    # 2. Convert group_map to DataFrame
    group_df = pd.DataFrame([
        {"group": k, "group2": v} 
        for k, vals in group_map.items() 
        for v in vals
    ])

    # 3. Cross merge metadata with group mappings
    meta_df['key'] = 1
    group_df['key'] = 1
    expanded_df = pd.merge(meta_df, group_df, on='key').drop('key', axis=1)

    # 4. Construct indicator_name with group2
    expanded_df['indicator_name'] = expanded_df['group2'] + " - " + expanded_df['indicator_name']
    expanded_df['created_at'] = datetime.utcnow()

    print(f"Prepared {len(expanded_df)} metadata records for DB insertion.")

    # 5. Insert into DB in chunks
    total_inserted = 0
    for start in range(0, len(expanded_df), CHUNK_SIZE):
        chunk = expanded_df.iloc[start:start + CHUNK_SIZE].to_dict(orient='records')
        try:
            db.session.bulk_insert_mappings(FindexIndicator, chunk)
            db.session.commit()
            total_inserted += len(chunk)
            print(f"✅ Inserted chunk {start}-{start + len(chunk)-1}")
        except SQLAlchemyError as e:
            print(f"❌ Error inserting chunk {start}-{start + len(chunk)-1}: {e}")
            db.session.rollback()

    print(f"🎉 Successfully seeded {total_inserted} Findex indicator metadata records.")
