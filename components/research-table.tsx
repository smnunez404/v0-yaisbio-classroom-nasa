export function ResearchTable() {
  const data = [
    {
      id: "RES-2401",
      mission: "ISS Microgravity Study",
      status: "Active",
      progress: 87,
      researcher: "Dr. Chen",
    },
    {
      id: "RES-2402",
      mission: "Mars Soil Analysis",
      status: "Completed",
      progress: 100,
      researcher: "Dr. Rodriguez",
    },
    {
      id: "RES-2403",
      mission: "Lunar Water Detection",
      status: "Active",
      progress: 62,
      researcher: "Dr. Patel",
    },
    {
      id: "RES-2404",
      mission: "Solar Radiation Study",
      status: "Active",
      progress: 45,
      researcher: "Dr. Kim",
    },
    {
      id: "RES-2405",
      mission: "Asteroid Composition",
      status: "Pending",
      progress: 12,
      researcher: "Dr. Johnson",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">ID</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Mission</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Progress</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Researcher</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
              <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{row.id}</td>
              <td className="py-3 px-4 text-sm text-foreground">{row.mission}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === "Active"
                      ? "bg-chart-3/20 text-chart-3"
                      : row.status === "Completed"
                        ? "bg-chart-1/20 text-chart-1"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-[100px]">
                    <div className="h-full bg-chart-1" style={{ width: `${row.progress}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{row.progress}%</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-foreground">{row.researcher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
