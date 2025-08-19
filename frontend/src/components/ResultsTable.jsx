import React from 'react'

export default function ResultsTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500">No rows</div>
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">State</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Employment Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.state}</td>
              <td className="p-2">{r.gender}</td>
              <td className="p-2">{r.year}</td>
              <td className="p-2">{r.employment_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
