import styles from './SideBarContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCirclePlus,
  faCompass,
  faEllipsis,
  faEnvelope,
  faHouse,
  faPaperPlane,
  faStarOfLife,
  faUserAstronaut,
  faUserGroup,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useFinding } from '../../../../contexts/FindingContext';

import avatar from './avatar.jpg';
import { useLogin } from '../../../../contexts/LoginContext';

const cx = classNames.bind(styles);

const userList = [
  { name: 'Lionel Messi1', username: 'leomessi1' },
  { name: 'Lionel Messi2', username: 'leomessi2' },
  { name: 'Lionel Messi3', username: 'leomessi3' },
  { name: 'Lionel Messi4', username: 'leomessi4' },
  { name: 'Lionel Messi5', username: 'leomessi5' },
];

const SidebarContent = () => {
  const { isFinding } = useFinding();
  const { username } = useLogin();
  const navItems = [
    { path: '/', icon: faHouse, content: 'For You' },
    { path: '/explore', icon: faCompass, content: 'Explore' },
    { path: '/following', icon: faUserPlus, content: 'Following' },
    { path: '/friends', icon: faUserGroup, content: 'Friends' },
    { path: '/live', icon: faStarOfLife, content: 'Live' },
    { path: '/messages', icon: faPaperPlane, content: 'Message' },
    { path: '/activity', icon: faEnvelope, content: 'Activity' },
    { path: '/upload', icon: faCirclePlus, content: 'Up load' },
    {
      path: `/@${username}`,
      icon: faUserAstronaut,
      content: 'Profile',
    },
    { path: '/more', icon: faEllipsis, content: 'More' },
  ];
  return (
    <>
      <div
        className={cx('sidebar-content')}
        style={isFinding ? { width: '58px' } : { width: '208px' }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? cx('sidebar-nav-active', 'sidebar-content-element')
                : cx('sidebar-nav-unactive', 'sidebar-content-element')
            }
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={cx('sidebar-content-icon')}
            />
            {!isFinding && (
              <span className={cx('sidebar-nav-content')}>{item.content}</span>
            )}
          </NavLink>
        ))}
      </div>
      {!isFinding && (
        <div className={cx('sidebar-follower')}>
          <div className={cx('sidebar-follower-content')}>
            Following accounts
          </div>
          {userList.map((user) => (
            <div
              key={user.username}
              className={cx('sidebar-content-element')}
              style={{ marginBottom: '12px' }}
            >
              <img
                src={avatar}
                alt='Khang'
                className={cx('following-avatar')}
              />
              <div className={cx('following-content')}>
                <div className={cx('following-name')}>{user.name}</div>
                <div className={cx('following-username')}>{user.username}</div>
              </div>
            </div>
          ))}
          <button className={cx('sidebar-content-element')}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={cx('sidebar-content-icon')}
              style={{ height: '14px' }}
            />
            <span className={cx('sidebar-nav-content')}>See more</span>
          </button>
        </div>
      )}
    </>
  );
};

export default SidebarContent;
