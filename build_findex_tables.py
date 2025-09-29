from sqlalchemy import text, inspect
from scoda.models import db
from scoda.models.findex_african_table import FindexIndicator, CoreFinancialInclusion
from scoda.models.seed_findex_indicators import seed_findex_indicators
from scoda.models.seed_findex_data import seed_financial_inclusion_mapped

def refresh_data():
    """Safely refresh only FindexIndicator and CoreFinancialInclusion tables."""

    inspector = inspect(db.engine)
    table_names = inspector.get_table_names(schema='public')

    # --- 1. Create tables if missing ---
    if 'cb_findex_indicators' not in table_names:
        FindexIndicator.__table__.create(db.engine)
        print("Created table 'cb_findex_indicators'.")

    if 'cb_core_financial_inclusion' not in table_names:
        CoreFinancialInclusion.__table__.create(db.engine)
        print("Created table 'cb_core_financial_inclusion'.")

    # --- 2. Truncate tables safely (dependent table first) ---
    with db.engine.begin() as conn:
        if 'cb_core_financial_inclusion' in table_names:
            conn.execute(text("TRUNCATE TABLE cb_core_financial_inclusion RESTART IDENTITY CASCADE"))
        if 'cb_findex_indicators' in table_names:
            conn.execute(text("TRUNCATE TABLE cb_findex_indicators RESTART IDENTITY CASCADE"))

    print("Cleared existing data in both tables.")

    # --- 3. Seed fresh data ---
    seed_findex_indicators(db)
    seed_financial_inclusion_mapped(db)
    print("Seeded new data successfully for both tables.")

# Run the refresh
refresh_data()
