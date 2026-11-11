import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminAppointments.css";

function AdminAppointments() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Add Appointment form
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    type: "General Consultation",
    doctor: "",
    department: "",
    date: "",
    time: "",
    status: "Pending",
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      initials: "JS",
      patient: "John Smith",
      type: "General Consultation",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "2026-11-10",
      time: "09:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      initials: "EM",
      patient: "Emily Miller",
      type: "Follow-up Visit",
      doctor: "Dr. Michael Brown",
      department: "Dermatology",
      date: "2026-11-10",
      time: "10:15 AM",
      status: "Pending",
    },
    {
      id: 3,
      initials: "RW",
      patient: "Robert Wilson",
      type: "Regular Checkup",
      doctor: "Dr. Emily Davis",
      department: "Neurology",
      date: "2026-11-10",
      time: "11:00 AM",
      status: "Completed",
    },
    {
      id: 4,
      initials: "AK",
      patient: "Anna Kelly",
      type: "Health Checkup",
      doctor: "Dr. James Wilson",
      department: "General Medicine",
      date: "2026-11-10",
      time: "12:30 PM",
      status: "Confirmed",
    },
    {
      id: 5,
      initials: "MT",
      patient: "Maria Thomas",
      type: "Consultation",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "2026-11-12",
      time: "02:00 PM",
      status: "Pending",
    },
  ]);

  // Open Add Appointment form automatically
  // when Dashboard sends ?add=true
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.get("add") === "true") {
      setShowAddForm(true);
    }
  }, [location.search]);

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);

    // Remove ?add=true from URL
    navigate("/admin/appointments", { replace: true });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleAddAppointment = (event) => {
    event.preventDefault();

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.department ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all appointment details.");
      return;
    }

    const initials = formData.patient
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newAppointment = {
      id: Date.now(),
      initials,
      ...formData,
    };

    setAppointments((currentAppointments) => [
      ...currentAppointments,
      newAppointment,
    ]);

    setFormData({
      patient: "",
      type: "General Consultation",
      doctor: "",
      department: "",
      date: "",
      time: "",
      status: "Pending",
    });

    setShowAddForm(false);

    navigate("/admin/appointments", { replace: true });

    alert("Appointment added successfully!");
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesPatient =
      searchTerm === "" ||
      appointment.patient
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word === searchTerm);

    const matchesDoctor =
      searchTerm === "" ||
      appointment.doctor
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word === searchTerm);

    const searchMatch = matchesPatient || matchesDoctor;

    const dateMatch =
      !selectedDate || appointment.date === selectedDate;

    const statusMatch =
      statusFilter === "All" ||
      appointment.status === statusFilter;

    return searchMatch && dateMatch && statusMatch;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );

    if (selectedAppointment?.id === id) {
      setSelectedAppointment((current) => ({
        ...current,
        status: newStatus,
      }));
    }
  };

  const deleteAppointment = (id) => {
    const appointment = appointments.find(
      (item) => item.id === id
    );

    if (
      appointment &&
      window.confirm(
        `Cancel the appointment for ${appointment.patient}?`
      )
    ) {
      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (appointment) => appointment.id !== id
        )
      );

      setSelectedAppointment(null);
    }
  };

  const totalAppointments = appointments.length;

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === "2026-11-10"
  ).length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  return (
    <div className="admin-appointments-page">

      {/* PAGE HEADER */}
      <div className="appointments-page-header">
        <div>
          <p className="page-eyebrow">
            APPOINTMENT MANAGEMENT
          </p>

          <h1>Appointments</h1>

          <p className="appointments-subtitle">
            Manage and monitor all patient appointments in one place.
          </p>
        </div>

        <button
          className="appointment-primary-btn"
          onClick={openAddForm}
        >
          <span>+</span> Add Appointment
        </button>
      </div>

      {/* STATISTICS */}
      <div className="appointment-stats-grid">

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon total">
            📅
          </div>

          <div>
            <p>Total Appointments</p>
            <h2>{totalAppointments}</h2>
            <span>All scheduled appointments</span>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon today">
            ☀
          </div>

          <div>
            <p>Today's Appointments</p>
            <h2>{todayAppointments}</h2>
            <span>Scheduled for today</span>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon pending">
            ⏳
          </div>

          <div>
            <p>Pending Requests</p>
            <h2>{pendingAppointments}</h2>
            <span>Needs your attention</span>
          </div>
        </div>

        <div className="appointment-stat-card">
          <div className="appointment-stat-icon completed">
            ✓
          </div>

          <div>
            <p>Completed</p>
            <h2>{completedAppointments}</h2>
            <span>Successfully completed</span>
          </div>
        </div>
      </div>

      {/* MANAGEMENT CARD */}
      <section className="appointments-management-card">

        <div className="appointments-card-heading">
          <div>
            <h2>All Appointments</h2>
            <p>
              View and manage patient appointment requests.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="appointment-filters">

          <div className="appointment-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <input
            type="date"
            className="date-filter"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
          />

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Confirmed">
              Confirmed
            </option>
            <option value="Pending">Pending</option>
            <option value="Completed">
              Completed
            </option>
          </select>

          <button
            className="clear-filter-btn"
            onClick={() => {
              setSearch("");
              setSelectedDate("");
              setStatusFilter("All");
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="appointments-table-wrapper">

          <div className="appointments-table-header">
            <span>Patient</span>
            <span>Doctor</span>
            <span>Date & Time</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filteredAppointments.map((appointment) => (
            <div
              className="appointments-table-row"
              key={appointment.id}
            >
              <div className="appointment-patient">
                <div className="appointment-avatar">
                  {appointment.initials}
                </div>

                <div>
                  <strong>
                    {appointment.patient}
                  </strong>

                  <small>
                    {appointment.type}
                  </small>
                </div>
              </div>

              <div className="appointment-doctor">
                <strong>
                  {appointment.doctor}
                </strong>

                <small>
                  {appointment.department}
                </small>
              </div>

              <div className="appointment-date-time">
                <strong>
                  {new Date(
                    `${appointment.date}T00:00:00`
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>

                <small>
                  {appointment.time}
                </small>
              </div>

              <span
                className={`appointment-badge ${appointment.status.toLowerCase()}`}
              >
                {appointment.status}
              </span>

              <div className="appointment-action-buttons">

                <button
                  className="appointment-view-btn"
                  title="View Details"
                  onClick={() =>
                    setSelectedAppointment(appointment)
                  }
                >
                  👁
                </button>

                <button
                  className="appointment-confirm-btn"
                  title="Confirm Appointment"
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "Confirmed"
                    )
                  }
                >
                  ✓
                </button>

                <button
                  className="appointment-delete-btn"
                  title="Cancel Appointment"
                  onClick={() =>
                    deleteAppointment(appointment.id)
                  }
                >
                  ×
                </button>

              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="no-appointments">
            No appointments found.
          </div>
        )}
      </section>

      {/* ADD APPOINTMENT MODAL */}
      {showAddForm && (
        <div
          className="appointment-modal-overlay"
          onClick={closeAddForm}
        >
          <div
            className="appointment-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="appointment-modal-close"
              onClick={closeAddForm}
            >
              ×
            </button>

            <div className="appointment-modal-profile">
              <div className="appointment-modal-avatar">
                +
              </div>

              <div>
                <p>NEW APPOINTMENT</p>
                <h2>Add Appointment</h2>
                <span>
                  Enter the appointment details below.
                </span>
              </div>
            </div>

            <form
              onSubmit={handleAddAppointment}
              className="add-appointment-form"
            >

              <div className="appointment-details-grid">

                <div>
                  <label>Patient Name</label>

                  <input
                    type="text"
                    name="patient"
                    value={formData.patient}
                    onChange={handleFormChange}
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <label>Appointment Type</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                  >
                    <option>
                      General Consultation
                    </option>
                    <option>
                      Follow-up Visit
                    </option>
                    <option>
                      Regular Checkup
                    </option>
                    <option>
                      Health Checkup
                    </option>
                  </select>
                </div>

                <div>
                  <label>Doctor</label>

                  <input
                    type="text"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleFormChange}
                    placeholder="Enter doctor name"
                  />
                </div>

                <div>
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    placeholder="Enter department"
                  />
                </div>

                <div>
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label>Time</label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                  />
                </div>

              </div>

              <div className="appointment-status-update">
                <label>Appointment Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                </select>
              </div>

              <button
                type="submit"
                className="appointment-primary-btn"
                style={{ width: "100%", marginTop: "20px" }}
              >
                Add Appointment
              </button>

            </form>
          </div>
        </div>
      )}

      {/* APPOINTMENT DETAILS MODAL */}
      {selectedAppointment && (
        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >
          <div
            className="appointment-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="appointment-modal-close"
              onClick={() =>
                setSelectedAppointment(null)
              }
            >
              ×
            </button>

            <div className="appointment-modal-profile">

              <div className="appointment-modal-avatar">
                {selectedAppointment.initials}
              </div>

              <div>
                <p>APPOINTMENT DETAILS</p>

                <h2>
                  {selectedAppointment.patient}
                </h2>

                <span>
                  {selectedAppointment.type}
                </span>
              </div>
            </div>

            <div className="appointment-details-grid">

              <div>
                <span>Doctor</span>

                <strong>
                  {selectedAppointment.doctor}
                </strong>
              </div>

              <div>
                <span>Department</span>

                <strong>
                  {selectedAppointment.department}
                </strong>
              </div>

              <div>
                <span>Date</span>

                <strong>
                  {selectedAppointment.date}
                </strong>
              </div>

              <div>
                <span>Time</span>

                <strong>
                  {selectedAppointment.time}
                </strong>
              </div>

            </div>

            <div className="appointment-status-update">

              <label>
                Update Appointment Status
              </label>

              <select
                value={selectedAppointment.status}
                onChange={(event) =>
                  updateStatus(
                    selectedAppointment.id,
                    event.target.value
                  )
                }
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>

            <button
              className="appointment-cancel-modal-btn"
              onClick={() =>
                deleteAppointment(
                  selectedAppointment.id
                )
              }
            >
              Cancel Appointment
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminAppointments;