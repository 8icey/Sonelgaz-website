# ⚡ Sonelgaz Intervention Management Platform

A full-stack web application developed during a 4th-year engineering internship to manage technical projects and field interventions within an energy-sector organization similar to Sonelgaz.

The platform provides centralized management of:

- Clients
- Projects
- Interventions
- Users
- Role-Based Access Control (RBAC)
- Authentication (JWT)
- Status tracking
- Assignment management

---

## 🚀 Project Overview

This project was designed to improve traceability, coordination, and monitoring of technical operations.

It replaces fragmented manual processes with a centralized digital platform that:

- Organizes intervention workflows
- Controls user access based on role
- Tracks project and intervention status
- Allows assignment and reassignment of technicians
- Provides dashboard analytics

---

## 🏗️ Architecture

The application follows a layered backend architecture:

- **Routing Layer** – Express routes
- **Controller Layer** – Business logic
- **ORM Layer** – Sequelize
- **Database Layer** – PostgreSQL

Frontend is built using:

- HTML
- CSS
- Vanilla JavaScript (no frameworks)

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt (password hashing)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

---

## 🔐 Authentication & Security

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected routes using middleware
- Password hashing with bcrypt
- Frontend route guarding
- Session handling via localStorage

### Roles Implemented

- Admin
- Manager
- Technician

Each role has different permissions.

---

## 📊 Features

### 👤 User Management (Admin Only)
- Create users
- Edit users
- Delete users
- Assign roles

### 🏢 Client Management
- View clients (All roles)
- Create client (Admin / Manager)
- Edit client (Admin / Manager)
- Delete client (Admin only)

### 📁 Project Management
- Create project
- Edit project
- Delete project
- View all projects

### 🔧 Intervention Management
- Create intervention
- Assign technician
- Unassign technician
- Update status
- View only assigned interventions (Technician)
- Reassign users

### 📈 Dashboard
- Dynamic role-based dashboard
- Statistics
- Intervention status summary
- Personal task overview for technicians

---

## 🗄️ Database Design

Includes:

- Users
- Roles
- Clients
- Projects
- Interventions
- Status
- Junction tables for many-to-many relationships

Designed using:

- Conceptual Data Model (MCD)
- Logical Data Model (MLD)

---

## ▶️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/sonelgaz-platform.git
cd sonelgaz-platform

