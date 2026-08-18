# Database setup

Data Explorer uses **PostgreSQL**. The Python package is still named `scoda` (fork leftover). Full instructions: [README.md](README.md#data-dependency).

Use PostgreSQL 12+ with PostGIS if you run `rebuild_db.py` (`create_all` still loads leftover spatial models).

Local defaults: user `scoda`, password `scoda`, database **`data-explorer`**.

## World Development Indicators

1. Create `"data-explorer"` and enable `postgis` / `postgis_topology`.
2. Put `World_Bank_Gender_Stats_Employment_Time_Use.parquet` in `scoda/data/` ([Google Drive](https://drive.google.com/drive/folders/1tnI_EveGeeJg8-WnP5Js2doMDsQGT2Vh)).
3. `python rebuild_db.py` (destructive: drops all tables).

## Findex

1. Put `Africa_FindexDatabase2025_V2_Metadata.csv` and `Copy_Africa_FindexDatabase2025_Data_Africa.csv` in `scoda/data/`.
2. `python build_findex_tables.py` (truncates Findex tables only).

## SQL dump

Restore a hosted explorer dump if you have one (skip the seed files):

```powershell
psql --dbname="data-explorer" --username=postgres --host=localhost --port=5432 -f path\to\dump.sql
```
