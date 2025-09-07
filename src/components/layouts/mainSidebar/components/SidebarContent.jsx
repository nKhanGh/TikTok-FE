import styles from './SideBarContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
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

import { useLogin } from '../../../../contexts/LoginContext';
import { useEffect, useRef, useState } from 'react';
import useAxios from '../../../../service/useAxios';

const cx = classNames.bind(styles);

const PAGE_SIZE = 5;

const SidebarContent = () => {
  const { isFinding } = useFinding();
  const { username } = useLogin();
  const [followedUsers, setFollowedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const didFetchRef = useRef(false);

  const axiosInstance = useAxios();
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

  const fetchFollowedUser = async (paramPage = page) => {
    try {
      const response = await axiosInstance.get(
        `/users/public/followed?page=${paramPage}&size=${PAGE_SIZE}`,
        { skipAuth: false },
      );
      const result = response.data.result;
      console.log(result);
      setFollowedUsers((prev) =>
        paramPage === 0
          ? result.followedUsers
          : [...prev, ...result.followedUsers],
      );
      setPage(result.nextPage);
      setHasMore(result.hasMore);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetchFollowedUser();
  }, [username]);
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
          {followedUsers.length === 0 ? (
            <div className={cx('non-followed-info')}>
              The accounts you follow will appear hear.
            </div>
          ) : (
            followedUsers.map((user) => (
              <NavLink
                to={`/@${user.username}`}
                key={user.username}
                className={cx('sidebar-content-element')}
                style={{ marginBottom: '12px' }}
              >
                <img
                  src={user.avatarUrl ?? '/api/images/default_avatar.jpg'}
                  alt='Khang'
                  className={cx('following-avatar')}
                />
                <div className={cx('following-content')}>
                  <div className={cx('following-name')}>{user.name}</div>
                  <div className={cx('following-username')}>
                    {user.username}
                  </div>
                </div>
              </NavLink>
            ))
          )}
          {followedUsers.length !== 0 && (
            <button
              className={cx('sidebar-content-element')}
              onClick={
                hasMore
                  ? () => fetchFollowedUser(page)
                  : () => fetchFollowedUser(0)
              }
            >
              <FontAwesomeIcon
                icon={hasMore ? faChevronDown : faChevronUp}
                className={cx('sidebar-content-icon')}
                style={{ height: '14px' }}
              />
              <span className={cx('sidebar-nav-content')}>
                {hasMore ? 'See more' : 'Hide'}
              </span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarContent;
