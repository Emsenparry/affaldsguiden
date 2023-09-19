import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loginData, setLoginData] = useState()

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            // Når vi henter ud er det JSON.parse
            setLoginData(JSON.parse(sessionStorage.getItem('token'))) 
        }
        // Hvis nogen af vores children ændre sig, så skal den re-render den provider.
    }, [children])

  return (
    <AuthContext.Provider value={{loginData, setLoginData}}>
        {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}