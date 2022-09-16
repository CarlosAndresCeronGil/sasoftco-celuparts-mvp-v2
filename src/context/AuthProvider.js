import React, { useState, createContext } from "react";

const AuthContext = createContext({});
/* eslint-disable react/prop-types */
export function AuthProvider({children}) {
    const [auth, setAuth] = useState({});

    return <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;