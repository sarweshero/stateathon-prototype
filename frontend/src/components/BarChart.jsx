import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function BarChart({ rows }) {
  const data = useMemo(() => {
    const labels = rows.map(r => `${r.state}-${r.gender}-${r.year}`)
    const values = rows.map(r => r.employment_rate)
    return {
      labels,
      datasets: [{ label: 'Employment Rate', data: values }]
    }
  }, [rows])

  if (!rows || rows.length === 0) return <div className="text-sm text-gray-500">No data</div>
  return <Bar data={data} />
}
