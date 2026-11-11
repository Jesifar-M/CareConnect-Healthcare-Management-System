import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      // Read response as text first
      const responseText = await response.text();

      if (!response.ok) {
        alert(responseText || "Invalid email address or password.");
        return;
      }

      // Convert successful response to JSON
      const data = JSON.parse(responseText);

      // Save logged-in user information, including role
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          dob: data.dob,
          gender: data.gender,
          address: data.address,
          contactNumber: data.contactNumber,
          role: data.role,
        })
      );

      alert(`Welcome back, ${data.name}!`);

      // Redirect based on user role
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-info">
          <span className="auth-tag">WELCOME TO CARECONNECT</span>

          <h1>
            Your healthcare journey,
            <span> made simple.</span>
          </h1>

          <p>
            Access your appointments and manage your healthcare journey from
            one convenient platform.
          </p>

          <div className="auth-benefits">
            <div>
              <span>✓</span>
              <p>Manage your appointments easily</p>
            </div>

            <div>
              <span>✓</span>
              <p>Connect with trusted healthcare professionals</p>
            </div>

            <div>
              <span>✓</span>
              <p>Secure and simple healthcare experience</p>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <span className="login-icon">⌕</span>
            <h2>Welcome Back</h2>
            <p>Login to manage your healthcare appointments.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label>Password</label>
                <span>Forgot Password?</span>
              </div>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Your Account →"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;