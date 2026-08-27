
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            setAuthState({
                token: token,
                isAuthenticated: true,
                loading: false,
                user: null, // You can fetch user data here if needed
            });
        } else {
            setAuthState({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
        setAuthState({
            token: token,
            isAuthenticated: true,
            loading: false,
            user: null,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setAuthState({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
        });
    };

    const value = {
        ...authState,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!authState.loading && children}
        </AuthContext.Provider>
    );
};
