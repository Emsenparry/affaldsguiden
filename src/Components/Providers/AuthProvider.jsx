import React, { createContext, useContext, useEffect, useState } from "react";

// Dette er en kontekst, der oprettes ved hjælp af createContext().
// En kontekst er et sted, hvor du kan gemme og dele data på tværs af komponenter i din app.
const AuthContext = createContext();

// Dette er en komponent, der fungerer som en kontekstudbyder.
// Den tager children som en prop, hvilket er det indhold, der skal omgives af denne kontekstudbyder
// Tjek index.js!!!
const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState();

  // Kontrollere, om der allerede er autentificeringsdata i sessionStorage.
  // Hvis der er, hentes dataene og gemmes i loginData.
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // Når vi henter ud er det JSON.parse
      setLoginData(JSON.parse(sessionStorage.getItem("token")));
    }
    // Hvis nogen af vores children ændre sig, så skal den re-render den provider.
  }, [children]);

  return (
    <AuthContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

// useContext er et hook, der bruges til at få adgang til værdien, der deles af kontekstudbyderen.
// I dette tilfælde bruger vi useContext(AuthContext) for at få adgang til loginData og setLoginData 
// i vores andre komponenter.
// useAuth er et custom hook.
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
