import classNames from 'classnames/bind';
import styles from './InteractionContainer.module.scss';
import avatar from '../avatar.png';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCheck,
  faComment,
  faHeart,
  faPlus,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useLiked } from '../../../../hooks/LikedContext';
import { useComment } from '../../../../hooks/CommentContext';

const cx = classNames.bind(styles);

const InteractionContainer = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [numSaved, setNumSaved] = useState(130);
  const [numShared] = useState(23);

  const { isLiked, setIsLiked, numLiked, setNumLiked } = useLiked();
  const { showComment, setShowComment, numComment, setNumComment } =
    useComment();

  return (
    <div className={cx('interaction-container')}>
      <div className={cx('interaction-avatar-button')}>
        <img
          src={avatar}
          alt='Khang'
          className={cx('interaction-avatar-img')}
        />
        <button
          className={cx('interaction-avatar-check')}
          onClick={() => setIsFollowed(!isFollowed)}
          style={
            !isFollowed ? { backgroundColor: '#fe2c55', color: '#fff' } : {}
          }
        >
          <FontAwesomeIcon icon={isFollowed ? faCheck : faPlus} />
        </button>
      </div>
      <button
        className={cx('interaction-button')}
        onClick={() => {
          setIsLiked(!isLiked);
          setNumLiked(isLiked ? numLiked - 1 : numLiked + 1);
        }}
        style={isLiked ? { color: '#fe2c55' } : {}}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className={cx('interaction-num')}>{numLiked}</div>
      <button
        className={cx('interaction-button')}
        onClick={() => setShowComment(!showComment)}
      >
        <FontAwesomeIcon icon={faComment} />
      </button>
      <div className={cx('interaction-num')}>{numComment}</div>
      <button
        className={cx('interaction-button')}
        onClick={() => {
          setIsSaved(!isSaved);
          setNumSaved(isSaved ? numSaved - 1 : numSaved + 1);
        }}
        style={isSaved ? { color: '#face15' } : {}}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </button>
      <div className={cx('interaction-num')}>{numSaved}</div>
      <button
        className={cx('interaction-button')}
        onClick={() => setIsShare(!isShare)}
      >
        <FontAwesomeIcon icon={faShare} />
      </button>
      <div className={cx('interaction-num')}>{numShared}</div>
    </div>
  );
};

export default InteractionContainer;
