import classNames from 'classnames/bind';
import styles from './HeartContainer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const HeartContainer = ({ hearts, handleCheckVideoClick }) => {
  return (
    <TransitionGroup>
      {hearts.map((heart) => (
        <CSSTransition
          key={heart.id}
          in={heart.show}
          timeout={600}
          classNames={{
            enter: cx('heart-container-enter'),
            enterActive: cx('heart-container-enter-active'),
            exit: cx('heart-container-exit'),
            exitActive: cx('heart-container-exit-active'),
          }}
          nodeRef={heart.ref}
          unmountOnExit
        >
          <button
            className={cx('heartIcon-container')}
            onClick={handleCheckVideoClick}
            style={{
              left: heart.x,
              top: heart.y,
            }}
            ref={heart.ref}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={cx('heartIcon')}
              style={{ transform: `rotate(${heart.angle}deg)` }}
            />
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

HeartContainer.propTypes = {
  hearts: PropTypes.array.isRequired,
  handleCheckVideoClick: PropTypes.func.isRequired,
};

export default HeartContainer;
