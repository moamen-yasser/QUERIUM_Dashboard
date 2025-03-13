import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] 
        = useState(Cookies.get('isAuthenticated') === 'true');

    const login = () => {
        Cookies.set('isAuthenticated', 'true', { expires: 1 });
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.set('isAuthenticated', 'false', { expires: 1 }); 
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
