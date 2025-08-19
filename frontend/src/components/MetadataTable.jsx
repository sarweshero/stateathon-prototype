import React from 'react'

export default function MetadataTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500">No metadata</div>
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.type}</td>
              <td className="p-2">{r.description}</td>
              <td className="p-2">
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
