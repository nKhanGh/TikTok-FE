import classNames from 'classnames/bind';
import styles from './UploadHeader.module.scss';
import tiktokIcon from '@/assets/images/tiktokStudio.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const UploadHeader = () => {
  const navigate = useNavigate();

  const avatarUrl = localStorage.getItem('tiktokAvatarUrl');
  return (
    <div className={cx('wrapper')}>
      <div className={cx('tiktok-icon-container')}>
        <img src={tiktokIcon} alt='TIkTOK' className={cx('img-icon')} />
      </div>
      <div className={cx('tiktok-avatar-container')}>
        <button
          className={cx('avatar-button')}
          onClick={() => navigate('/profile')}
        >
          <img src={avatarUrl} alt='avatar' className={cx('img-avatar')} />
        </button>
      </div>
    </div>
  );
};

export default UploadHeader;
