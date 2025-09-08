import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../service/useAxios';
import { useLogin } from '../../contexts/LoginContext';
import useAvatar from '../../hooks/useAvatar';

const AuthCallBack = () => {
  const { login } = useLogin();
  const { updateAvatar } = useAvatar();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (!token) return;
      localStorage.setItem('tiktokToken', token);
      try {
        const response = await axiosInstance.get('/users/myInfo', {
          skipAuth: false,
        });
        const result = response?.data?.result;
        updateAvatar(result?.avatarUrl);
        login(result?.username);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };

    run();
  }, [navigate]);
  return <p>is Logining...</p>;
};

export default AuthCallBack;
