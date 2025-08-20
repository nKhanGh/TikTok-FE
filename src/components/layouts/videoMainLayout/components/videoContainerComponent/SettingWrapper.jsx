import classNames from 'classnames/bind';
import styles from './SettingWrapper.module.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClosedCaptioning,
  faEllipsis,
  faFlag,
  faHardDrive,
  faHeartCrack,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const settingElements = [
  { content: 'Quality', icon: faHardDrive },
  { content: 'Caption', icon: faClosedCaptioning },
  { content: 'Auto scroll', icon: faUpLong },
  { content: 'Not Interested', icon: faHeartCrack },
  { content: 'Report', icon: faFlag },
];

const SettingWrapper = () => {
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className={cx('setting-wrapper')}>
      <button
        className={cx('setting-button')}
        onClick={() => setShowSetting(!showSetting)}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      {showSetting && (
        <div className={cx('setting-container')}>
          {settingElements.map((settingElement) => (
            <div key={settingElement.content} className={cx('setting-element')}>
              <FontAwesomeIcon
                icon={settingElement.icon}
                className={cx('setting-icon')}
              />
              <div>{settingElement.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingWrapper;
