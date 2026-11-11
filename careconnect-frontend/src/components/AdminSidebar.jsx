import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  HeartPulse,
} from "lucide-react";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    alert("You have been logged out successfully.");
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo">
          <HeartPulse size={24} />
        </div>

        <div>
          <h2>CareConnect</h2>
          <span>ADMIN PORTAL</span>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        <p className="admin-sidebar-title">MAIN MENU</p>

        <NavLink to="/admin/dashboard" className="admin-nav-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/doctors" className="admin-nav-link">
          <Stethoscope size={20} />
          <span>Doctors</span>
        </NavLink>

        <NavLink to="/admin/patients" className="admin-nav-link">
          <Users size={20} />
          <span>Patients</span>
        </NavLink>

        <NavLink to="/admin/appointments" className="admin-nav-link">
          <CalendarDays size={20} />
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/admin/reports" className="admin-nav-link">
          <BarChart3 size={20} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/admin/settings" className="admin-nav-link">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="admin-sidebar-bottom">
        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;