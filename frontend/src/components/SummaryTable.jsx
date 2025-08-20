import React from 'react'

export default function SummaryTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500 italic p-4 text-center">No summary data available</div>
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">State</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Gender</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Year</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Count</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Avg Employment Rate</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Suppressed</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((r, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{r.state ?? '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">{r.gender ?? '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">{r.year ?? '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">{r.count}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">{r.avg_employment_rate ?? '—'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                {r.suppressed ? 
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Yes</span> : 
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">No</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
