import React, { createContext, useState, useEffect } from 'react';

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
        localStorage.setItem('loginInfo', JSON.stringify(response));
    };

    const logout = (response) => {
        setLoginResponse(null);
        localStorage.removeItem('loginInfo');
    };

    return (
        <AuthContext.Provider value={{ loginResponse, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
