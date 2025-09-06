import classNames from 'classnames/bind';
import styles from './LoginByEmail.module.scss';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useLogin } from '../../../../contexts/LoginContext';
import useAxios from '../../../../service/useAxios';
import LoginSubmitButton from '../../../UI/LoginSubmitButton';

const cx = classNames.bind(styles);

const LoginByEmail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const [setLoading] = useState(false);

  const axiosInstance = useAxios();

  const { setShowLogin, setIsLogin, setUsername } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        'auth/login',
        {
          usernameOrEmail,
          password,
        },
        { skipAuth: true },
      );
      const token = response.data.result.token;
      localStorage.setItem('tiktokToken', token);

      setIsLogin(true);
      setShowLogin(false);
      setPassword('');
      setUsernameOrEmail('');
      alert('login success');

      const userResponse = await axiosInstance.get('users/myInfo', {
        skipAuth: false,
      });
      console.log(userResponse.data.result);
      localStorage.setItem('tiktokUsername', userResponse.data.result.username);
      setUsername(userResponse.data.result.username);
      localStorage.setItem(
        'tiktokAvatarUrl',
        userResponse.data.result.avatarUrl,
      );
    } catch (error) {
      setError(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('input-container')}>
        <div className={cx('input-header')}>Email or username</div>
        <input
          type='text'
          className={cx('input-element')}
          placeholder='Email or username'
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          className={cx('input-element')}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='button'
          className={cx('input-icon')}
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
        <button type='button' className={cx('input-footer')}>
          Forgot password?
        </button>
      </div>
      <LoginSubmitButton
        disabled={password.length === 0 || usernameOrEmail.length === 0}
        content={'Login'}
      />
    </form>
  );
};

export default LoginByEmail;
