import classNames from 'classnames/bind';
import styles from './ProfileButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faMobileScreen,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import avatar from './avatar.jpg';
import { useEffect, useRef, useState } from 'react';
import { useLogin } from '../../../../hooks/LoginContext';
import AuthDialog from '../../AuthDialog/AuthDialog';
import { CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

const ProfileButton = () => {
  const navigate = useNavigate();
  const [showContainer, setShowContainer] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [user, setUser] = useState(null);

  const containerRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setShowContainer(false);
    };
    document.addEventListener('mousedown', handleClickOutSide);

    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('tiktokUser');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const { isLogin, setIsLogin, showLogin, setShowLogin } = useLogin();

  const handleLogout = () => {
    setUser(null);
    setShowLogOut(false);
    setIsLogin(false);
    localStorage.removeItem('tiktokUser');
    localStorage.removeItem('tiktokToken');
    navigate('/');
  };

  return (
    <div className={cx('profile-button')}>
      <button className={cx('get-button')}>
        <FontAwesomeIcon icon={faCoins} /> Get Coins
      </button>
      <button className={cx('get-button')}>
        <FontAwesomeIcon icon={faMobileScreen} /> Get App
      </button>
      <div className={cx('line')} ref={containerRef}>
        {isLogin ? (
          <button
            className={cx('avatar-button')}
            onClick={() => setShowContainer(!showContainer)}
          >
            <img
              src={
                user && user.avatarUrl
                  ? user.avatarUrl
                  : '/api/images/default_avatar.jpg'
              }
              alt='Khang'
              className={cx('avatar-img')}
            />
          </button>
        ) : (
          <button
            className={cx('login-button')}
            onClick={() => {
              setShowLogin(true);
              setShowContainer(false);
            }}
          >
            Log in
          </button>
        )}
        <CSSTransition
          in={showContainer}
          timeout={200}
          nodeRef={nodeRef}
          unmountOnExit
          classNames={{
            enter: cx('container-enter'),
            enterActive: cx('container-enter-active'),
            exit: cx('container-exit'),
            exitActive: cx('container-exit-active'),
          }}
        >
          <div className={cx('container')} ref={nodeRef}>
            <NavLink to={'/profile'} className={cx('container-button')}>
              <FontAwesomeIcon icon={faUser} /> View Profile
            </NavLink>
            <button
              onClick={() => {
                setShowLogOut(true);
                setShowContainer(false);
              }}
              className={cx('container-button')}
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Log out
            </button>
          </div>
        </CSSTransition>
      </div>
      {showLogOut && (
        <div className={cx('logout-container')}>
          <div className={cx('logout-dialog')}>
            <div className={cx('logout-content')}>
              Are you sure you want to log out?
            </div>
            <div className={cx('logout-button-container')}>
              <button
                className={cx('cancel-button', 'logout-button')}
                onClick={() => setShowLogOut(false)}
              >
                Cancel
              </button>
              <button
                className={cx('confirm-button', 'logout-button')}
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogin && <AuthDialog />}
    </div>
  );
};

export default ProfileButton;
