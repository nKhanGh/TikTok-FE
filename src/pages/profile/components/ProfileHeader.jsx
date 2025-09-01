import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faLock, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useAxios from '../../../service/useAxios';
import ProfileEdit from './ProfileEdit';

const cx = classNames.bind(styles);

const interactInfo = [
  { content: 'Following', num: 100 },
  { content: 'Followers', num: 1009 },
  { content: 'Likes', num: 10000 },
];

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [isEditting, setIsEditting] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/myInfo', {
          skipAuth: false,
        });
        setUser(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          <button
            className={cx('header-edit')}
            onClick={() => setIsEditting(true)}
          >
            Edit Profile
          </button>
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
          {interactInfo.map((inter) => (
            <div className={cx('interaction-container')} key={inter.content}>
              <div className={cx('interaction-num')}>{inter.num}</div>
              <button className={cx('interaction-content')}>
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
