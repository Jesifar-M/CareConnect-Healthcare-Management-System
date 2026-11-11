import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  BarChart3,
  Settings,
  LogOut,
  HeartPulse,
  X,
} from "lucide-react";
import "./AdminSidebar.css";

function Sidebar({ mobileOpen, closeMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    navigate("/");
  };

  const handleNavigation = () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  };

  return (
    <aside className={`admin-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="admin-sidebar-top">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <HeartPulse size={23} />
          </div>

          <div className="admin-brand-text">
            <h2>CareConnect</h2>
            <span>ADMIN PORTAL</span>
          </div>

          <button
            className="sidebar-close-button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <p className="admin-sidebar-title">MAIN MENU</p>

          <NavLink
            to="/admin/dashboard"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/appointments"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <CalendarDays size={19} />
            <span>Appointments</span>
          </NavLink>

          <NavLink
            to="/admin/doctors"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <Stethoscope size={19} />
            <span>Doctors</span>
          </NavLink>

          <NavLink
            to="/admin/patients"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <Users size={19} />
            <span>Patients</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <BarChart3 size={19} />
            <span>Reports</span>
          </NavLink>

          <div className="admin-sidebar-divider" />

          <p className="admin-sidebar-title">ACCOUNT</p>

          <NavLink
            to="/admin/settings"
            className="admin-nav-link"
            onClick={handleNavigation}
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="admin-sidebar-bottom">
        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

        <div className="sidebar-admin-user">
          <div className="sidebar-user-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;