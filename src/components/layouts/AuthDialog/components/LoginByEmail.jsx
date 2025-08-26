import classNames from 'classnames/bind';
import styles from './LoginByEmail.module.scss';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useLogin } from '../../../../hooks/LoginContext';
import axiosInstance from '../../../../service/axiosInstance';
import LoginSubmitButton from '../../../UI/LoginSubmitButton';

const cx = classNames.bind(styles);

const LoginByEmail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setShowLogin, setIsLogin } = useLogin();

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
      setPassword('');
      setUsernameOrEmail('');
      const token = response.data.result.token;
      console.log(token);
      localStorage.setItem('tiktokToken', token);
      setIsLogin(true);
      setShowLogin(false);
      alert('login success');
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
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
      {/* {loading ? "Logging in..." : "Log in"} */}
    </>
  );
};

export default LoginByEmail;
