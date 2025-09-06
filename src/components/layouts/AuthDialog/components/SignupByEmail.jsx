import classNames from 'classnames/bind';
import styles from './SignupByEmail.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useAxios from '../../../../service/useAxios';
import { cTypes } from './DialogComponentType';
import PropTypes from 'prop-types';
import BirthdayContainer from './SignupByEmail/BirthdayContainer';
import { useLogin } from '../../../../contexts/LoginContext';

const cx = classNames.bind(styles);

const SignupByEmail = ({ setCType, toEmail, setToEmail }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [checked, setChecked] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDesc, setShowPasswordDesc] = useState(false);
  const [validPasswordLength, setValidPasswordLength] = useState(null);
  const [validPasswordChar, setValidPasswordChar] = useState(null);
  const [validPassword, setValidPassword] = useState(true);
  const [verifyCode, setVerifyCode] = useState('');
  const [validCode, setValidCode] = useState(true);
  const [sendCode, setSendCode] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUsername } = useLogin();

  const axiosInstance = useAxios();

  const isMounted = useRef(false);
  const isValidEmail = (email) =>
    /\S+@\S+\.\S+/.test(email) || email.length === 0;
  const isValidPasswordLength = (password) =>
    password.length >= 8 && password.length <= 20;
  const isValidPasswordChar = (password) =>
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidPassword = (password) =>
    isValidPasswordChar(password) && isValidPasswordLength(password);
  const isValidDob = (year, month, day) => !!year && !!month && !!day;
  const isValidCode = (verifyCode) => /^\d{6}$/.test(verifyCode);

  useEffect(() => {
    if (!isMounted.current) return;
    const timeout = setTimeout(() => {
      setValidEmail(isValidEmail(toEmail));
    }, 700);

    return () => clearTimeout(timeout);
  }, [toEmail]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSendCode(true);
    setLoading(true);
    setError('');
    const dob = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    try {
      const response = await axiosInstance.post(
        '/auth/register',
        {
          toEmail,
          password,
          dob,
        },
        { skipAuth: true },
      );
      setLoading(false);
      setError('');
      console.log(response.data.result);
    } catch (error) {
      console.log(error.data.message);
      alert(error.data.message);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post(
        '/auth/verify-email',
        {
          email: toEmail,
          verifyCode,
        },
        { skipAuth: true },
      );
      setLoading(false);
      setError('');
      console.log(response.data.result);
      const token = response.data.result.token;
      localStorage.setItem('tiktokToken', token);
      const infoResponse = await axiosInstance.get('/users/myInfo', {
        skipAuth: false,
      });
      localStorage.setItem(
        'tiktokAvatarUrl',
        infoResponse.data.result.avatarUrl,
      );
      setUsername(infoResponse.data.result.username);
      localStorage.setItem('tiktokUsername', infoResponse.data.result.username);
      setCType(cTypes.username);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleVerifyEmail} className={cx('wrapper')}>
      <BirthdayContainer
        year={year}
        month={month}
        day={day}
        setYear={setYear}
        setMonth={setMonth}
        setDay={setDay}
      />
      <div className={cx('email-container')}>
        <div className={cx('email-header')}>Email</div>
        <input
          type='text'
          className={cx('input-element')}
          style={!validEmail ? { border: 'solid 1px red', color: 'red' } : {}}
          placeholder='Email address'
          value={toEmail}
          onChange={(e) => {
            setToEmail(e.target.value);
            setValidEmail(true);
          }}
          onFocus={() => setValidEmail(true)}
          onBlur={() => setValidEmail(isValidEmail(toEmail))}
        />
        {!validEmail && (
          <div className={cx('input-warning')}>Enter a valid email address</div>
        )}
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            style={
              !validPassword ? { border: 'solid 1px red', color: 'red' } : {}
            }
            className={cx('input-element')}
            placeholder='Password'
            value={password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
              setValidPasswordChar(
                isValidPasswordChar(newPassword) ? true : null,
              );
              setValidPasswordLength(
                isValidPasswordLength(newPassword) ? true : null,
              );
            }}
            onFocus={() => {
              setShowPasswordDesc(true);
              setValidPasswordLength(
                password.length === 0 ? null : isValidPasswordLength(password),
              );
              setValidPasswordChar(
                password.length === 0 ? null : isValidPasswordChar(password),
              );
              setValidPassword(true);
            }}
            onBlur={() => {
              setValidPassword(
                isValidPassword(password) || password.length === 0,
              );
              setShowPasswordDesc(password.length !== 0);
              setValidPasswordLength(isValidPasswordLength(password));
              setValidPasswordChar(isValidPasswordChar(password));
            }}
          />
          <button
            type='button'
            className={cx('input-icon')}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>
        {showPasswordDesc && (
          <div className={cx('password-description')}>
            <div className={cx('password-description-headed')}>
              Your password must have:
            </div>
            <div
              className={cx('password-description-content')}
              style={
                validPasswordLength !== null
                  ? validPasswordLength
                    ? { color: '#0be09b' }
                    : { color: 'red' }
                  : {}
              }
            >
              8 to 20 characters
            </div>
            <div
              className={cx('password-description-content')}
              style={
                validPasswordChar !== null
                  ? validPasswordChar
                    ? { color: '#0be09b' }
                    : { color: 'red' }
                  : {}
              }
            >
              Letters, numbers, and special characters
            </div>
          </div>
        )}
        <div className={cx('email-code')}>
          <input
            type='text'
            placeholder='Enter 6-digit code'
            className={cx('email-code-input')}
            style={!validCode ? { border: 'solid 1px red', color: 'red' } : {}}
            value={verifyCode}
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
            onBlur={() =>
              setValidCode(verifyCode.length === 0 || isValidCode(verifyCode))
            }
            onFocus={() => setValidCode(true)}
          />
          <button
            disabled={
              !(
                isValidEmail(toEmail) &&
                isValidPassword(password) &&
                isValidDob(year, month, day)
              )
            }
            type='button'
            className={cx('email-code-button')}
            onClick={handleRegister}
          >
            Send code
          </button>
        </div>
        {!validCode && (
          <div className={cx('input-warning')}>Enter 6-digit code</div>
        )}
        <div className={cx('signup-check')}>
          <input
            id='checkbox-signup'
            className={cx('signup-check-button')}
            type='checkbox'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label
            htmlFor='checkbox-signup'
            className={cx('signup-check-content')}
          >
            Get trending content, newsletters, promotions, recommendations, and
            account updates sent to your email
          </label>
        </div>
      </div>
      <button
        disabled={!(sendCode && isValidCode(verifyCode) && checked)}
        className={cx('signup-submit')}
        type='submit'
      >
        Next
      </button>
    </form>
  );
};

SignupByEmail.propTypes = {
  setCType: PropTypes.func.isRequired,
  toEmail: PropTypes.string.isRequired,
  setToEmail: PropTypes.func.isRequired,
};

export default SignupByEmail;
