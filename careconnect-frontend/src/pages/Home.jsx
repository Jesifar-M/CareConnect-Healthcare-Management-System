import "./Home.css";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Search,
  Activity,
  CheckCircle2,
  Video,
  Phone,
  Heart,
  Award,
  CalendarDays,
} from "lucide-react";

function Home() {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            YOUR HEALTHCARE, SIMPLIFIED
          </div>

          <h1>
            Expert care for a <span>healthier</span> tomorrow.
          </h1>

          <p className="hero-description">
            Connect with trusted healthcare professionals, book appointments
            effortlessly, and take control of your health journey with
            CareConnect.
          </p>

          <div className="hero-buttons">
            <Link to="/doctors" className="home-primary-btn">
              Find a Doctor <ArrowRight size={18} />
            </Link>

            <Link to="/register" className="home-secondary-btn">
              Create Your Account
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>Safe & Secure Healthcare</strong>
              <span>Your health information matters to us.</span>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="home-hero-visual">
          <div className="hero-visual-card">
            <div className="hero-visual-top">
              <div className="visual-logo">
                <HeartPulse size={26} />
              </div>
              <span>CARECONNECT</span>
            </div>

            <div className="medical-illustration">
              <div className="medical-circle">
                <HeartPulse size={100} strokeWidth={1.3} />
              </div>

              <div className="medical-cross">+</div>

              <div className="medical-small-circle">
                <Activity size={30} />
              </div>
            </div>

            <div className="visual-status">
              <span className="status-dot"></span>
              Healthcare made simple
            </div>
          </div>

          <Link
            to="/doctors"
            className="hero-floating-card appointment-float"
          >
            <div className="float-icon">
              <CalendarCheck size={22} />
            </div>

            <div>
              <strong>Easy Appointment</strong>
              <span>Book in just a few clicks</span>
            </div>
          </Link>

          <Link to="/doctors" className="hero-floating-card care-float">
            <div className="float-icon green-float">
              <ShieldCheck size={22} />
            </div>

            <div>
              <strong>Trusted Care</strong>
              <span>Healthcare made simple</span>
            </div>
          </Link>
        </div>
      </section>

      {/* TRUST HIGHLIGHTS */}
      <section className="home-highlights">
        <div className="highlight-item">
          <div className="highlight-icon">
            <Stethoscope size={22} />
          </div>
          <div>
            <strong>Qualified Doctors</strong>
            <span>Professional healthcare</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <CalendarDays size={22} />
          </div>
          <div>
            <strong>Easy Scheduling</strong>
            <span>Convenient appointment booking</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <strong>Secure Platform</strong>
            <span>Your privacy comes first</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <Clock size={22} />
          </div>
          <div>
            <strong>Save Your Time</strong>
            <span>Simple appointment management</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services">
        <div className="home-section-heading">
          <span>OUR SERVICES</span>
          <h2>Healthcare at your fingertips</h2>
          <p>
            Everything you need to manage your healthcare journey, all in one
            convenient platform.
          </p>
        </div>

        <div className="home-services-grid">
          <div className="home-service-card">
            <div className="service-icon">
              <Search size={25} />
            </div>

            <h3>Find the Right Doctor</h3>

            <p>
              Explore doctor profiles and discover healthcare professionals
              suited to your needs.
            </p>

            <Link to="/doctors">
              Explore Doctors <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-service-card">
            <div className="service-icon">
              <CalendarCheck size={25} />
            </div>

            <h3>Book Appointments</h3>

            <p>
              Schedule your doctor appointment with a simple and convenient
              booking experience.
            </p>

            <Link to="/doctors">
              Book Appointment <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-service-card">
            <div className="service-icon">
              <Heart size={25} />
            </div>

            <h3>Manage Your Health</h3>

            <p>
              Keep track of your upcoming and past appointments in one
              organized place.
            </p>

            <Link to="/login">
              Manage Appointments <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CARECONNECT */}
      <section className="home-why">
        <div className="why-visual">
          <div className="why-decoration"></div>

          <div className="why-main-card">
            <div className="why-heart-icon">
              <HeartPulse size={62} />
            </div>

            <span>CARECONNECT</span>

            <h3>Your health deserves better care.</h3>

            <div className="why-check">
              <CheckCircle2 size={17} />
              <span>Simple appointment management</span>
            </div>

            <div className="why-check">
              <CheckCircle2 size={17} />
              <span>Trusted healthcare professionals</span>
            </div>

            <div className="why-check">
              <CheckCircle2 size={17} />
              <span>Secure patient experience</span>
            </div>
          </div>
        </div>

        <div className="why-content">
          <span className="why-tag">WHY CARECONNECT</span>

          <h2>Making healthcare easier, one appointment at a time.</h2>

          <p>
            We bring patients and healthcare professionals together through a
            convenient and easy-to-use appointment management platform.
          </p>

          <div className="why-feature">
            <div className="why-feature-icon">
              <Award size={21} />
            </div>

            <section>
              <h4>Professional Healthcare Access</h4>
              <p>
                Explore doctor profiles and their professional details.
              </p>
            </section>
          </div>

          <div className="why-feature">
            <div className="why-feature-icon">
              <Clock size={21} />
            </div>

            <section>
              <h4>Convenient Appointment Management</h4>
              <p>
                Manage your bookings and view appointment history.
              </p>
            </section>
          </div>

          <div className="why-feature">
            <div className="why-feature-icon">
              <ShieldCheck size={21} />
            </div>

            <section>
              <h4>Privacy & Security</h4>
              <p>
                A secure platform designed around patient needs.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="home-cta">
        <div>
          <span>TAKE THE FIRST STEP</span>
          <h2>Your journey to better healthcare starts here.</h2>
          <p>Find a doctor and schedule your appointment today.</p>
        </div>

        <Link to="/doctors" className="cta-button">
          Find Your Doctor <ArrowRight size={18} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-brand-title">
              <div className="footer-logo">
                <HeartPulse size={22} />
              </div>

              <h3>
                Care<span>Connect</span>
              </h3>
            </div>

            <p>
              Connecting patients with trusted healthcare professionals through
              simple and convenient appointment management.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/doctors">Find Doctors</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer-column">
            <h4>Our Platform</h4>
            <Link to="/doctors">Doctor Directory</Link>
            <Link to="/doctors">Appointment Booking</Link>
            <Link to="/login">Appointment Management</Link>
            <Link to="/login">Patient Support</Link>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <span>
              <Phone size={15} /> Healthcare Support
            </span>
            <span>
              <Video size={15} /> Online Platform
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CareConnect. All rights reserved.</span>
          <span>Healthcare made simple.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;