# 🏥 CareConnect – Healthcare Appointment Management System

A full-stack healthcare appointment management system designed to simplify doctor discovery, appointment booking, and healthcare administration.

CareConnect provides separate user and admin portals with a clean, responsive, and professional interface. Users can register, browse doctors, book and manage appointments, and maintain their profile, while administrators can manage doctors, patients, appointments, reports, and application settings.

---

## 📋 Project Overview

CareConnect is a full-stack web application built to provide a simple and efficient healthcare appointment management experience.

The application consists of two main portals:

### 👤 User Portal

Users can:

- Register and log in to their account
- Browse available doctors
- View doctor details
- Book appointments
- View and manage appointments
- View profile information
- Update their password securely

### 🛠️ Admin Portal

Administrators can:

- Access the admin dashboard
- Manage doctors
- Manage patients
- Manage appointments
- View reports and analytics
- Manage application settings

---

## ✨ Features

### 👤 User Features

- User registration and authentication
- User login and logout
- Browse available doctors
- View doctor details
- Book appointments by selecting a preferred date and time
- View upcoming appointments
- View appointment history
- Cancel appointments when required
- View and manage user profile
- Secure password update with current password verification

### 🛠️ Admin Features

- Secure admin login
- Professional admin dashboard
- Appointment management
- Doctor management
  - Add doctors
  - View doctor profiles
  - Edit doctor information
  - Delete doctors
- Patient management
  - View registered patients
  - View patient details
  - View appointment history
- Reports and analytics
  - Appointment statistics
  - Patient statistics
  - Most viewed doctors
  - Appointment trends
- Admin settings

---

## 🔐 Demo Login Credentials

The following credentials can be used to explore and test the application.

### 🛠️ Admin Login

| Field | Details |
|-------|---------|
| **Email** | `admin@careconnect.com` |
| **Password** | `Admin@123` |
| **Site** | `http://localhost:3000` |

Use these credentials to access the Admin Portal and manage appointments, doctors, patients, reports, and settings.

### 👤 User Login

| Field | Details |
|-------|---------|
| **Email** | `arjun.menon2026@example.com` |
| **Password** | `Test@1234` |
| **Site** | `http://localhost:3000` |

Use these credentials to access the User Portal, browse doctors, book appointments, manage appointments, and update profile information.

> **Note:** These credentials are intended for demonstration and testing purposes only.

---

## 🖥️ Technology Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- Axios
- Lucide React
- Recharts

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- Maven

### Database

- MySQL

---

## 📁 Project Structure

```text
CareConnect
│
├── careconnect-frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── layouts
│   │   └── pages
│   ├── package.json
│   └── vite.config.js
│
└── careconnect-backend
    ├── src
    │   └── main
    │       ├── java
    │       │   └── careconnect_backend
    │       │       ├── controller
    │       │       ├── dto
    │       │       ├── entity
    │       │       ├── repository
    │       │       └── service
    │       └── resources
    │           └── application.properties
    └── pom.xml
```

---

## ⚙️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE careconnect_db;
```

Update the database configuration in:

```text
careconnect-backend/src/main/resources/application.properties
```

Make sure the database name, username, and password match your local MySQL configuration.

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd careconnect-backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend server runs on:

```text
http://localhost:8081
```

When the backend starts successfully, you should see:

```text
Tomcat started on port 8081
Started CareconnectBackendApplication
```

---

## 💻 Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd careconnect-frontend
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application using the local URL displayed in the terminal.

The application typically runs on:

```text
http://localhost:3000
```

---

## ▶️ Running the Application

To run CareConnect successfully:

1. Start the MySQL server.
2. Create the `careconnect_db` database.
3. Verify the database configuration in `application.properties`.
4. Start the Spring Boot backend.
5. Start the React frontend.
6. Open the frontend URL displayed in the terminal.

Make sure both the frontend and backend servers are running while using the application.

---

## 📡 API Overview

The React frontend communicates with the Spring Boot backend using REST APIs.

### 🔐 Authentication API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| PUT | `/api/auth/update-password` | Update the user's password after verifying the current password |

### 📅 Appointment API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Create a new appointment |
| GET | `/api/appointments` | View all appointments |
| GET | `/api/appointments/{id}` | View appointment details |
| PUT | `/api/appointments/{id}` | Update an appointment |
| DELETE | `/api/appointments/{id}` | Delete an appointment |

The backend API runs locally at:

```text
http://localhost:8081
```

---

## 📋 Application Modules

### 👤 User Modules

- 🏠 Home
- 👨‍⚕️ Find Doctors
- 📅 Book Appointment
- 📋 My Appointments
- 👤 Profile
- 🔐 Login
- 📝 Registration

### 🛠️ Admin Modules

- 📊 Dashboard
- 📅 Appointment Management
- 👨‍⚕️ Doctor Management
- 👥 Patient Management
- 📈 Reports and Analytics
- ⚙️ Settings

---

## ⭐ Project Highlights

- Clean and professional user interface
- Responsive design for desktop and mobile devices
- Separate user and admin portals
- Full-stack application architecture
- Secure user authentication
- Secure password update with current password verification
- REST API integration
- MySQL database integration
- Doctor and patient management
- Appointment booking and management
- Professional admin dashboard
- Responsive admin dashboard for desktop and mobile views
- Reports and analytics

---

## 👩‍💻 Developer

**Jesifar M**

Developed as a full-stack healthcare appointment management project using:

**React.js | Spring Boot | MySQL | Java**