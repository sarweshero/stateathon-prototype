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
    <form onSubmit={submit} className="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-4 items-end">
      <div>
        <label className="block text-sm text-gray-700">State</label>
        <input list="states" className="border p-2 rounded w-full" value={state} onChange={e=>setState(e.target.value)} />
        <datalist id="states">
          {states.map(s => <option key={s} value={s} />)}
        </datalist>
      </div>
      <div>
        <label className="block text-sm text-gray-700">Gender</label>
        <select className="border p-2 rounded w-full" value={gender} onChange={e=>setGender(e.target.value)}>
          <option value="">Any</option>
          {genders.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-700">Year</label>
        <input className="border p-2 rounded w-full" value={year} onChange={e=>setYear(e.target.value)} placeholder="e.g., 2023" />
      </div>
      <button className="bg-blue-600 text-white p-2 rounded">Run Query</button>
    </form>
  )
}
