import classNames from 'classnames/bind';
import styles from './SetUsername.module.scss';
import { useEffect, useState } from 'react';
import LoginSubmitButton from '../../../UI/LoginSubmitButton';
import useAxios from '../../../../service/useAxios';
import { useLogin } from '../../../../contexts/LoginContext';

const cx = classNames.bind(styles);
const SetUsername = () => {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const { setIsLogin, setShowLogin } = useLogin();
  const axiosInstance = useAxios();
  const handleUsernameExisted = async () => {
    try {
      const response = await axiosInstance.get(`/users/exist/${username}`, {
        skipAuth: true,
      });
      console.log(response);
      setValidUsername(response.data.result);
      setShowWarning(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/set-username', {
        username,
      });
      console.log(response);
      setIsLogin(true);
      setShowLogin(false);
      localStorage.setItem('tiktokUsername', username);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response?.data.message);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (username.length !== 0) handleUsernameExisted();
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <form onSubmit={handleAddUsername} className={cx('wrapper')}>
      <div className={cx('input-header')}>Create username</div>
      <input
        className={cx('input-element')}
        style={showWarning ? { color: 'red', border: '1px solid red' } : {}}
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setShowWarning(false);
        }}
      />
      {!showWarning ? (
        <div className={cx('input-footer')}>
          You can alway change this later
        </div>
      ) : (
        <div className={cx('input-warning')}>Username has already existed</div>
      )}
      <LoginSubmitButton
        disabled={username.length === 0 || validUsername}
        content={'Sign up'}
      />
      <button
        type='button'
        className={cx('skip-button')}
        onClick={() => {
          setIsLogin(true);
          setShowLogin(false);
        }}
      >
        Skip
      </button>
    </form>
  );
};

export default SetUsername;
