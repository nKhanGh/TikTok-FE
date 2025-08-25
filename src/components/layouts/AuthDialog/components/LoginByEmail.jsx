import classNames from 'classnames/bind';
import styles from './LoginByEmail.module.scss';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

const LoginByEmail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, SetUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('api/auth/login', {
        usernameOrEmail,
        password,
      });
      setPassword('');
      SetUsernameOrEmail('');
      const token = response.data.result.token;
      console.log(token);
      localStorage.setItem('tiktokItem', token);
      alert('login success');
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
            onChange={(e) => SetUsernameOrEmail(e.target.value)}
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
        <button
          type='submit'
          className={
            usernameOrEmail.length != 0 && password.length != 0
              ? cx('input-submit-active')
              : cx('input-submit')
          }
          disabled={usernameOrEmail.length === 0 || password.length === 0}
        >
          Log in
        </button>
      </form>
      {/* {loading ? "Logging in..." : "Log in"} */}
    </>
  );
};

export default LoginByEmail;
