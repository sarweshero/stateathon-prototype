import React, { useState } from 'react'

export default function QueryForm({ onSubmit, metadata }) {
  const [state, setState] = useState('')
  const [gender, setGender] = useState('')
  const [year, setYear] = useState('')

  const states = (metadata.find(m => m.name === 'state')?.allowed_values_example) || []
  const genders = (metadata.find(m => m.name === 'gender')?.allowed_values) || []

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ state, gender, year })
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 grid md:grid-cols-4 gap-6 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <div className="relative">
          <input 
            list="states" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
            value={state} 
            onChange={e=>setState(e.target.value)} 
          />
          <datalist id="states">
            {states.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        <div className="relative">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white" 
            value={gender} 
            onChange={e=>setGender(e.target.value)}
          >
            <option value="">Any</option>
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
          value={year} 
          onChange={e=>setYear(e.target.value)} 
          placeholder="e.g., 2023" 
        />
      </div>
      <button 
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Run Query
      </button>
    </form>
  )
}
