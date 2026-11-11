import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./AdminReports.css";

const reportData = {
  2026: [
    { month: "Jan", appointments: 620 },
    { month: "Feb", appointments: 780 },
    { month: "Mar", appointments: 690 },
    { month: "Apr", appointments: 850 },
    { month: "May", appointments: 760 },
    { month: "Jun", appointments: 920 },
    { month: "Jul", appointments: 840 },
    { month: "Aug", appointments: 1050 },
  ],
  2025: [
    { month: "Jan", appointments: 480 },
    { month: "Feb", appointments: 590 },
    { month: "Mar", appointments: 540 },
    { month: "Apr", appointments: 680 },
    { month: "May", appointments: 620 },
    { month: "Jun", appointments: 740 },
    { month: "Jul", appointments: 710 },
    { month: "Aug", appointments: 860 },
  ],
};

const doctors = [
  {
    rank: "01",
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    department: "Cardiology",
    views: "1,248",
  },
  {
    rank: "02",
    initials: "MB",
    name: "Dr. Michael Brown",
    department: "Dermatology",
    views: "1,086",
  },
  {
    rank: "03",
    initials: "ED",
    name: "Dr. Emily Davis",
    department: "Neurology",
    views: "942",
  },
  {
    rank: "04",
    initials: "JW",
    name: "Dr. James Wilson",
    department: "General Medicine",
    views: "876",
  },
  {
    rank: "05",
    initials: "AR",
    name: "Dr. Alex Roberts",
    department: "Orthopedics",
    views: "754",
  },
  {
    rank: "06",
    initials: "LM",
    name: "Dr. Lisa Martin",
    department: "Pediatrics",
    views: "698",
  },
];

function AdminReports() {
  const [year, setYear] = useState("2026");
  const [showFullReport, setShowFullReport] = useState(false);

  const handleExport = () => {
    const content = `CARECONNECT - ANALYTICS & REPORTS

REPORT SUMMARY

Total Appointments: 1,248
Total Patients: 986
Completed Appointments: 842

APPOINTMENT STATUS

Confirmed: 720
Pending: 286
Completed: 242
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "CareConnect-Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const visibleDoctors = showFullReport
    ? doctors
    : doctors.slice(0, 4);

  return (
    <div className="admin-reports">
      <div className="reports-top">
        <div>
          <span className="reports-eyebrow">
            ANALYTICS & REPORTS
          </span>

          <h1>Reports</h1>

          <p>
            Track hospital performance and appointment activity.
          </p>
        </div>

        <button
          className="reports-export-btn"
          onClick={handleExport}
        >
          <span>↓</span>
          Export Report
        </button>
      </div>

      {/* STATISTICS */}
      <div className="reports-stats-grid">
        <div className="reports-stat-card">
          <div className="reports-icon calendar-icon">📅</div>

          <p>Total Appointments</p>
          <h2>1,248</h2>

          <div className="reports-growth">
            <strong>+12.5%</strong>
            <span>Compared to last month</span>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-icon patients-icon">👥</div>

          <p>Total Patients</p>
          <h2>986</h2>

          <div className="reports-growth">
            <strong>+8.2%</strong>
            <span>New registrations this month</span>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-icon completed-icon">✓</div>

          <p>Completed Appointments</p>
          <h2>842</h2>

          <div className="reports-growth">
            <strong>+15.3%</strong>
            <span>Successfully completed</span>
          </div>
        </div>
      </div>

      {/* APPOINTMENT TRENDS */}
      <section className="reports-card trends-card">
        <div className="reports-card-header">
          <div>
            <h2>Appointment Trends</h2>
            <p>Monthly appointment overview</p>
          </div>

          <div className="reports-year-toggle">
            <button
              className={year === "2026" ? "active" : ""}
              onClick={() => setYear("2026")}
            >
              2026
            </button>

            <button
              className={year === "2025" ? "active" : ""}
              onClick={() => setYear("2025")}
            >
              2025
            </button>
          </div>
        </div>

        <div className="reports-chart">
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart
              data={reportData[year]}
              margin={{
                top: 10,
                right: 15,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="careConnectGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#159b91"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#159b91"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#edf0f2"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7b8794",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7b8794",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e6ebea",
                  boxShadow:
                    "0 8px 24px rgba(20, 60, 55, 0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#159b91"
                strokeWidth={3}
                fill="url(#careConnectGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* APPOINTMENT SUMMARY */}
      <section className="reports-card">
        <div className="reports-simple-header">
          <h2>Appointment Summary</h2>
          <p>This month's appointment status</p>
        </div>

        <div className="reports-summary-grid">
          <div className="summary-box">
            <strong>1,248</strong>
            <span>Total</span>
          </div>

          <div className="summary-box confirmed">
            <strong>720</strong>
            <span>Confirmed</span>
          </div>

          <div className="summary-box pending">
            <strong>286</strong>
            <span>Pending</span>
          </div>

          <div className="summary-box completed">
            <strong>242</strong>
            <span>Completed</span>
          </div>
        </div>
      </section>

      {/* MOST VIEWED DOCTORS */}
      <section className="reports-card doctors-report-card">
        <div className="reports-card-header">
          <div>
            <h2>Most Viewed Doctors</h2>
            <p>Monthly doctor profile performance</p>
          </div>

          <button
            className="full-report-link"
            onClick={() => setShowFullReport(!showFullReport)}
          >
            {showFullReport
              ? "Show Less ↑"
              : "View Full Report →"}
          </button>
        </div>

        <div className="reports-table">
          <div className="reports-table-row reports-table-head">
            <span>Rank</span>
            <span>Doctor</span>
            <span>Department</span>
            <span>Profile Views</span>
          </div>

          {visibleDoctors.map((doctor) => (
            <div
              className="reports-table-row"
              key={doctor.rank}
            >
              <span className="doctor-rank">
                {doctor.rank}
              </span>

              <div className="reports-doctor">
                <div className="reports-avatar">
                  {doctor.initials}
                </div>

                <strong>{doctor.name}</strong>
              </div>

              <span className="reports-department">
                {doctor.department}
              </span>

              <strong className="reports-views">
                {doctor.views}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminReports;