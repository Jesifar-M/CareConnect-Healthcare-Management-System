import { useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "../App.css";

function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        mobileOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      {menuOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      <main className="dashboard-content">
        <header className="mobile-dashboard-header">
          <div className="mobile-brand">
            <div className="mobile-brand-icon">
              <HeartPulse size={20} />
            </div>
            <span>CareConnect</span>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </header>

        <div className="dashboard-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;