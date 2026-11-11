import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("You have been logged out successfully.");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <HeartPulse size={24} />
          </div>

          <span>
            Care<span>Connect</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/doctors">
            Find Doctors
          </Link>

          {currentUser ? (
            <>
              <Link to="/my-appointments">
                My Appointments
              </Link>

              <Link
                to="/profile"
                className="profile-link"
                title="My Profile"
              >
                <span className="profile-avatar">
                  {currentUser.name
                    ? currentUser.name.charAt(0).toUpperCase()
                    : "A"}
                </span>
              </Link>

              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Admin always opens the Admin Login page */}
              <Link to="/admin-login">Admin</Link>

              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="nav-register"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;