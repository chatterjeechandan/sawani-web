import React, { createContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginResponse, setLoginResponse] = useState(null);


    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('loginInfo');
        if (storedLoginInfo) {
            setLoginResponse(JSON.parse(storedLoginInfo));
        }
    }, []);

    const login = (response) => {
        setLoginResponse(response);
    };

    const logout = (response) => {
        setLoginResponse(null);
        localStorage.removeItem('loginInfo');
        localStorage.removeItem('cartInfo');
    };

    return (
        <AuthContext.Provider value={{ loginResponse, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
