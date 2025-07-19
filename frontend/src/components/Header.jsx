import React from 'react'
import Button from './UI/Button'
import { Link, useNavigate } from 'react-router-dom'
// Use COntext for loggesin status
import { AuthContext } from '../AuthProvider'
import { useContext } from 'react'
const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // Handling logout Remove access token
  function handleLogout() {
    alert("Are you sure to logout")
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    setIsLoggedIn(false);
    console.log("Logged out");
    
    navigate('/login')
  }

  return (
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link to='/' className='navbar-brand text-light'>Stock Prediction Portal</Link>

        <div>
          {isLoggedIn ? (<>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button text="Dashboard" href="/dashboard" />
          <Button text="Logout" onClick={handleLogout} />
        </div>


          {/* <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
          </>) : (
            <>
            <Button text="login" href="/login"/>
            &nbsp;
            <Button text="register" href="/register" />
            </>
            )}
        </div>
    </nav>
    </>
  )
}

export default Header