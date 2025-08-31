# 🎓 Alumni Connect Portal

[![GitHub Repo](https://img.shields.io/badge/GitHub-ALUMNI--CONNECT-blue)](https://github.com/RAJESH2961/ALUMNI-CONNECT)
[![Python Version](https://img.shields.io/badge/Python-3.11-blue)]()
[![React Version](https://img.shields.io/badge/React-18.2-blue)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

---

A **full-stack web application** designed to bridge the gap between current students and alumni of an institution.  
This platform promotes **alumni networking, mentorship, career guidance**, and a **vibrant institutional community**.

---

## 🌐 Repository
Access the source code on GitHub:  
🔗 [ALUMNI-CONNECT](https://github.com/RAJESH2961/ALUMNI-CONNECT)

---

## 🧠 Project Overview

**Alumni Connect Portal** empowers both students and alumni by providing:

- 🧑‍🎓 **User Registration:** Sign up as a student or alumni  
- 🔐 **Secure Authentication:** JWT-based authentication for safe logins  
- 📝 **Profile Management:** Maintain personal and professional information  
- 🔍 **Alumni Directory:** Search and filter alumni by skills, batch, or location  
- 📢 **Events & Announcements:** View or post institutional events  
- 💬 **Messaging & Networking:** Direct communication within the portal  
- 🛠 **Admin Controls:** Approve or manage users and content  

This platform helps **students gain career insights** while enabling **alumni to give back to the community**.

---

## ⚙️ Tech Stack

### 📌 Frontend
- **React.js** for UI development  
- **React Router** for SPA navigation  
- **Axios** for API calls  
- **Tailwind CSS** for modern, responsive styling  

### 📌 Backend
- **Django** as the web framework  
- **Django REST Framework (DRF)** for API endpoints  
- **Simple JWT Authentication** for secure token-based auth  
- **django-cors-headers** to handle cross-origin requests  

### 📌 Database
- **SQLite** for local development  
- Easily upgradeable to **PostgreSQL** or **MySQL** for production  

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/RAJESH2961/ALUMNI-CONNECT.git
cd ALUMNI-CONNECT


### 2. Backend Setup (Django + DRF)
cd backend

### Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate   # Mac/Linux

venv\Scripts\activate      # Windows

### Install dependencies
pip install -r requirements.txt

### Apply migrations
python manage.py migrate

### Create superuser (for admin access)
python manage.py createsuperuser

### Run backend server
python manage.py runserver
### Backend will run at http://127.0.0.1:8000/

### 3. Frontend Setup (React.js + Tailwind)
### Open a new terminal in project root
cd frontend

### Install dependencies
npm install

### Start frontend development server
npm start
### Frontend will run at http://localhost:3000/


# Backend API URL
REACT_APP_API_URL=http://127.0.0.1:8000/api

# Optional environment flag
REACT_APP_ENV=development


# Django Secret Key
SECRET_KEY=your_django_secret_key_here

# Debug mode (set False in production)
DEBUG=True

# Allowed hosts
ALLOWED_HOSTS=127.0.0.1, localhost

# Database settings (SQLite default)
DB_NAME=db.sqlite3
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

# JWT Settings
JWT_SECRET=your_jwt_secret_key_here


# Backend API URL
REACT_APP_API_URL=http://127.0.0.1:8000/api

# Optional environment flag
REACT_APP_ENV=development

