import React from 'react'

export default function SummaryTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500">No summary</div>
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">State</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Count</th>
            <th className="p-2 text-left">Avg Employment Rate</th>
            <th className="p-2 text-left">Suppressed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{r.state ?? '-'}</td>
              <td className="p-2">{r.gender ?? '-'}</td>
              <td className="p-2">{r.year ?? '-'}</td>
              <td className="p-2">{r.count}</td>
              <td className="p-2">{r.avg_employment_rate ?? '—'}</td>
              <td className="p-2">{r.suppressed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
