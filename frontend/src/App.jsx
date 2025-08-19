import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import QueryForm from './components/QueryForm'
import ResultsTable from './components/ResultsTable'
import SummaryTable from './components/SummaryTable'
import MetadataTable from './components/MetadataTable'
import BarChart from './components/BarChart'
import { api, setToken, getToken } from './api'

export default function App() {
  const [authed, setAuthed] = useState(!!getToken())
  const [rows, setRows] = useState([])
  const [summary, setSummary] = useState([])
  const [metadata, setMetadata] = useState([])

  useEffect(() => {
    if (authed) {
      api.get('/metadata/variables/').then(r => setMetadata(r.data)).catch(()=>{})
    }
  }, [authed])

  const handleLogin = async (username, password) => {
    const { data } = await api.post('/auth/login/', { username, password })
    setToken(data.token)
    setAuthed(true)
  }

  const handleQuery = async (params) => {
    const q = new URLSearchParams(params).toString()
    const [r1, r2] = await Promise.all([
      api.get('/plfs?' + q),
      api.get('/plfs/summary?group_by=state,gender,year')
    ])
    setRows(r1.data)
    setSummary(r2.data)
  }

  if (!authed) return <Login onLogin={handleLogin} />

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">MoSPI PLFS Open Data Gateway</h1>
        <button
          className="px-3 py-1 rounded bg-gray-200"
          onClick={() => { setToken(null); setAuthed(false); }}
        >Logout</button>
      </header>

      <QueryForm onSubmit={handleQuery} metadata={metadata} />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Results</h2>
          <ResultsTable rows={rows} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Employment Rate (Bar)</h2>
          <BarChart rows={rows} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Summary (Aggregated)</h2>
          <SummaryTable rows={summary} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Metadata</h2>
          <MetadataTable rows={metadata} />
        </div>
      </section>
    </div>
  )
}
