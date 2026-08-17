# ADH Data Explorer

Flask + React app for the [Africa Data Hub Data Explorer](https://explorer.africadatahub.org/home/#/).

This repo was forked from SCODA. The Python package and some folders are still named `scoda`, but the **running app is Data Explorer only**: one home page and two indicator datasets. Unused SCODA modules may still sit on disk; they are not imported from `scoda/core.py`.

## Contents

- [What the app serves](#what-the-app-serves)
- [API reference](#api-reference)
- [Tech stack](#tech-stack)
- [Environments](#environments)
- [How to run locally](#how-to-run-locally)
- [Configuration and environment variables](#configuration-and-environment-variables)
- [Data dependency](#data-dependency)
- [Deployment platform](#deployment-platform)
- [Infrastructure as code](#infrastructure-as-code)
- [Caveats](#caveats)

## What the app serves

UI: `/` redirects to `/home/` (React `home` webpack bundle).

| Dataset | Indicator list | Explore data | Tables |
| --- | --- | --- | --- |
| World Development Indicators | `GET /api/indicators-list/codebook` | `GET /api/explore/codebook?indicator_id=` | `indicators`, `cb_temp_indicators` |
| Findex | `GET /api/findex/indicators-list/codebook` | `GET /api/findex/codebook?indicator_id=` | `cb_findex_indicators`, `cb_core_financial_inclusion` |

Explore responses are cached in Redis (1 hour). Redis is opened at app import with **RESP2** (`protocol=2`) so older Redis servers work. Implemented in [`scoda/api.py`](scoda/api.py).

## API reference

Base URL is the Flask origin (local `http://127.0.0.1:5000`, production `https://explorer.africadatahub.org`). All four routes return JSON. Explore endpoints also accept `POST` but read **query string** params only.

Rows are filtered to African countries (`AFRICAN_COUNTRIES` in [`scoda/constants.py`](scoda/constants.py)). Empty result is `{}`.

### `GET /api/indicators-list/codebook`

WDI indicator catalogue from table `indicators`.

**Response:** array of `[id, name]`

```json
[["1", "Employment to population ratio"], ["2", "Time spent on unpaid work"]]
```

### `GET /api/explore/codebook`

WDI time series from `cb_temp_indicators`. Cached as Redis key `indicator_{id}` for 3600s.

| Query | Default | Notes |
| --- | --- | --- |
| `indicator_id` | `76` | WDI indicator id |
| `city` | all | Repeatable. Filters `re_name` (country name) |

**Example:** `/api/explore/codebook?indicator_id=1&city=Kenya&city=Nigeria`

**Response (chart payload):**

```json
{
  "plot": 1,
  "table": [["City", "Year", "Indicator name"], ["Kenya", "2020", 55.2]],
  "table_plot": "...google-viz json or []...",
  "colours": ["#hex", "..."],
  "year": "2020",
  "series": { "0": { "color": "#hex" } },
  "view": [0, 2],
  "plot_type": 1,
  "min": 0.0,
  "max": 60.7,
  "cities": ["Kenya"],
  "options_list": [{ "optid": 1, "optname": "Indicator name" }],
  "years_list": [{ "optid": 1, "optname": "Year: 2020" }],
  "years": ["Year", "2020"]
}
```

`plot_type` is `2` when there are multiple series or a single year.

### `GET /api/findex/indicators-list/codebook`

Findex catalogue from `cb_findex_indicators`.

**Response:** array of `[id, name, short_definition]`

```json
[["1", "Account (% age 15+)", "The percentage of respondents who report having an account..."]]
```

### `GET /api/findex/codebook`

Findex series from `cb_core_financial_inclusion`. Cached as `findex:core_financial_inclusion:indicator_{id}` for 3600s.

| Query | Default | Notes |
| --- | --- | --- |
| `indicator_id` | `76` | Integer Findex indicator id |

**Example:** `/api/findex/codebook?indicator_id=1`

**Response:** same chart payload as WDI, plus:

```json
{
  "regions": ["Eastern Africa", "Western Africa"],
  "averages": { "2021": { "Account (% age 15+)": 42.1 } }
}
```

`table` header includes a `Region` column (African Union region).

## Tech stack

| Layer | Details |
| --- | --- |
| Runtime | Python **3.10.9** (`runtime.txt`). **3.11** works on Windows. Prefer that over 3.12+ with this pin set. |
| Web | Flask 2.0, gunicorn, WhiteNoise |
| ORM | Flask-SQLAlchemy / SQLAlchemy 1.3 |
| Cache | Redis |
| Observability | Sentry |
| Database | PostgreSQL. `rebuild_db.py` still imports leftover spatial models, so **PostGIS** is needed if you use `create_all`. |
| Frontend | React 19, webpack 5, entry `home` in `scoda/templates/static/` |
| Driver | `psycopg2-binary==2.9.9` |

Entry points: `app.py` → `scoda.core` → `scoda.app` (config, DB, Redis, Sentry) plus `scoda.routes` and `scoda.api`.

## Environments

- Production: [https://explorer.africadatahub.org/home/#/](https://explorer.africadatahub.org/home/#/)
- Staging: [https://staging-explorer.africadatahub.org/home/#/](https://staging-explorer.africadatahub.org/home/#/)

Staging has historically had a **misconfigured database**. The explorer APIs require the four tables above to be populated. Production is the working reference.

`FLASK_ENV` (default `development`) selects config:

- `development` → `scoda/config/development.cfg`, or `scoda/config/example.development.cfg` if the file is missing or invalid Python
- `production` → `scoda/config/production.cfg` (platform env vars)

## How to run locally

Windows PowerShell shown; macOS/Linux is the same with `source .venv/bin/activate`.

### Prerequisites

- Python 3.10 or 3.11
- Node.js 18+
- PostgreSQL 12+ (16–18 is fine). Enable PostGIS if you run `rebuild_db.py`
- Redis (required at process start)

### 1. Python env

```powershell
git clone <this-repo>
cd adh-data-explorer
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

`pip install` can take several minutes because `xhtml2pdf` is unpinned.

### 2. Environment file

```powershell
copy .env.example .env
```

You do not need `development.cfg` unless you want a machine-specific override (that file is gitignored). If an old `development.cfg` has a bare `SENTRY_DSN=` it is invalid Python and is skipped.

### 3. PostgreSQL

Defaults in `example.development.cfg`: user `scoda`, password `scoda`, database **`data-explorer`**.

```sql
CREATE USER scoda WITH PASSWORD 'scoda';
CREATE DATABASE "data-explorer" OWNER scoda;
GRANT ALL PRIVILEGES ON DATABASE "data-explorer" TO scoda;
```

```powershell
psql -U postgres -d "data-explorer" -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql -U postgres -d "data-explorer" -c "CREATE EXTENSION IF NOT EXISTS postgis_topology;"
```

On Windows, `psql` is usually under `C:\Program Files\PostgreSQL\<version>\bin`.

### 4. Redis

Default: `redis://localhost:6379`. Start the Redis Windows service, Memurai, WSL `redis-server`, or `brew services start redis`.

### 5. Seed data

See [Data dependency](#data-dependency).

### 6. Frontend

```powershell
cd scoda\templates\static
npm install
npm run watch
```

Bundles write to `scoda/static/public/`. Use `npm run build` for production assets.

### 7. Flask

From the repo root:

```powershell
python app.py
```

Gunicorn: `gunicorn app:app`.

## Configuration and environment variables

`python-dotenv` loads `.env` before `*.cfg`. Local example config reads `os.environ.get(...)` with defaults.

| Variable | Local default | Production |
| --- | --- | --- |
| `FLASK_ENV` | `development` | `production` |
| `SECRET_KEY` | `secret` | required |
| `DATABASE_URL` | `postgres://scoda:scoda@localhost/data-explorer` | required |
| `REDIS_URL` | `redis://localhost:6379` | required; `production.cfg` appends `?ssl_cert_reqs=none` |
| `SENTRY_ENV` | `development` | required |
| `SENTRY_SAMPLER` | `1` | required |
| `SENTRY_DSN` | empty | required |

SQLAlchemy **1.3** still accepts `postgres://`. Do not upgrade SQLAlchemy without switching to `postgresql://`.

`production.cfg` still **requires** Flask-Mail variables (`MAIL_SERVER`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_DEFAULT_SENDER`) even though Data Explorer does not use mail locally. Set dummy values on the platform if needed.

## Data dependency

`scoda/data/` is **gitignored**. Request files from [this Google Drive folder](https://drive.google.com/drive/folders/1tnI_EveGeeJg8-WnP5Js2doMDsQGT2Vh) and unpack into `scoda/data/`.

### World Development Indicators

`rebuild_db.py` drops **all** tables, recreates them, and seeds WDI from:

- `scoda/data/World_Bank_Gender_Stats_Employment_Time_Use.parquet`

```powershell
python rebuild_db.py
```

Destructive. It fills `indicators` and `cb_temp_indicators`.

### Findex

Does **not** drop the whole database. Run after WDI (or against an existing schema):

```powershell
python build_findex_tables.py
```

Needs:

- `scoda/data/Africa_FindexDatabase2025_V2_Metadata.csv`
- `scoda/data/Copy_Africa_FindexDatabase2025_Data_Africa.csv`

### SQL dump (optional)

If you have a full dump of the hosted explorer database, restore that instead of seeding:

```powershell
psql --dbname="data-explorer" --username=postgres --host=localhost --port=5432 -f path\to\dump.sql
```

## Deployment platform

Heroku-compatible PaaS (no Docker/cloud config in git):

- `Procfile`: `web: gunicorn app:app`
- `runtime.txt`: `python-3.10.9`
- `requirements.txt`

Set `FLASK_ENV=production` and the production env vars above.

## Infrastructure as code

**None in this repository.** No Terraform, Docker Compose, Kubernetes, or GitHub Actions. Config is platform env vars plus `scoda/config/production.cfg`.

Flask-Migrate/Alembic are listed in requirements but there is **no `migrations/` directory**. Schema comes from `create_all` / seed scripts / a dump.

## Caveats

- Redis must be running or the process will not import.
- `ckanapi`, GeoAlchemy2, Flask-Mail, Gulp (`scoda/static/`), and leftover SCODA Python files are not part of the explorer runtime. Do not treat them as setup steps.
- Empty `SENTRY_DSN` is fine locally (`SENTRY_DSN=` in `.env`; `SENTRY_DSN = ''` in a `.cfg` file).
- Do not commit `.env` or `scoda/config/development.cfg`.

### Local run notes (Windows, Aug 2026)

- Use Python **3.11** if 3.10 is not installed (`psycopg2-binary==2.9.9` installs cleanly).
- Redis Windows service on 6379 and PostgreSQL 18 were sufficient to boot `python app.py` at `http://127.0.0.1:5000/` (`/` → `/home/` HTTP 200).
- Flask-WTF may warn that `CsrfProtect` was renamed to `CSRFProtect`.
