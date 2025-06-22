// components/UsersTable.jsx
'use client'
import { useEffect, useState } from 'react'
import { fetchAll } from '@lib/firebaseUtil'

export default function UsersTable() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="py-4">Loading …</p>
  if (!rows.length) return <p className="py-4">No user data.</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">emailId</th>
            <th className="px-4 py-2">admissionStatus</th>
            <th className="px-4 py-2">passportStatus</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-2">{r.id}</td>
              <td className="px-4 py-2">{r.admissionURL ? 'Uploaded' : 'Pending'}</td>
              <td className="px-4 py-2">{r.passportURL ? 'Uploaded' : 'Pending'}</td>
              <td className="px-4 py-2">{r.status ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
