import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoginContext = createContext(null);

export const LoginProVider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, showLogin, setShowLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error('useLogin must be use inside LoginProvider');
  return ctx;
};
