# Backend — MoSPI PLFS Open Data API (Prototype)

Tech: **Django 5**, **Django REST Framework**, **Token Auth**, **drf-yasg (Swagger)**, **PostgreSQL**

## Quick Start

> For demo you can use SQLite; for production set PostgreSQL env vars.

```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata initial_groups.json || true
python manage.py load_plfs_csv --path api/sample_plfs.csv
python manage.py runserver 0.0.0.0:8000
```

### Environment (PostgreSQL)

Set the following variables to enable Postgres:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST` (e.g., `localhost`)
- `POSTGRES_PORT` (default `5432`)

### Auth & Roles

- Obtain token: `POST /api/auth/login/` with JSON `{ "username": "", "password": "" }` → `{ "token": "..." }`
- Include header: `Authorization: Token <token>`
- Researcher role: add user to **researcher** group or make them **is_staff**.

### Endpoints

- `GET /api/plfs?state=&gender=&year=` — filtered records.
- `GET /api/plfs/summary?group_by=state,gender,year` — aggregated counts + average employment_rate.
  - **Cell suppression**: if `count < 5`, `avg_employment_rate` is `null` and `suppressed=true`.
- `GET /api/metadata/variables/` — dataset variable metadata.
- `GET /api/admin/dump/` — **researcher-only** CSV export.
- Docs: `GET /api/docs/` (Swagger), `GET /api/redoc/`.

### Rate Limiting

- Anonymous: **30/min**
- Normal users: **60/min**
- Researchers/Staff: **300/min**

### Sample Data

Loaded via management command from `api/sample_plfs.csv`.

### CORS

Enabled for all origins in `settings.py` for the prototype.

