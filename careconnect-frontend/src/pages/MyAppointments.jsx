import { useEffect, useState } from "react";
import "./MyAppointments.css";

function MyAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load appointments from backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8081/api/appointments"
      );

      if (!response.ok) {
        throw new Error("Failed to load appointments");
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
      alert("Unable to load appointments from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel appointment
  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (appointment) => appointment.id !== id
        )
      );

      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Unable to cancel appointment.");
    }
  };

  // Separate upcoming and past appointments
  const today = new Date().toISOString().split("T")[0];

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDate >= today &&
      appointment.status !== "CANCELLED"
  );

  const pastAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDate < today ||
      appointment.status === "COMPLETED"
  );

  const displayedAppointments =
    activeTab === "upcoming"
      ? upcomingAppointments
      : pastAppointments;

  // Get initials from doctor name
  const getInitials = (name) => {
    if (!name) return "DR";

    return name
      .replace("Dr.", "")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <div className="my-appointments-page">
      <section className="appointments-hero">
        <div>
          <span className="section-tag">MY HEALTHCARE</span>
          <h1>My Appointments</h1>
          <p>View and manage all your upcoming and past appointments.</p>
        </div>
      </section>

      <main className="appointments-container">
        <div className="appointments-tabs">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Appointments
          </button>

          <button
            className={activeTab === "past" ? "active" : ""}
            onClick={() => setActiveTab("past")}
          >
            Past Appointments
          </button>
        </div>

        <div className="appointments-list">
          {loading ? (
            <div className="empty-appointments">
              <h2>Loading appointments...</h2>
            </div>
          ) : displayedAppointments.length > 0 ? (
            displayedAppointments.map((appointment) => (
              <article
                className="user-appointment-card"
                key={appointment.id}
              >
                <div className="appointment-doctor">
                  <div className="appointment-avatar">
                    {getInitials(appointment.doctorName)}
                  </div>

                  <div>
                    <h2>{appointment.doctorName}</h2>
                    <p>Appointment Consultation</p>
                  </div>
                </div>

                <div className="appointment-meta">
                  <div>
                    <span className="meta-label">DATE</span>
                    <strong>
                      {formatDate(appointment.appointmentDate)}
                    </strong>
                  </div>

                  <div>
                    <span className="meta-label">TIME</span>
                    <strong>
                      {appointment.appointmentTime}
                    </strong>
                  </div>

                  <div>
                    <span className="meta-label">STATUS</span>
                    <span
                      className={`appointment-status ${appointment.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>

                {activeTab === "upcoming" && (
                  <button
                    className="cancel-appointment-btn"
                    onClick={() =>
                      cancelAppointment(appointment.id)
                    }
                  >
                    Cancel Appointment
                  </button>
                )}
              </article>
            ))
          ) : (
            <div className="empty-appointments">
              <div className="empty-icon">📅</div>

              <h2>
                {activeTab === "upcoming"
                  ? "No Upcoming Appointments"
                  : "No Past Appointments"}
              </h2>

              <p>
                You don't have any{" "}
                {activeTab === "upcoming"
                  ? "upcoming"
                  : "past"}{" "}
                appointments at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyAppointments;