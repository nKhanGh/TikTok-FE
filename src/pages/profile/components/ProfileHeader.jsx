import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faLock,
  faShare,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useAxios from '../../../service/useAxios';
import ProfileEdit from './ProfileEdit';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [isEditting, setIsEditting] = useState(false);
  const [isYourAccount, setIsYourAccount] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const location = useLocation();

  const username = localStorage.getItem('tiktokUsername');
  const axiosInstance = useAxios();

  const digitShortCut = (digit) => {
    if (digit < 1000) return digit.toString();
    if (digit < 1000000) return (digit / 1000).toFixed(1) + 'K';
    if (digit < 1000000000) return (digit / 1000000).toFixed(1) + 'M';
    return (digit / 1000000000).toFixed(1) + 'B';
  };

  const handleFollow = async () => {
    try {
      await axiosInstance.post(`/users/${user?.id}/follow`);
      setIsFollow(!isFollow);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const targetUsername = location.pathname.slice(2);
      const response = await axiosInstance.get(
        `/users/public/${targetUsername}`,
        {
          skipAuth: false,
        },
      );
      const result = response.data.result;
      console.log(result);
      setUser(result);
      setIsYourAccount(username === targetUsername);
      checkIsFollow(result.id);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFollow = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/isFollow/${userId}`);
      const result = response.data.result;
      setIsFollow(result);
    } catch (error) {
      console.log(error);
    }
  };

  const interactInfo = [
    { content: 'Following', num: digitShortCut(user?.followingCount) },
    { content: 'Followers', num: digitShortCut(user?.followerCount) },
    { content: 'Likes', num: digitShortCut(user?.likeCount) },
  ];

  useEffect(() => {
    fetchUserData();
  }, [location.pathname]);

  return (
    <div className={cx('wrapper')}>
      <img
        src={user?.avatarUrl ?? '/api/images/default_avatar.jpg'}
        alt='avatar'
        className={cx('header-avatar')}
      />
      <div className={cx('header-info')}>
        <div className={cx('header-name')}>
          <div className={cx('header-username')}>{user?.username}</div>
          <FontAwesomeIcon icon={faLock} />

          <div>{user?.name}</div>
        </div>
        <div className={cx('header-buttons')}>
          {isYourAccount ? (
            <button
              className={cx('header-edit')}
              onClick={() => setIsEditting(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className={
                isFollow
                  ? cx('header-button', 'rectangle-button')
                  : cx('header-edit')
              }
              onClick={handleFollow}
            >
              {isFollow ? (
                <>
                  <FontAwesomeIcon icon={faUserCheck} />
                  <span>Following</span>
                </>
              ) : (
                <span>Follow</span>
              )}
            </button>
          )}
          <button className={cx('header-button', 'rectangle-button')}>
            Promote post
          </button>
          <button className={cx('header-button', 'square-button')}>
            <FontAwesomeIcon icon={faGear} />
          </button>
          <button className={cx('header-button', 'square-button')}>
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
        <div className={cx('header-interaction')}>
          {interactInfo.map((inter, index) => (
            <div className={cx('interaction-container')} key={inter.content}>
              <div className={cx('interaction-num')}>{inter.num}</div>
              <button
                className={cx(
                  'interaction-content',
                  index < 2 ? 'hoverable' : '',
                )}
              >
                {inter.content}
              </button>
            </div>
          ))}
        </div>
        <div className={cx('header-bio')}>{user?.bio}</div>
      </div>
      {isEditting && (
        <ProfileEdit
          setIsEditting={setIsEditting}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
