import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // If we had a /me endpoint, we would fetch admin details here.
            // For now, we assume token existence means logged in.
            setAdmin({ authenticated: true });
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setAdmin(null);
        }
    }, [token]);

    const login = (newToken, adminData) => {
        setToken(newToken);
        setAdmin(adminData);
    };

    const logout = () => {
        setToken('');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
