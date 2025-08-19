# Frontend — MoSPI PLFS Open Data Gateway (Prototype)

Tech: **Vite + React**, **Tailwind CSS**, **Chart.js**

## Quick Start

```bash
cd frontend
npm install
# configure backend API base URL (optional)
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local
npm run dev
```

### Features

- Token-based login (stores token in localStorage)
- Query form (state, gender, year)
- Results table + Bar chart (employment_rate)
- Aggregated summary table
- Metadata table
