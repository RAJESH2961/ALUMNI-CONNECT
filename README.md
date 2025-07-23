# 🎓 Alumni Connect Portal

A full-stack web application built to bridge the gap between current students and alumni of an institution. This platform enables alumni networking, career guidance, event participation, and a thriving institutional community.

---

## 🌐 Live Repository

🔗 [GitHub - Alumni Connect](https://github.com/RAJESH2961/ALUMNI-CONNECT)

---

## 🧠 Project Overview

The **Alumni Connect Portal** allows users to:

- 🧑‍🎓 Register as alumni or students
- 🔐 Authenticate securely using JWT
- 📝 Maintain and update personal and professional profiles
- 🔍 View and search alumni directory
- 📢 Post or view upcoming events and announcements
- 💬 Facilitate communication between users
- 🛠 Admin control over users and data

---

## ⚙️ Tech Stack Used

### 📌 Frontend
- **React.js**
- **React Router**
- **Axios**
- **Tailwind CSS**

### 📌 Backend
- **Django**
- **Django REST Framework**
- **Simple JWT Authentication**
- **CORS Headers**

### 📌 Database
- **SQLite** (can be extended to PostgreSQL/MySQL)

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository


git clone https://github.com/RAJESH2961/ALUMNI-CONNECT.git
cd ALUMNI-CONNECT

cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
