import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { LoginProVider } from './contexts/LoginContext';

const AppRoutesWrapper = () => {
  const routes = useRoutes(AppRoutes);
  return <div>{routes}</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <LoginProVider>
        <AppRoutesWrapper />
      </LoginProVider>
    </BrowserRouter>
  );
};

export default App;
