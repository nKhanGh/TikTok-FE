import classNames from 'classnames/bind';
import styles from './ControlContainer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useComment } from '../../../../hooks/CommentContext';

const cx = classNames.bind(styles);

const ControlContainer = () => {
  return (
    <div
      className={cx('control-container')}
      style={useComment().showComment ? { right: '-48px' } : {}}
    >
      <button className={cx('video-control')}>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <button className={cx('video-control')}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};

export default ControlContainer;
