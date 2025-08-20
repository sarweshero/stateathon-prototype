import React from 'react'

export default function MetadataTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500 italic p-4 text-center">No metadata available</div>
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((r, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{r.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">{r.type}</td>
              <td className="px-4 py-3 text-gray-700">{r.description}</td>
              <td className="px-4 py-3 text-gray-700">
                {r.allowed_values ? r.allowed_values.join(', ') :
                 r.allowed_values_example ? r.allowed_values_example.join(', ') :
                 (r.min !== undefined ? `min=${r.min}, max=${r.max}` : '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
