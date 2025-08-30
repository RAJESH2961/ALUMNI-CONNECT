import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext)
    // getting login status
    return (
        isLoggedIn ? (children) : <Navigate to='/login' />
    )
}

export default PrivateRoute