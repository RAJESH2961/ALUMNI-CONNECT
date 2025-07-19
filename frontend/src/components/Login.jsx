import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_BASE_API}api/login/`, {
        email: form.email,
        password: form.password,
      });
  
      localStorage.setItem('AccessToken', response.data.access);
      localStorage.setItem('RefreshToken', response.data.refresh);
      setIsLoggedIn(true);
      navigate('/'); // make sure this matches your App.jsx route
      setErrors({});
      confetti();
      setForm({ email: '', password: '' });
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
        console.error('Login Error:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Login to our portal</h2>

        {errors.detail && (
          <div className="text-danger" style={{ marginBottom: '1rem' }}>
            {errors.detail}
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <small>{errors.email && <div className="text-danger">{errors.email}</div>}</small>
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
