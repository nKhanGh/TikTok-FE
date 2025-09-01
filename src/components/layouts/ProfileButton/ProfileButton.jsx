import classNames from 'classnames/bind';
import styles from './ProfileButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faMobileScreen,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useLogin } from '../../../contexts/LoginContext';
import AuthDialog from '../AuthDialog/AuthDialog';
import { CSSTransition } from 'react-transition-group';
import useAvatar from '../../../hooks/useAvatar';

const cx = classNames.bind(styles);

const ProfileButton = () => {
  const navigate = useNavigate();
  const [showContainer, setShowContainer] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const { avatarUrl, updateAvatar } = useAvatar();

  const location = useLocation();

  const isProfilePage = location.pathname.includes('@');

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

  const { isLogin, setIsLogin, showLogin, setShowLogin } = useLogin();

  const handleLogout = () => {
    updateAvatar(null);
    setShowLogOut(false);
    setIsLogin(false);
    localStorage.removeItem('tiktokAvatarUrl');
    localStorage.removeItem('tiktokUsername');
    localStorage.removeItem('tiktokToken');
    navigate('/');
  };

  return (
    <div className={cx('profile-button')}>
      <button className={cx('get-button')}>
        <FontAwesomeIcon icon={faCoins} />{' '}
        {!isProfilePage && <span>Get Coins</span>}
      </button>
      <button className={cx('get-button')}>
        <FontAwesomeIcon icon={faMobileScreen} />{' '}
        {!isProfilePage && <span>Get App</span>}
      </button>
      <div className={cx('line')} ref={containerRef}>
        {isLogin ? (
          <button
            className={cx('avatar-button')}
            onClick={() => setShowContainer(!showContainer)}
          >
            <img
              src={avatarUrl ?? '/api/images/default_avatar.jpg'}
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
