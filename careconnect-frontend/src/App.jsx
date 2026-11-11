import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";
import AdminAppointments from "./pages/AdminAppointments";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

// User Pages
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";

function AdminPage({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppContent() {
  const location = useLocation();

  const isAdminPortal =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/dashboard") ||
    location.pathname.startsWith("/admin/appointments") ||
    location.pathname.startsWith("/admin/doctors") ||
    location.pathname.startsWith("/admin/patients") ||
    location.pathname.startsWith("/admin/reports") ||
    location.pathname.startsWith("/admin/settings");

  return (
    <>
      {!isAdminPortal && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

{/* USER */}
<Route path="/book-appointment" element={<BookAppointment />} />
<Route path="/book-appointment/:id" element={<BookAppointment />} />
<Route path="/my-appointments" element={<MyAppointments />} />
<Route path="/profile" element={<Profile />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN PORTAL */}
        <Route
          path="/admin"
          element={
            <AdminPage>
              <AdminDashboard />
            </AdminPage>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminPage>
              <AdminDashboard />
            </AdminPage>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <AdminPage>
              <AdminAppointments />
            </AdminPage>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <AdminPage>
              <AdminDoctors />
            </AdminPage>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <AdminPage>
              <AdminPatients />
            </AdminPage>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminPage>
              <AdminReports />
            </AdminPage>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminPage>
              <AdminSettings />
            </AdminPage>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;