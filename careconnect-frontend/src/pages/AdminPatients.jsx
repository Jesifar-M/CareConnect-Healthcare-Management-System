import { useState } from "react";
import "./AdminPatients.css";

function AdminPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([
    {
      id: 1,
      initials: "AM",
      name: "Arjun Menon",
      email: "arjun.menon2026@example.com",
      contact: "+91 98765 43210",
      appointments: 2,
      status: "Active",
    },
    {
      id: 2,
      initials: "AP",
      name: "Anjali Prakash",
      email: "anjali.prakash@example.com",
      contact: "+91 98765 43211",
      appointments: 1,
      status: "Active",
    },
    {
      id: 3,
      initials: "RM",
      name: "Rahul Mohan",
      email: "rahul.mohan@example.com",
      contact: "+91 98765 43212",
      appointments: 3,
      status: "Active",
    },
    {
      id: 4,
      initials: "NS",
      name: "Neha Suresh",
      email: "neha.suresh2026@example.com",
      contact: "+91 98765 43213",
      appointments: 2,
      status: "Active",
    },
    {
      id: 5,
      initials: "AV",
      name: "Akhil Varma",
      email: "akhil.varma2026@example.com",
      contact: "+91 98765 43214",
      appointments: 0,
      status: "Inactive",
    },
    {
      id: 6,
      initials: "KP",
      name: "Kavya Pillai",
      email: "kavya.pillai2026@example.com",
      contact: "+91 98765 43215",
      appointments: 4,
      status: "Active",
    },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 3;

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.email} ${patient.contact}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredPatients.length / patientsPerPage
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient =
    indexOfLastPatient - patientsPerPage;

  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const patient = patients.find((item) => item.id === id);

    if (
      window.confirm(
        `Are you sure you want to delete ${patient.name}?`
      )
    ) {
      setPatients((currentPatients) =>
        currentPatients.filter((patient) => patient.id !== id)
      );

      if (
        currentPatients.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === editingPatient.id
          ? {
              ...patient,
              name: formData.get("name"),
              email: formData.get("email"),
              contact: formData.get("contact"),
              status: formData.get("status"),
              initials: formData
                .get("name")
                .split(" ")
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join("")
                .toUpperCase(),
            }
          : patient
      )
    );

    setEditingPatient(null);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");

    const newPatient = {
      id: Date.now(),
      initials: name
        .split(" ")
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      name,
      email: formData.get("email"),
      contact: formData.get("contact"),
      appointments: 0,
      status: formData.get("status"),
    };

    setPatients((currentPatients) => [
      ...currentPatients,
      newPatient,
    ]);

    setShowAddModal(false);
  };

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const totalAppointments = patients.reduce(
    (total, patient) => total + patient.appointments,
    0
  );

  return (
    <div className="admin-patients-page">
      {/* PAGE HEADER */}
      <div className="patients-page-header">
        <div>
          <p className="page-eyebrow">PATIENT MANAGEMENT</p>
          <h1>Manage Patients</h1>
          <p>
            View, manage and update all registered patients.
          </p>
        </div>

        <button
          type="button"
          className="primary-action-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Patient
        </button>
      </div>

      {/* STATISTICS */}
      <div className="patient-stats">
        <div className="patient-stat-card">
          <div className="patient-stat-icon blue">👥</div>
          <div>
            <span>Total Patients</span>
            <strong>{patients.length}</strong>
            <small>Registered patients</small>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon green">✓</div>
          <div>
            <span>Active Patients</span>
            <strong>{activePatients}</strong>
            <small>Currently active accounts</small>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon orange">📅</div>
          <div>
            <span>Appointments</span>
            <strong>{totalAppointments}</strong>
            <small>Total appointments booked</small>
          </div>
        </div>
      </div>

      {/* PATIENT MANAGEMENT */}
      <section className="patients-management-card">
        <div className="management-card-top">
          <div>
            <h2>All Patients</h2>
            <p>View and manage all registered patients.</p>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="patients-table">
          <div className="patients-table-head">
            <span>Patient</span>
            <span>Contact</span>
            <span>Appointments</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {currentPatients.length > 0 ? (
            currentPatients.map((patient) => (
              <div
                className="patients-table-row"
                key={patient.id}
              >
                {/* PATIENT */}
                <div className="patient-name-info">
                  <div className="patient-avatar">
                    {patient.initials}
                  </div>

                  <div>
                    <strong>{patient.name}</strong>
                    <span>{patient.email}</span>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="patient-contact">
                  <strong>{patient.contact}</strong>
                </div>

                {/* APPOINTMENTS */}
                <div>
                  <span className="patient-appointment-count">
                    {patient.appointments}
                  </span>
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`patient-status ${patient.status.toLowerCase()}`}
                  >
                    {patient.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="patient-action-buttons">
                  <button
                    type="button"
                    className="view-patient-btn"
                    onClick={() =>
                      setSelectedPatient(patient)
                    }
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="edit-patient-btn"
                    onClick={() => {
                      setSelectedPatient(null);
                      setEditingPatient(patient);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-patient-btn"
                    onClick={() =>
                      handleDelete(patient.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No patients found.
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredPatients.length > 0 && (
          <div className="table-footer">
            <span>
              Showing {indexOfFirstPatient + 1}–
              {Math.min(
                indexOfLastPatient,
                filteredPatients.length
              )}{" "}
              of {filteredPatients.length} patients
            </span>

            <div className="pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                ‹
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? "active-page"
                      : ""
                  }
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                ›
              </button>
            </div>
          </div>
        )}
      </section>

      {/* VIEW PATIENT MODAL */}
      {selectedPatient && (
        <div
          className="patient-modal-overlay"
          onClick={() => setSelectedPatient(null)}
        >
          <div
            className="patient-modal patient-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="patient-modal-header">
              <div>
                <p className="page-eyebrow">
                  PATIENT DETAILS
                </p>
                <h2>{selectedPatient.name}</h2>
                <p>
                  Registered patient information and account
                  details.
                </p>
              </div>

              <button
                type="button"
                className="patient-modal-close"
                onClick={() => setSelectedPatient(null)}
              >
                ×
              </button>
            </div>

            <div className="patient-view-content">
              <div className="patient-view-avatar">
                {selectedPatient.initials}
              </div>

              <div className="patient-details-grid">
                <div>
                  <span>EMAIL ADDRESS</span>
                  <strong>{selectedPatient.email}</strong>
                </div>

                <div>
                  <span>CONTACT NUMBER</span>
                  <strong>{selectedPatient.contact}</strong>
                </div>

                <div>
                  <span>APPOINTMENTS</span>
                  <strong>
                    {selectedPatient.appointments}
                  </strong>
                </div>

                <div>
                  <span>ACCOUNT STATUS</span>
                  <strong className="active-text">
                    {selectedPatient.status}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="primary-action-btn patient-edit-from-view"
                onClick={() => {
                  setSelectedPatient(null);
                  setEditingPatient(selectedPatient);
                }}
              >
                Edit Patient Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PATIENT MODAL */}
      {showAddModal && (
        <div
          className="patient-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="patient-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="patient-modal-header">
              <div>
                <p className="page-eyebrow">NEW PATIENT</p>
                <h2>Add New Patient</h2>
                <p>
                  Enter the patient's details to create a new
                  record.
                </p>
              </div>

              <button
                type="button"
                className="patient-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddPatient}>
              <div className="patient-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="patient-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="patient-form-row">
                <div className="patient-form-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div className="patient-form-group">
                  <label>Account Status</label>
                  <select
                    name="status"
                    defaultValue="Active"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="patient-form-actions">
                <button
                  type="button"
                  className="patient-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-action-btn"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PATIENT MODAL */}
      {editingPatient && (
        <div
          className="patient-modal-overlay"
          onClick={() => setEditingPatient(null)}
        >
          <div
            className="patient-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="patient-modal-header">
              <div>
                <p className="page-eyebrow">
                  EDIT PATIENT
                </p>
                <h2>Edit Patient Details</h2>
                <p>
                  Update the patient's registered information.
                </p>
              </div>

              <button
                type="button"
                className="patient-modal-close"
                onClick={() => setEditingPatient(null)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="patient-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingPatient.name}
                  required
                />
              </div>

              <div className="patient-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingPatient.email}
                  required
                />
              </div>

              <div className="patient-form-row">
                <div className="patient-form-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    defaultValue={editingPatient.contact}
                    required
                  />
                </div>

                <div className="patient-form-group">
                  <label>Account Status</label>
                  <select
                    name="status"
                    defaultValue={editingPatient.status}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="patient-form-actions">
                <button
                  type="button"
                  className="patient-cancel-btn"
                  onClick={() => setEditingPatient(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-action-btn"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPatients;