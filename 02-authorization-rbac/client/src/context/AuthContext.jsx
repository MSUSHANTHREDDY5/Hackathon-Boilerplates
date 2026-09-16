import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser
} from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCurrentUser();
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleLogin = async (credentials) => {
    const res = await loginUser(credentials);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  const handleRegister = async (userData) => {
    const res = await registerUser(userData);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    role: user?.role || 'guest',
    permissions: user?.permissions || [],
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
