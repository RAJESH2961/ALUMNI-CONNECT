import { createContext } from 'react'
import {useState, useContext} from 'react'

// Create the context 
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn ] = useState(
        !!localStorage.getItem('AccessToken')
    );
  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};