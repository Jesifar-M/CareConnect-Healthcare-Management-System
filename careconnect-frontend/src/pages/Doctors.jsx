import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Unable to load doctors. Please check the backend server.");
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name || ""} ${doctor.specialty || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <section className="doctors-hero">
        <div className="doctors-hero-content">
          <span className="section-tag">OUR DOCTORS</span>

          <h1>
            Find the Right <span>Doctor for You</span>
          </h1>

          <p>
            Browse our experienced healthcare professionals and find the right
            specialist for your healthcare needs.
          </p>
        </div>
      </section>

      <section className="doctors-content">
        <div className="doctors-heading">
          <div>
            <span className="section-tag">HEALTHCARE PROFESSIONALS</span>
            <h2>Meet Our Trusted Doctors</h2>
            <p>
              Choose from qualified and experienced healthcare professionals.
            </p>
          </div>

          <div className="doctor-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by doctor or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <p className="loading-message">Loading doctors...</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && (
          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <article className="doctor-card" key={doctor.id}>
                  <div className="doctor-card-top">
                    <div className="doctor-avatar">
                      {doctor.initials ||
                        doctor.name?.charAt(0)?.toUpperCase() ||
                        "D"}
                    </div>

                    <span className="available-status">
                      <span className="status-dot"></span>
                      Available Today
                    </span>
                  </div>

                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>

                    <div className="doctor-experience">
                      <span>✓</span>
                      {doctor.experience}
                    </div>
                  </div>

                  {/* Pass selected doctor directly to booking page */}
                  <Link
                    to={`/book-appointment/${doctor.id}`}
                    state={{ doctor }}
                    className="book-btn"
                  >
                    Book Appointment →
                  </Link>
                </article>
              ))
            ) : (
              <div className="no-doctors">
                <h3>No doctors found</h3>
                <p>Try searching with a different doctor name or specialty.</p>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="doctor-cta">
        <div>
          <span className="section-tag light-tag">NEED HELP?</span>
          <h2>Your health journey starts here.</h2>
          <p>
            Find a trusted healthcare professional and book your appointment
            today.
          </p>
        </div>

        <Link to="/register" className="cta-button">
          Get Started →
        </Link>
      </section>
    </div>
  );
}

export default Doctors;