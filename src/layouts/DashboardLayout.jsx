import Navbar from '../components/Navbar'

function DashboardLayout({
  children,
  role
}) {

  return (

    <div className="dashboard-layout">

      <Navbar role={role} />

      <main className="dashboard-content">
        {children}
      </main>

    </div>
  )
}

export default DashboardLayout