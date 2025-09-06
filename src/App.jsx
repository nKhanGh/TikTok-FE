import { BrowserRouter } from 'react-router-dom';
import { LoginProVider } from './contexts/LoginContext';
import AppRoutesWrapper from './routes/AppRoutesWrapper';

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
