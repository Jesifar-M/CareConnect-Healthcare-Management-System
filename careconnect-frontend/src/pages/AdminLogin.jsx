import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your admin email and password.");
      return;
    }

    setLoading(true);

    // Demo Admin Credentials
    const adminEmail = "admin@careconnect.com";
    const adminPassword = "Admin@123";

    // Check admin credentials
    if (
      email.trim().toLowerCase() === adminEmail &&
      password === adminPassword
    ) {
      // Save admin login information
      localStorage.setItem(
        "currentAdmin",
        JSON.stringify({
          name: "CareConnect Admin",
          email: adminEmail,
          role: "ADMIN",
        })
      );

      alert("Welcome, CareConnect Admin!");

      // Redirect to Admin Dashboard
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-info">
          <span className="auth-tag">CARECONNECT ADMIN</span>

          <h1>
            Manage healthcare,
            <span> efficiently.</span>
          </h1>

          <p>
            Login to access the CareConnect administration dashboard and manage
            doctors, patients, appointments and reports.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <span className="login-icon">⚕</span>
            <h2>Admin Login</h2>
            <p>Please enter your administrator credentials.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login to Admin Dashboard →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;