import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api';
import { getCustomerProfiles } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
          await apiLogin(username, password);
          await checkAuth(); // 再実行
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
    };

    const logout = async () => {
        try {
          await apiLogout();
          setIsAuthenticated(false);
          setUser(null);
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
    };

    const checkAuth = useCallback(async () => {
        try {
          const response = await getCustomerProfiles();
          setIsAuthenticated(true);
          setUser({ username: response.data.username });
        } catch (error) {
          console.error('You are not logged in!');
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    

    const value = {
        isAuthenticated,
        loading,
        user,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};
