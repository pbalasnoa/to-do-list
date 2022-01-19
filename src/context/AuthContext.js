import { createContext, useEffect, useState } from "react";
import { watcherUser } from "../api/services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    watcherUser((user) => {
      if (user) {
        setAuthReady(true);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setAuthReady(true);
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, []);

  console.log("context", user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        authReady,
        setAuthReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
