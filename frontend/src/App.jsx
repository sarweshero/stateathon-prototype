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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      const q = new URLSearchParams(params).toString()
      const [r1, r2] = await Promise.all([
        api.get('/plfs?' + q),
        api.get('/plfs/summary?group_by=state,gender,year')
      ])
      setRows(r1.data)
      setSummary(r2.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!authed) return <Login onLogin={handleLogin} />

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <h1 className="text-xl font-bold text-gray-800">MoSPI PLFS Open Data Gateway</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="ml-3 px-4 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium flex items-center transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => { setToken(null); setAuthed(false); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 pb-12">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-6 rounded-xl shadow-md mb-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Periodic Labour Force Survey Analytics</h2>
              <p className="text-blue-100">Query and visualize employment data across states, genders, and time periods</p>
            </div>
          </div>

          <div className="mb-8">
            <QueryForm onSubmit={handleQuery} metadata={metadata} />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Loading results...</p>
              </div>
            </div>
          ) : (
            <>
              <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Results
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{rows.length} records</span>
                  </div>
                  <ResultsTable rows={rows} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Employment Rate Visualization</h2>
                  </div>
                  <div className="h-[350px]">
                    <BarChart rows={rows} />
                  </div>
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Summary (Aggregated)</h2>
                  </div>
                  <SummaryTable rows={summary} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Metadata</h2>
                  </div>
                  <MetadataTable rows={metadata} />
                </div>
              </section>
            </>
          )}
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2025 Ministry of Statistics and Programme Implementation. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900">Terms of Service</a>
                <a href="#" className="hover:text-gray-900">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
