import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hoanglong_jwt_token') || null);
  const [loading, setLoading] = useState(true);

  // Check existing token on startup
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('hoanglong_jwt_token');
      if (savedToken) {
        try {
          const res = await authApi.getProfile();
          if (res.success && res.data) {
            setUser(res.data);
          }
        } catch (err) {
          console.warn('Phiên đăng nhập JWT hết hạn:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login(username, password);
    if (res.success && res.data) {
      const { token: jwtToken, user: userData } = res.data;
      localStorage.setItem('hoanglong_jwt_token', jwtToken);
      setToken(jwtToken);
      setUser(userData);
      return res;
    }
    throw new Error(res.message || 'Đăng nhập thất bại');
  };

  const logout = () => {
    localStorage.removeItem('hoanglong_jwt_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isKitchen = user?.role === 'kitchen';
  const isWaiter = user?.role === 'waiter';
  const isStaff = Boolean(user && ['admin', 'kitchen', 'waiter'].includes(user.role));

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isKitchen,
        isWaiter,
        isStaff,
        isAuthenticated: Boolean(token && user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
