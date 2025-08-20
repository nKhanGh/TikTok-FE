import classNames from 'classnames/bind';
import styles from './AuthDialog.module.scss';
import { faClose, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogin } from '../../../hooks/LoginContext';
import { useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);

const AuthDialog = () => {
  const { setShowLogin } = useLogin();
  const [isEmail, setIsEmail] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  console.log(isEmail);

  const loginButtonList = [
    { name: 'qr', content: 'Use QR Code', icon: faQrcode, func: () => {} },
    {
      name: 'email or username',
      content: 'Use Email / username',
      icon: faUser,
      func: () => setIsEmail(true),
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

  if (isEmail && isSignup) textHeader = 'Sign up';
  else if (isEmail && !isSignup) textHeader = 'Sign in';
  else if (!isEmail && isSignup) textHeader = 'Sign up for TikTok';
  else textHeader = 'Log in to TikTok';

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
          {loginButtonList.map((login) => (
            <button
              key={login.name}
              onClick={login.func}
              className={cx('login-button-type')}
            >
              <div className={cx('login-button-icon')}>
                <FontAwesomeIcon icon={login.icon} />
              </div>
              <div className={cx('login-button-content')}>{login.content}</div>
            </button>
          ))}
        </div>
        <div className={cx('login-footer')}>
          <div className={cx('login-footer-content')}>
            <span>
              By continuing with an account located in Vietnam, you agree to our
              Terms of Service and acknowledge that you have read our Privacy
              Policy.
            </span>
          </div>
          <div className={cx('login-signup')}>
            {isSignup ? (
              <span>Already have a account</span>
            ) : (
              <span>Don't have an account?</span>
            )}
            <button
              className={cx('signup-swap')}
              onClick={() => {
                setIsSignup(!isSignup);
                setIsEmail(false);
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;
