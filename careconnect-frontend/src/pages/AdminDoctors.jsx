import React, { useState } from "react";
import "./AdminDoctors.css";

function AdminDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      initials: "SJ",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "12 Years",
      status: "Active",
    },
    {
      id: 2,
      initials: "MB",
      name: "Dr. Michael Brown",
      specialty: "Neurologist",
      experience: "10 Years",
      status: "Active",
    },
    {
      id: 3,
      initials: "ED",
      name: "Dr. Emily Davis",
      specialty: "Dermatologist",
      experience: "8 Years",
      status: "Active",
    },
    {
      id: 4,
      initials: "JW",
      name: "Dr. James Wilson",
      specialty: "General Physician",
      experience: "15 Years",
      status: "Active",
    },
    {
      id: 5,
      initials: "OM",
      name: "Dr. Olivia Martin",
      specialty: "Pediatrician",
      experience: "9 Years",
      status: "Active",
    },
    {
      id: 6,
      initials: "DL",
      name: "Dr. Daniel Lee",
      specialty: "Orthopedic Surgeon",
      experience: "11 Years",
      status: "Active",
    },
  ]);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .replace("Dr.", "")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const openAddDoctor = () => {
    setEditingDoctor(null);
    setShowDoctorForm(true);
  };

  const openEditDoctor = (doctor) => {
    setSelectedDoctor(null);
    setEditingDoctor(doctor);
    setShowDoctorForm(true);
  };

  const handleDelete = (doctor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${doctor.name}?`
    );

    if (confirmed) {
      setDoctors((currentDoctors) =>
        currentDoctors.filter((item) => item.id !== doctor.id)
      );

      alert(`${doctor.name} has been removed successfully.`);
    }
  };

  const handleDoctorSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const specialty = formData.get("specialty").trim();
    const experience = formData.get("experience").trim();
    const status = formData.get("status");

    if (!name || !specialty || !experience) {
      alert("Please complete all required fields.");
      return;
    }

    if (editingDoctor) {
      setDoctors((currentDoctors) =>
        currentDoctors.map((doctor) =>
          doctor.id === editingDoctor.id
            ? {
                ...doctor,
                name,
                initials: getInitials(name),
                specialty,
                experience,
                status,
              }
            : doctor
        )
      );

      alert("Doctor details updated successfully.");
    } else {
      const newDoctor = {
        id: Math.max(...doctors.map((doctor) => doctor.id), 0) + 1,
        initials: getInitials(name),
        name,
        specialty,
        experience,
        status,
      };

      setDoctors((currentDoctors) => [...currentDoctors, newDoctor]);

      alert("New doctor added successfully.");
    }

    setShowDoctorForm(false);
    setEditingDoctor(null);
  };

  return (
    <div className="admin-doctors-page">
      {/* PAGE HEADER */}
      <div className="doctors-page-header">
        <div>
          <p className="page-eyebrow">DOCTOR MANAGEMENT</p>
          <h1>Manage Doctors</h1>
          <p className="page-description">
            View, manage and update all registered healthcare professionals.
          </p>
        </div>

        <button
          type="button"
          className="primary-action-btn"
          onClick={openAddDoctor}
        >
          + Add New Doctor
        </button>
      </div>

      {/* STATISTICS */}
      <div className="doctor-stats">
        <div className="doctor-stat-card">
          <div className="doctor-stat-icon total-icon">👨‍⚕️</div>
          <div>
            <span>Total Doctors</span>
            <strong>{doctors.length}</strong>
            <small>Registered professionals</small>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon active-icon">✓</div>
          <div>
            <span>Active Doctors</span>
            <strong>
              {doctors.filter(
                (doctor) => doctor.status === "Active"
              ).length}
            </strong>
            <small>Currently available</small>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon department-icon">▦</div>
          <div>
            <span>Departments</span>
            <strong>
              {new Set(doctors.map((doctor) => doctor.specialty)).size}
            </strong>
            <small>Medical specialties</small>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon new-icon">+</div>
          <div>
            <span>New This Session</span>
            <strong>+</strong>
            <small>Add healthcare professionals</small>
          </div>
        </div>
      </div>

      {/* DOCTORS MANAGEMENT CARD */}
      <section className="doctors-management-card">
        <div className="management-card-top">
          <div>
            <h2>All Doctors</h2>
            <p>View and manage all registered doctors.</p>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="doctors-table-wrapper">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>ID</th>
                <th>Status</th>
                <th className="actions-heading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <div className="doctor-profile-info">
                      <div className="doctor-avatar">
                        {doctor.initials}
                      </div>

                      <div className="doctor-name-details">
                        <strong>{doctor.name}</strong>
                        <span>Healthcare Professional</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="specialty-text">
                      {doctor.specialty}
                    </span>
                  </td>

                  <td>
                    <span className="doctor-experience">
                      {doctor.experience} Experience
                    </span>
                  </td>

                  <td>
                    <span className="doctor-id">#{doctor.id}</span>
                  </td>

                  <td>
                    <span className="doctor-status active">
                      {doctor.status}
                    </span>
                  </td>

                  <td>
                    <div className="doctor-action-buttons">
                      <button
                        type="button"
                        className="view-doctor-btn"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="edit-doctor-btn"
                        onClick={() => openEditDoctor(doctor)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-doctor-btn"
                        onClick={() => handleDelete(doctor)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="6" className="table-message">
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD / EDIT DOCTOR MODAL */}
      {showDoctorForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowDoctorForm(false)}
        >
          <div
            className="doctor-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowDoctorForm(false)}
            >
              ×
            </button>

            <h2>
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </h2>

            <p>
              {editingDoctor
                ? "Update the healthcare professional's information."
                : "Enter the details of the new healthcare professional."}
            </p>

            <form onSubmit={handleDoctorSubmit}>
              <div className="doctor-form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Dr. John Smith"
                  defaultValue={editingDoctor?.name || ""}
                  required
                />
              </div>

              <div className="doctor-form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  placeholder="e.g. Cardiologist"
                  defaultValue={editingDoctor?.specialty || ""}
                  required
                />
              </div>

              <div className="doctor-form-group">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 10 Years"
                  defaultValue={editingDoctor?.experience || ""}
                  required
                />
              </div>

              <div className="doctor-form-group">
                <label>Status</label>
                <select
                  name="status"
                  defaultValue={editingDoctor?.status || "Active"}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="modal-edit-btn"
              >
                {editingDoctor ? "Save Changes" : "Add Doctor"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DOCTOR MODAL */}
      {selectedDoctor && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="doctor-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedDoctor(null)}
            >
              ×
            </button>

            <div className="doctor-modal-profile">
              <div className="modal-avatar">
                {selectedDoctor.initials}
              </div>

              <div>
                <h2>{selectedDoctor.name}</h2>
                <p>{selectedDoctor.specialty}</p>
              </div>
            </div>

            <div className="doctor-details-grid">
              <div>
                <span>EXPERIENCE</span>
                <strong>{selectedDoctor.experience}</strong>
              </div>

              <div>
                <span>DOCTOR ID</span>
                <strong>#{selectedDoctor.id}</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong className="active-text">
                  {selectedDoctor.status}
                </strong>
              </div>

              <div>
                <span>ROLE</span>
                <strong>Healthcare Professional</strong>
              </div>
            </div>

            <button
              type="button"
              className="modal-edit-btn"
              onClick={() => openEditDoctor(selectedDoctor)}
            >
              Edit Doctor Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDoctors;