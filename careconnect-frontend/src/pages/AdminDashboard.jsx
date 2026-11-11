import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const departments = [
    { name: "Cardiology", doctors: 5, width: "83%" },
    { name: "General Medicine", doctors: 6, width: "100%" },
    { name: "Dermatology", doctors: 4, width: "67%" },
    { name: "Neurology", doctors: 3, width: "50%" },
  ];

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8081/api/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load appointments");
        }
        return response.json();
      })
      .then((data) => {
        const formattedAppointments = data.map((appointment) => ({
          id: appointment.id,
          initials: appointment.patientName
            ? appointment.patientName
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "PT",
          patient: appointment.patientName || "Patient",
          type: appointment.reason || "General Consultation",
          doctor: appointment.doctorName || "Doctor",
          department: "Healthcare",
          time: appointment.appointmentTime || "Not selected",
          status: appointment.status || "BOOKED",
          date: appointment.appointmentDate,
        }));

        setAppointments(formattedAppointments);
      })
      .catch((error) => {
        console.error("Appointments API error:", error);
      })
      .finally(() => {
        setLoadingAppointments(false);
      });
  }, []);

  const confirmedCount = appointments.filter(
    (appointment) =>
      appointment.status.toUpperCase() === "CONFIRMED" ||
      appointment.status.toUpperCase() === "BOOKED"
  ).length;

  const pendingCount = appointments.filter(
    (appointment) => appointment.status.toUpperCase() === "PENDING"
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status.toUpperCase() === "COMPLETED"
  ).length;

  const handleAppointmentDetails = (appointment) => {
    alert(
      `Appointment Details

Patient: ${appointment.patient}
Doctor: ${appointment.doctor}
Date: ${appointment.date || "Not available"}
Time: ${appointment.time}
Status: ${appointment.status}`
    );
  };

  return (
    <div className="admin-dashboard">
      {/* PAGE HEADER */}
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">ADMIN OVERVIEW</p>
          <h1>Welcome back, Administrator!</h1>
          <p className="dashboard-subtitle">
            Here's a complete overview of your hospital and appointment
            activity.
          </p>
        </div>

        <button
          className="add-appointment-btn"
          onClick={() => navigate("/admin/appointments?add=true")}
        >
          <span>+</span> Add Appointment
        </button>
      </div>

      {/* STATISTICS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon patients-icon">👥</div>
          <div className="stat-content">
            <p>Total Patients</p>
            <h2>{dashboardData.totalPatients}</h2>
            <span className="positive">Registered patients</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon appointments-icon">📅</div>
          <div className="stat-content">
            <p>Total Appointments</p>
            <h2>{dashboardData.totalAppointments}</h2>
            <span className="positive">
              Appointments in the system
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon doctors-icon">🩺</div>
          <div className="stat-content">
            <p>Total Doctors</p>
            <h2>{dashboardData.totalDoctors}</h2>
            <span className="neutral">
              Healthcare professionals
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">⏳</div>
          <div className="stat-content">
            <p>Pending Requests</p>
            <h2>{pendingCount}</h2>
            <span className="warning-text">
              Needs your attention
            </span>
          </div>
        </div>
      </div>

      {/* GRAPH + APPOINTMENT STATUS */}
      <div className="top-dashboard-grid">
        <section className="chart-card">
          <div className="card-header">
            <div>
              <h2>Appointment Overview</h2>
              <p>Appointment activity and performance</p>
            </div>

            <select className="chart-select">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="chart-summary">
            <div>
              <span>Total Appointments</span>
              <strong>{dashboardData.totalAppointments}</strong>
            </div>

            <div className="chart-growth">
              <span>Live Data</span>
              <small>Connected to CareConnect backend</small>
            </div>
          </div>

          {/* PROFESSIONAL GRAPH */}
          <div className="line-chart">
            <div className="chart-y-axis">
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            <div className="graph-area">
              <div className="graph-grid"></div>

              <svg
                className="chart-svg"
                viewBox="0 0 800 260"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="graphFill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#159b91"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="#159b91"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  className="graph-fill"
                  d="M0,210 C40,190 60,195 95,170 S150,135 190,155 S245,120 285,135 S340,105 385,115 S440,80 485,100 S540,55 580,75 S635,90 680,45 S740,50 800,15 L800,260 L0,260 Z"
                />

                <path
                  className="graph-line"
                  d="M0,210 C40,190 60,195 95,170 S150,135 190,155 S245,120 285,135 S340,105 385,115 S440,80 485,100 S540,55 580,75 S635,90 680,45 S740,50 800,15"
                />
              </svg>

              <div className="chart-months">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </section>

        {/* APPOINTMENT STATUS */}
        <section className="overview-card">
          <div className="card-header">
            <div>
              <h2>Appointment Status</h2>
              <p>Current appointment status</p>
            </div>
          </div>

          <div className="overview-chart">
            <div className="overview-circle">
              <div className="circle-inner">
                <strong>{appointments.length}</strong>
                <span>Total</span>
              </div>
            </div>
          </div>

          <div className="status-summary">
            <div>
              <div className="summary-label">
                <span className="dot confirmed-dot"></span>
                <span>Confirmed</span>
              </div>
              <strong>{confirmedCount}</strong>
            </div>

            <div>
              <div className="summary-label">
                <span className="dot pending-dot"></span>
                <span>Pending</span>
              </div>
              <strong>{pendingCount}</strong>
            </div>

            <div>
              <div className="summary-label">
                <span className="dot completed-dot"></span>
                <span>Completed</span>
              </div>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </section>
      </div>

      {/* TODAY'S APPOINTMENTS */}
      <section className="appointments-card">
        <div className="card-header">
          <div>
            <h2>Today's Appointments</h2>
            <p>Latest scheduled patient appointments</p>
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/admin/appointments")}
          >
            View All →
          </button>
        </div>

        <div className="appointment-table-header">
          <span>Patient</span>
          <span>Doctor</span>
          <span>Time</span>
          <span>Status</span>
          <span></span>
        </div>

        <div className="appointments-list">
          {loadingAppointments ? (
            <p className="loading-text">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="loading-text">No appointments available.</p>
          ) : (
            appointments.slice(0, 5).map((appointment) => (
              <div className="appointment-row" key={appointment.id}>
                <div className="patient-info">
                  <div className="avatar">
                    {appointment.initials}
                  </div>

                  <div className="appointment-details">
                    <h4>{appointment.patient}</h4>
                    <p>{appointment.type}</p>
                  </div>
                </div>

                <div className="doctor-info">
                  <h4>{appointment.doctor}</h4>
                  <p>{appointment.department}</p>
                </div>

                <div className="appointment-time">
                  {appointment.time}
                </div>

                <div className="status-container">
                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <button
                  className="more-btn"
                  onClick={() => handleAppointmentDetails(appointment)}
                  aria-label="View appointment details"
                >
                  ⋮
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <div className="bottom-grid">
        {/* RECENT ACTIVITY */}
        <section className="activity-card">
          <div className="card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest activity on CareConnect</p>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">✓</div>
              <div className="activity-content">
                <h4>Appointments updated</h4>
                <p>
                  CareConnect appointment data is connected to the
                  administration dashboard.
                </p>
                <span>Recently updated</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon info">+</div>
              <div className="activity-content">
                <h4>Patient management</h4>
                <p>
                  Registered patients can be managed from the admin portal.
                </p>
                <span>Admin access</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon complete">✓</div>
              <div className="activity-content">
                <h4>Dashboard active</h4>
                <p>
                  Doctors, patients and appointment information are available.
                </p>
                <span>System online</span>
              </div>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS */}
        <section className="departments-card">
          <div className="card-header">
            <div>
              <h2>Departments</h2>
              <p>Doctors by department</p>
            </div>
          </div>

          <div className="department-list">
            {departments.map((department) => (
              <div
                className="department-item"
                key={department.name}
              >
                <div className="department-title">
                  <span>{department.name}</span>
                  <strong>{department.doctors} Doctors</strong>
                </div>

                <div className="department-progress">
                  <div
                    className="department-progress-fill"
                    style={{ width: department.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="department-btn"
            onClick={() => navigate("/admin/doctors")}
          >
            View All Doctors →
          </button>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;