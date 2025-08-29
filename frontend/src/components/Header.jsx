import React from 'react'
import Button from './UI/Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { useContext } from 'react'

const headerStyles = {
  wrapper: {
    backgroundColor: '#2563EB',
    color: '#ffffff',
    borderBottom: '1px solid rgba(255,255,255,0.15)'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 700,
    fontSize: '20px',
    color: '#ffffff',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    opacity: 0.95
  }
}

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    if (!confirm('Are you sure you want to logout?')) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login')
  }

  return (
    <header style={headerStyles.wrapper}>
      <div style={headerStyles.container}>
        <Link to='/' style={headerStyles.brand}>
          <span>🎓 Alumni Connect</span>
        </Link>
        <nav style={headerStyles.nav}>
          <Link to='/' style={headerStyles.link}>Home</Link>
          <Link to='/profile' style={headerStyles.link}>Profile</Link>
          <Link to='/events' style={headerStyles.link}>Events</Link>
          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button text="Dashboard" href="/profile" />
              <Button text="Logout" onClick={handleLogout} />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button text="Login" href="/login" />
              <Button text="Register" href="/register" />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header