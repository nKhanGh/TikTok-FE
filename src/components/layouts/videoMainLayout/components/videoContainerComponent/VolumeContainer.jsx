import classNames from 'classnames/bind';
import styles from './VolumeContainer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const VolumeContainer = ({
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
}) => {
  return (
    <div className={cx('volume-container')}>
      <button className={cx('volume-icon')} onClick={toggleMute}>
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
      </button>
      <div className={cx('volume-slider-container')}>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={handleVolumeChange}
          className={cx('volume-slider')}
        />
      </div>
    </div>
  );
};

VolumeContainer.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
};

export default VolumeContainer;
