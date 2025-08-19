@echo off
REM === Backend Setup ===
cd backend

REM Create virtual environment if it doesn't exist
if not exist venv (
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

REM Apply Django migrations
python manage.py migrate

REM (Optional) Load initial data
if exist initial_groups.json (
    python manage.py loaddata initial_groups.json
)

REM Deactivate virtual environment
call venv\Scripts\deactivate.bat
cd ..

REM === Frontend Setup ===
cd frontend

REM Install Node.js dependencies
if exist package-lock.json (
    npm install
) else if exist yarn.lock (
    yarn install
) else (
    npm install
)

cd ..

@echo Setup complete!
@echo To start the backend: cd backend && call venv\Scripts\activate.bat && python manage.py runserver
@echo To start the frontend: cd frontend && npm run dev
