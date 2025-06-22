import UsersTable from '@components/UsersTable'

export const metadata = { title: 'All User Records' }

export default function AdminPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">All User Records</h1>
      <UsersTable />
    </main>
  )
}
