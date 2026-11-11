import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(true);
  const [error, setError] = useState("");

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
  ];

  useEffect(() => {
    const loadDoctor = async () => {
      setDoctorLoading(true);
      setError("");

      // If doctor details were passed from Doctors page
      if (location.state?.doctor) {
        setDoctor(location.state.doctor);
        setDoctorLoading(false);
        return;
      }

      // Booking page should not open without selecting a doctor
      if (!id) {
        navigate("/doctors", { replace: true });
        return;
      }

      // Load doctor details using doctor ID
      try {
        const response = await fetch(
          `http://localhost:8081/api/doctors/${id}`
        );

        if (!response.ok) {
          throw new Error("Doctor details could not be found.");
        }

        const doctorData = await response.json();
        setDoctor(doctorData);
      } catch (err) {
        console.error("Doctor loading error:", err);
        setError(
          "Unable to load doctor details. Please select a doctor again."
        );
      } finally {
        setDoctorLoading(false);
      }
    };

    loadDoctor();
  }, [id, location.state, navigate]);

  const handleConfirmAppointment = async () => {
    if (!selectedDate) {
      alert("Please select an appointment date.");
      return;
    }

    if (!selectedTime) {
      alert("Please select an appointment time.");
      return;
    }

    if (!doctor) {
      alert("Doctor details are unavailable. Please select a doctor again.");
      navigate("/doctors");
      return;
    }

    const currentUserData = localStorage.getItem("currentUser");

    if (!currentUserData) {
      alert("Please login before booking an appointment.");
      navigate("/login");
      return;
    }

    let currentUser;

    try {
      currentUser = JSON.parse(currentUserData);
    } catch (err) {
      console.error("User data error:", err);
      localStorage.removeItem("currentUser");
      alert("Your login session is invalid. Please login again.");
      navigate("/login");
      return;
    }

    if (!currentUser.id) {
      alert("User information is incomplete. Please login again.");
      navigate("/login");
      return;
    }

    const appointmentData = {
      userId: currentUser.id,
      doctorId: doctor.id,
      patientName: currentUser.name,
      doctorName: doctor.name,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      reason: reason || "",
      status: "Confirmed",
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.error(
          "Booking failed:",
          response.status,
          responseText
        );

        throw new Error(
          `Unable to book appointment. Server returned ${response.status}.`
        );
      }

      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      console.error("Appointment booking error:", err);

      alert(
        "Unable to book appointment. Please make sure the backend server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (doctorLoading) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <h2>Loading doctor details...</h2>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <h2>Unable to load doctor details.</h2>
          <p>{error}</p>

          <Link to="/doctors" className="change-doctor-btn">
            ← Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-breadcrumb">
          <Link to="/doctors">Doctors</Link>
          <span>›</span>
          <span>Book Appointment</span>
        </div>

        <div className="booking-heading">
          <div>
            <span className="booking-tag">BOOK AN APPOINTMENT</span>
            <h1>Schedule Your Visit</h1>
            <p>
              Choose a convenient date and time for your appointment.
            </p>
          </div>
        </div>

        <div className="booking-layout">
          <aside className="selected-doctor-card">
            <span className="doctor-card-label">YOUR DOCTOR</span>

            <div className="selected-doctor-profile">
              <div className="selected-doctor-avatar">
                {doctor.initials ||
                  doctor.name?.charAt(0)?.toUpperCase() ||
                  "D"}
              </div>

              <div>
                <h2>{doctor.name}</h2>
                <p>{doctor.specialty}</p>
              </div>
            </div>

            <div className="doctor-detail-list">
              <div>
                <span>✓</span>
                <p>
                  <strong>
                    {doctor.experience || "Experienced Doctor"}
                  </strong>
                  Professional Experience
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  <strong>Available Today</strong>
                  Consultation Available
                </p>
              </div>

              <div>
                <span>⌖</span>
                <p>
                  <strong>CareConnect Hospital</strong>
                  Healthcare Center
                </p>
              </div>
            </div>

            <Link to="/doctors" className="change-doctor-btn">
              ← Change Doctor
            </Link>
          </aside>

          <section className="booking-form-card">
            <h2>Appointment Details</h2>

            <p className="form-description">
              Book your appointment with {doctor.name}. Select your preferred
              date and time.
            </p>

            <form>
              <div className="booking-form-group">
                <label>Appointment Date</label>

                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) =>
                    setSelectedDate(event.target.value)
                  }
                />
              </div>

              <div className="booking-form-group">
                <label>Available Time Slots</label>

                <div className="time-slots">
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={`time-slot ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-form-group">
                <label>Reason for Visit (Optional)</label>

                <textarea
                  rows="4"
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  placeholder="Briefly describe the reason for your appointment..."
                />
              </div>

              <div className="booking-notice">
                <span>ℹ</span>
                <p>
                  Please arrive a few minutes before your scheduled appointment
                  time.
                </p>
              </div>

              <button
                type="button"
                className="confirm-booking-btn"
                onClick={handleConfirmAppointment}
                disabled={loading}
              >
                {loading
                  ? "Booking Appointment..."
                  : "Confirm Appointment →"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;