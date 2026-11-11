import { useState } from "react";
import "./AdminSettings.css";

function AdminSettings() {
  const [adminName, setAdminName] = useState("Administrator");
  const [adminEmail, setAdminEmail] = useState(
    "admin@careconnect.com"
  );

  const handleSave = (event) => {
    event.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-settings-page">
      <div className="settings-header">
        <div>
          <p className="settings-label">ACCOUNT SETTINGS</p>
          <h1>Settings</h1>
          <p>
            Manage your CareConnect admin account and preferences.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* ADMIN PROFILE */}
        <section className="settings-card">
          <div className="settings-card-header">
            <div>
              <h2>Admin Profile</h2>
              <p>Update your account information.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="settings-form">
            <div className="profile-preview">
              <div className="settings-avatar">A</div>

              <div>
                <h3>{adminName}</h3>
                <p>CareConnect Administrator</p>
              </div>
            </div>

            <div className="settings-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={adminName}
                onChange={(event) =>
                  setAdminName(event.target.value)
                }
              />
            </div>

            <div className="settings-form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(event) =>
                  setAdminEmail(event.target.value)
                }
              />
            </div>

            <button type="submit" className="settings-save-btn">
              Save Changes
            </button>
          </form>
        </section>

        {/* SECURITY */}
        <section className="settings-card">
          <div className="settings-card-header">
            <div>
              <h2>Password & Security</h2>
              <p>Keep your administrator account secure.</p>
            </div>
          </div>

          <div className="security-content">
            <div className="security-item">
              <div className="security-icon">🔒</div>

              <div>
                <h3>Change Password</h3>
                <p>
                  Update your password regularly to keep your account secure.
                </p>
              </div>

              <button
                type="button"
                className="security-btn"
                onClick={() =>
                  alert("Password update feature will be available here.")
                }
              >
                Update
              </button>
            </div>

            <div className="security-item">
              <div className="security-icon">🛡</div>

              <div>
                <h3>Account Security</h3>
                <p>
                  Your CareConnect administrator account is protected.
                </p>
              </div>

              <span className="security-status">Active</span>
            </div>
          </div>
        </section>
      </div>

      {/* SYSTEM PREFERENCES */}
      <section className="settings-card preferences-card">
        <div className="settings-card-header">
          <div>
            <h2>System Preferences</h2>
            <p>Manage your CareConnect dashboard preferences.</p>
          </div>
        </div>

        <div className="preferences-list">
          <div className="preference-item">
            <div>
              <h3>Email Notifications</h3>
              <p>
                Receive important updates about appointments and users.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="settings-toggle"
            />
          </div>

          <div className="preference-item">
            <div>
              <h3>Appointment Notifications</h3>
              <p>
                Get notified when a new appointment is created.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="settings-toggle"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminSettings;