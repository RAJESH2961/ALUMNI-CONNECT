import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider'

export const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext)
    // getting login status
    return (
        !isLoggedIn ? (children) : <Navigate to='/profile' />
    )
}


