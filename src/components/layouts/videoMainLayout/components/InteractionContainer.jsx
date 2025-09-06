import classNames from 'classnames/bind';
import styles from './InteractionContainer.module.scss';
import avatar from '../avatar.jpg';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCheck,
  faComment,
  faHeart,
  faPlus,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useLiked } from '../../../../contexts/LikedContext';
import { useComment } from '../../../../contexts/CommentContext';
import PropTypes from 'prop-types';
import useAxios from '../../../../service/useAxios';
import { useLocation } from 'react-router-dom';
import { useFollow } from '../../../../contexts/FollowContext';

const cx = classNames.bind(styles);

const InteractionContainer = ({ videoInfo }) => {
  const userId = videoInfo?.userPost?.id;
  const [isSaved, setIsSaved] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [numSaved, setNumSaved] = useState(130);
  const [numShared] = useState(23);

  const username = localStorage.getItem('tiktokUsername');

  const axiosInstance = useAxios();

  const { isLiked, setIsLiked, numLiked, setNumLiked } = useLiked();

  const { showComment, setShowComment, numComment } = useComment();

  const { isFollowedMap, updateFollow } = useFollow();

  const handleLikeVideo = async () => {
    try {
      await axiosInstance.post(`/videos/${videoInfo.id}/like`, {
        skipAuth: false,
      });
      setNumLiked(isLiked ? numLiked - 1 : numLiked + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNumLiked(videoInfo?.likeCount);
    setIsLiked(
      videoInfo?.userLiked?.some(
        (userLiked) => userLiked.username === username,
      ),
    );
  }, [videoInfo, username]);

  const handleFollowUser = async () => {
    try {
      const response = await axiosInstance.post(`/users/${userId}/follow`);
      console.log(response);
      updateFollow(userId, !isFollowedMap[userId]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIsFollow = async () => {
      try {
        const response = await axiosInstance.get(`/users/isFollow/${userId}`);
        const isFollowed = response.data.result;
        updateFollow(userId, isFollowed);
      } catch (error) {
        console.log(error);
      }
    };
    checkIsFollow();
  }, [userId]);

  return (
    <div className={cx('interaction-container')}>
      <div className={cx('interaction-avatar-button')}>
        <img
          src={videoInfo?.userPost?.avatarUrl}
          alt='Khang'
          className={cx('interaction-avatar-img')}
        />
        <button
          className={cx('interaction-avatar-check')}
          onClick={handleFollowUser}
          style={
            !isFollowedMap[userId]
              ? { backgroundColor: '#fe2c55', color: '#fff' }
              : {}
          }
        >
          <FontAwesomeIcon icon={isFollowedMap[userId] ? faCheck : faPlus} />
        </button>
      </div>
      <button
        className={cx('interaction-button')}
        onClick={handleLikeVideo}
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

InteractionContainer.propTypes = {
  videoInfo: PropTypes.object.isRequired,
};

export default InteractionContainer;
