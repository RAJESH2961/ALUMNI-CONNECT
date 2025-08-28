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
<<<<<<< HEAD
    
=======

>>>>>>> 7df158f863d962c97da4b5eb08ac24723cc5815e
    navigate('/login')
  }

  return (
    <>
<<<<<<< HEAD
    <nav className='navbar container pt-3 pb-3 align-items-start'>
=======
      <nav className='navbar container pt-3 pb-3 align-items-start'>
>>>>>>> 7df158f863d962c97da4b5eb08ac24723cc5815e
        <Link to='/' className='navbar-brand text-light'>Stock Prediction Portal</Link>

        <div>
          {isLoggedIn ? (<>
<<<<<<< HEAD
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
=======
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button text="Dashboard" href="/dashboard" />
              <Button text="Logout" onClick={handleLogout} />
            </div>


            {/* <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
          </>) : (
            <>
              <Button text="login" href="/login" />
              &nbsp;
              <Button text="register" href="/register" />
            </>
          )}
        </div>
      </nav>
>>>>>>> 7df158f863d962c97da4b5eb08ac24723cc5815e
    </>
  )
}

export default Header