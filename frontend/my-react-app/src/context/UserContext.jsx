import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Function to log in (set token & update state)
  const login = (userData) => {
    try {
      setUser(userData); // update the user state with the provided data
    } catch (error) {
      console.error("Error updating user context:", error);
    }
  };

 
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
