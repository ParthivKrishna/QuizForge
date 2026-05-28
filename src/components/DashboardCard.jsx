function DashboardCard({
  title,
  description,
  icon,
  accent,
  onClick
}) {

  return (

    <div
      className="dashboard-card"
      onClick={onClick}
    >

      <div
        className="card-icon"
        style={{
          background: accent
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

    </div>
  )
}

export default DashboardCard