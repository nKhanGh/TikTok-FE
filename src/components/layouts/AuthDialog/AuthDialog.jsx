import classNames from 'classnames/bind';
import styles from './AuthDialog.module.scss';
import { faClose, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogin } from '../../../contexts/LoginContext';
import { useState } from 'react';
import LoginByEmail from './components/LoginByEmail';
import SignupByEmail from './components/SignupByEmail';
import { cTypes } from './components/DialogComponentType';
import SetUsername from './components/SetUsername';

const cx = classNames.bind(styles);

const AuthDialog = () => {
  const { setShowLogin } = useLogin();
  const [cType, setCType] = useState(cTypes.login);
  const [toEmail, setToEmail] = useState('');

  const loginButtonList = [
    {
      name: 'qr',
      content: 'Use QR Code',
      icon: faQrcode,
      func: () => {},
    },
    {
      name: 'email or username',
      content: 'Use Email / username',
      icon: faUser,
      func: () => setCType(cTypes.loginEmail),
    },
    {
      name: 'facebook',
      content: 'Continue with Facebook',
      icon: faFacebook,
      func: () => {},
    },
    {
      name: 'google',
      content: 'Continue with Google',
      icon: faGoogle,
      func: () => {},
    },
  ];

  const logoutButtonList = [
    {
      name: 'email',
      content: 'Use Email',
      icon: faUser,
      func: () => setCType(cTypes.signupEmail),
    },
    {
      name: 'facebook',
      content: 'Continue with Facebook',
      icon: faFacebook,
      func: () => {},
    },
    {
      name: 'google',
      content: 'Continue with Google',
      icon: faGoogle,
      func: () => {},
    },
  ];

  let textHeader;

  if (cType === cTypes.signupEmail || cType === cTypes.username)
    textHeader = 'Sign up';
  else if (cType === cTypes.loginEmail) textHeader = 'Sign in';
  else if (cType === cTypes.signup) textHeader = 'Sign up for TikTok';
  else textHeader = 'Log in to TikTok';

  console.log(cType);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('login-dialog')}>
        <button
          className={cx('login-close')}
          onClick={() => setShowLogin(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className={cx('login-header')}>{textHeader}</div>
        <div className={cx('login-button-container')}>
          {cType === cTypes.login &&
            loginButtonList.map((login) => (
              <button
                key={login.name}
                onClick={login.func}
                className={cx('login-button-type')}
              >
                <div className={cx('login-button-icon')}>
                  <FontAwesomeIcon icon={login.icon} />
                </div>
                <div className={cx('login-button-content')}>
                  {login.content}
                </div>
              </button>
            ))}
          {cType === cTypes.signup &&
            logoutButtonList.map((login) => (
              <button
                key={login.name}
                onClick={login.func}
                className={cx('login-button-type')}
              >
                <div className={cx('login-button-icon')}>
                  <FontAwesomeIcon icon={login.icon} />
                </div>
                <div className={cx('login-button-content')}>
                  {login.content}
                </div>
              </button>
            ))}
          {cType === cTypes.loginEmail && <LoginByEmail setCType={setCType} />}
          {cType === cTypes.signupEmail && (
            <SignupByEmail
              setCType={setCType}
              toEmail={toEmail}
              setToEmail={setToEmail}
            />
          )}
          {cType === cTypes.username && <SetUsername toEmail={toEmail} />}
        </div>
        <div
          className={cx('login-footer')}
          style={
            cType === cTypes.loginEmail
              ? { backgroundColor: 'transparent' }
              : {}
          }
        >
          <div className={cx('login-footer-content')}>
            {(cType === cTypes.login ||
              cType === cTypes.signup ||
              cType === cTypes.signupEmail) && (
              <span>
                By continuing with an account located in Vietnam, you agree to
                our Terms of Service and acknowledge that you have read our
                Privacy Policy.
              </span>
            )}
          </div>
          <div className={cx('login-signup')}>
            {textHeader.includes('up') ? (
              <span>Already have a account</span>
            ) : (
              <span>Don't have an account?</span>
            )}
            <button
              className={cx('signup-swap')}
              onClick={() => {
                setCType(
                  textHeader.includes('up') ? cTypes.login : cTypes.signup,
                );
              }}
            >
              {textHeader.includes('up') ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;
