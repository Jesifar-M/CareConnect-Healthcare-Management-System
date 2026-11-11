🏥 CareConnect – Healthcare Appointment Management System

A full-stack healthcare appointment management system designed to simplify doctor discovery, appointment booking, and hospital administration.

CareConnect provides separate user and admin portals with a clean, responsive, and professional interface. The platform enables users to find doctors, book appointments, and manage their healthcare appointments, while administrators can manage doctors, patients, appointments, and reports.

📋 Project Overview

The CareConnect Healthcare Appointment Management System is a full-stack web application developed to provide an efficient and user-friendly healthcare appointment management experience.

The application consists of two main modules:

User Portal – Allows patients to register, log in, browse doctors, book appointments, and manage their appointments.

Admin Portal – Allows administrators to manage doctors, patients, appointments, reports, and application settings.

✨ Features

    👤 User Portal

- User registration and authentication
- User login and logout
- Browse available doctors
- View doctor details
- Book appointments by selecting a preferred date and time
- View upcoming appointments
- View appointment history
- Cancel appointments when required
- Manage user profile
- Update password

   🛠️ Admin Portal

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

    🔐 Demo Login Credentials

The following credentials can be used to explore and test the application.

   🛠️ Admin Login

| Field | Details |
|-------|---------|
| Email | admin@careconnect.com |
| Site | http://localhost:3000 |
| Password | Admin@123 |
| Note | Use these credentials to access the Admin Portal and manage appointments, doctors, patients, reports, and settings. |

   👤 User Login

| Field | Details |
|-------|---------|
| Email | arjun.menon |
| Site | http://localhost:3000 |
| Password | test123 |
| Note | Use these credentials to access the User Portal, browse doctors, book appointments, manage appointments, and update the user profile. |

Note:  These credentials are intended for demonstration and testing purposes only.

  🖥️ Technology Stack

# Frontend

- React.js
- Vite
- React Router
- JavaScript
- HTML5
- CSS3

# Backend

- Java
- Spring Boot
- Spring Data JPA
- Maven

# Database

- MySQL

📁 Project Structure

CareConnect
│
├── careconnect-frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   └── services
│   ├── package.json
│   └── vite.config.js
│
└── careconnect-backend
    ├── src
    │   └── main
    │       ├── java
    │       └── resources
    ├── pom.xml
    └── mvnw


  🚀 Getting Started

# Prerequisites

Make sure the following software is installed on your system:

- Node.js
- Java JDK 21
- Maven
- MySQL

 ⚙️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE careconnect_db;
```

Ensure that your database configuration in the backend application.properties file matches your local MySQL configuration.

🔧 Backend Setup

Navigate to the backend folder:

```bash
cd careconnect-backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend server will run on:

http://localhost:8081

When the backend starts successfully, you should see messages similar to:

```
Tomcat started on port 8081
Started CareconnectBackendApplication
```

  💻 Frontend Setup

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

    ▶️ Running the Complete Application

To run the CareConnect application successfully:

1. Start the MySQL server.
2. Create the careconnect_db database.
3. Start the Spring Boot backend on port 8081.
4. Start the React frontend using Vite.
5. Open the frontend URL displayed in the terminal, typically:

http://localhost:3000

Make sure both the frontend and backend servers are running while using the application.

   📡 API Overview

The React frontend communicates with the Spring Boot backend using REST APIs.

# Appointment API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/appointments | Create a new appointment |
| GET | /api/appointments | View all appointments |
| GET | /api/appointments/{id} | View appointment details |
| PUT | /api/appointments/{id} | Update an appointment |
| DELETE | /api/appointments/{id} | Delete an appointment |

The backend API runs locally at:

http://localhost:8081

 📋 Application Modules

     👤 User Modules

- 🏠 Home
- 👨‍⚕️ Find Doctors
- 📅 Book Appointment
- 📋 My Appointments
- 👤 Profile
- 🔐 Login
- 📝 Registration

    🛠️ Admin Modules

- 📊 Dashboard
- 📅 Appointment Management
- 👨‍⚕️ Doctor Management
- 👥 Patient Management
- 📈 Reports and Analytics
- ⚙️ Settings

     🎯 Project Objective

The objective of CareConnect is to provide a simple and efficient platform for managing healthcare appointments.

The system aims to improve the appointment booking experience for patients while providing hospital administrators with centralized tools to manage doctors, patients, appointments, and reports.

⭐ Key Highlights

- Clean and professional user interface
- Responsive application design
- Separate user and admin portals
- Full-stack application architecture
- React-based frontend
- Spring Boot REST API backend
- MySQL database integration
- Doctor management
- Patient management
- Appointment booking and management
- Admin dashboard
- Reports and analytics

👩‍💻 Developer - Jesifar M

Developed as a full-stack healthcare appointment management project using:

React.js | Spring Boot | MySQL | Java
