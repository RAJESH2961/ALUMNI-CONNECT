import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'
// getting login status

export const PublicRoute = ({children}) => {
  const { isLoggedIn } = useContext(AuthContext);
    return (
      !isLoggedIn ? (children) : <Navigate to='/dashboard' />
    )
}


