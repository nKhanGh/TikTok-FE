import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const LoginContext = createContext(null);

export const LoginProVider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem('tiktokToken');
    return !!token;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem('tiktokUsername'),
  );

  const login = (username) => {
    setIsLogin(true);
    setShowLogin(false);
    setUsername(username);
    localStorage.setItem('tiktokUsername', username);
  };

  const logout = () => {
    setIsLogin(false);
    setShowLogin(true);
    localStorage.removeItem('tiktokToken');
    localStorage.removeItem('tiktokAvatarUrl');
  };

  const value = useMemo(
    () => ({
      isLogin,
      setIsLogin,
      showLogin,
      setShowLogin,
      logout,
      login,
      username,
      setUsername,
    }),
    [isLogin, showLogin, username],
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

LoginProVider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLogin = () => {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error('useLogin must be use inside LoginProvider');
  return ctx;
};
