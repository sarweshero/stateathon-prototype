import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title)

export default function BarChart({ rows }) {
  const data = useMemo(() => {
    const labels = rows.map(r => `${r.state}-${r.gender}-${r.year}`)
    const values = rows.map(r => r.employment_rate)
    return {
      labels,
      datasets: [{ 
        label: 'Employment Rate',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
      }]
    }
  }, [rows])

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111',
        bodyColor: '#333',
        titleFont: {
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Employment Rate: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  }

  if (!rows || rows.length === 0) return <div className="h-60 flex items-center justify-center text-sm text-gray-500 italic bg-gray-50 rounded-lg border border-gray-200">No data available for visualization</div>
  return <div className="h-full rounded-lg overflow-hidden"><Bar data={data} options={options} /></div>
}
