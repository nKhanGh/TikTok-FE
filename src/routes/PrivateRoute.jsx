import { Navigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { isLogin } = useLogin();

  if (!isLogin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
