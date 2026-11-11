import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Lock,
  UserRound,
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState("");

  const getInitial = () => {
    return currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "A";
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Password update successful
    e.target.reset();
    setMessage("Password updated successfully!");

    // Keep the form open so the user can see the success message
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-heading">
          <p>MY ACCOUNT</p>
          <h1>My Profile</h1>
          <span>View and manage your personal information.</span>
        </div>

        <div className="profile-grid">

          {/* PROFILE SUMMARY */}
          <section className="profile-summary-card">
            <div className="profile-big-avatar">
              {getInitial()}
            </div>

            <h2>{currentUser.name || "Administrator"}</h2>
            <p>{currentUser.email || "user@careconnect.com"}</p>

            <div className="profile-status">
              <span></span>
              Active Account
            </div>
          </section>

          {/* PERSONAL DETAILS */}
          <section className="profile-details-card">
            <div className="profile-card-header">
              <div>
                <h2>Personal Information</h2>
                <p>Your registered account details</p>
              </div>
            </div>

            <div className="details-grid">

              <div className="detail-item">
                <div className="detail-icon">
                  <User size={18} />
                </div>
                <div>
                  <span>Full Name</span>
                  <strong>{currentUser.name || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span>Email Address</span>
                  <strong>{currentUser.email || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span>Contact Number</span>
                  <strong>{currentUser.contact || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <span>Date of Birth</span>
                  <strong>{currentUser.dob || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <UserRound size={18} />
                </div>
                <div>
                  <span>Gender</span>
                  <strong>{currentUser.gender || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item full-width">
                <div className="detail-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span>Address</span>
                  <strong>{currentUser.address || "Not provided"}</strong>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* SECURITY SECTION */}
        <section className="profile-security-card">
          <div className="security-info">
            <div className="security-icon">
              <Lock size={21} />
            </div>

            <div>
              <h2>Password & Security</h2>
              <p>
                Keep your CareConnect account secure by updating your password regularly.
              </p>
            </div>
          </div>

          <button
            className="update-password-btn"
            onClick={() => {
              setShowPasswordForm(!showPasswordForm);
              setMessage("");
            }}
          >
            Update Password
          </button>
        </section>

        {/* UPDATE PASSWORD FORM */}
        {showPasswordForm && (
          <section className="password-form-card">
            <h2>Update Password</h2>
            <p>Create a strong password to keep your account secure.</p>

            <form onSubmit={handlePasswordUpdate}>
              <div className="password-input-grid">
                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>

              {message && (
                <p
                  className="password-message"
                  role="alert"
                >
                  {message}
                </p>
              )}

              <button type="submit" className="save-password-btn">
                Save New Password
              </button>
            </form>
          </section>
        )}

      </div>
    </div>
  );
}

export default Profile;