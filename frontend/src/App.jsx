import { useState } from 'react'
import './assets/css/style.css'
import Header from './components/Header'
import Footer from './components/Footer'
// setting up things for Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
// Auth Provider to manage Login Status based on Token status in Local storage
// Global logged in state is managed in AuthProvider context that data is enclosed in this app so that entire App can access to that data
import AuthProvider from './context/AuthProvider'
// import Dashboard from './components/Dashboard/Dashboard'

import PrivateRoute from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import ActivateAccount from './pages/ActivateAccount'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Events from './pages/Events'
import Alumni from './pages/Alumni'
import Posts from './pages/Posts'

// PublicRoute
function App() {

  return (
    <>
      {/* Now the logges in status is accessible all the components */}
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/activate/:token" element={<ActivateAccount />} />

              {/* Protected Routes */}
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/events" element={<Events />} />

              {/* Alumni Routes */}
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/alumni/:alumniId" element={<Alumni />} /> {/* Added for profile view */}

              <Route path="/posts" element={<Posts />} />
            </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
