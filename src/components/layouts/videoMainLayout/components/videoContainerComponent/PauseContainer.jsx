import classNames from 'classnames/bind';
import styles from './PauseContainer.module.scss';

import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const iconTypes = ['NULL', 'PAUSE', 'PLAY', 'MUTED', 'UNMUTED'];

const iconMap = {
  [iconTypes[1]]: faPause,
  [iconTypes[2]]: faPlay,
  [iconTypes[3]]: faVolumeHigh,
  [iconTypes[4]]: faVolumeMute,
};

const PauseContainer = ({ showIcon, iconType, handleCheckVideoClick }) => {
  const pauseRef = useRef(null);

  return (
    <CSSTransition
      in={showIcon}
      timeout={700}
      classNames={{
        enter: cx('pause-container-enter'),
        enterActive: cx('pause-container-enter-active'),
        exit: cx('pause-container-exit'),
        exitActive: cx('pause-container-exit-active'),
      }}
      unmountOnExit
      nodeRef={pauseRef}
    >
      <button
        ref={pauseRef}
        className={cx('pause-container')}
        onClick={handleCheckVideoClick}
      >
        <FontAwesomeIcon
          icon={iconMap[iconType]}
          className={cx('pause-icon')}
        />
      </button>
    </CSSTransition>
  );
};

PauseContainer.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  iconType: PropTypes.string.isRequired,
  handleCheckVideoClick: PropTypes.func.isRequired,
};

export default PauseContainer;
