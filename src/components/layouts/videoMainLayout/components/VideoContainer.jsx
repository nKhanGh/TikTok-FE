import classNames from 'classnames/bind';
import styles from './VideoContainer.module.scss';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useLiked } from '../../../../contexts/LikedContext';
import HeartContainer from './videoContainerComponent/HeartContainer';
import VolumeContainer from './videoContainerComponent/VolumeContainer';
import PauseContainer from './videoContainerComponent/PauseContainer';
import SettingWrapper from './videoContainerComponent/SettingWrapper';
import { useComment } from '../../../../contexts/CommentContext';
import PropTypes from 'prop-types';
import useAxios from '../../../../service/useAxios';

const cx = classNames.bind(styles);

const iconTypes = ['NULL', 'PAUSE', 'PLAY', 'MUTED', 'UNMUTED'];

const VideoContainer = forwardRef(({ videoInfo }, ref) => {
  //UI--------------------------------------------------------------------------------------
  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState(iconTypes[0]);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const { isLiked, setIsLiked, numLiked, setNumLiked } = useLiked();
  const progressRef = useRef(null);
  const dotRef = useRef(null);
  const videoRef = useRef(null);

  const axiosInstance = useAxios();

  let clickTimeout = null;
  let clickCount = 0;

  const resetClick = () => {
    clickCount = 0;
    clickTimeout = null;
  };

  const handleCheckVideoClick = (e) => {
    clickCount++;
    if (clickCount % 2 == 0) {
      handleShowHeart(e);
      clearTimeout(clickTimeout);
      setIsLiked(true);
      setNumLiked(isLiked ? numLiked : numLiked + 1);
      resetClick();
    }
    if (clickTimeout) clearTimeout(clickTimeout);

    clickTimeout = setTimeout(() => {
      if (clickCount == 1) handleVideoClick();
      resetClick();
    }, 250);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowIcon(true);

    if (video.paused) {
      video.play();
      setIconType(iconTypes[1]);
    } else {
      video.pause();
      setIconType(iconTypes[2]);
    }

    setTimeout(() => {
      setShowIcon(false);
    }, 350);
  };

  const hideHeart = (id) =>
    setHearts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, show: false } : h)),
    );

  const handleLikeVideo = async () => {
    try {
      const result = await axiosInstance.post(`/videos/${videoInfo.id}/like`, {
        skipAuth: false,
      });
      setNumLiked(isLiked ? numLiked - 1 : numLiked + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowHeart = (e) => {
    if (!isLiked) handleLikeVideo();
    clearTimeout(clickTimeout);
    clickTimeout = null;
    const id = Date.now();
    if (!videoRef.current) return;

    const rect = videoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = Math.floor(Math.random() * 60) - 30;
    const heartRef = React.createRef();

    const newHeart = { id, x, y, angle, heartRef, show: true };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => hideHeart(id), 1000);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1600);
  };

  const changeVolume = (video, newVolume) => {
    setVolume(newVolume);

    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    changeVolume(video, newVolume);
  };

  const toggleMute = () => {
    setShowIcon(true);
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      if (video.muted) {
        changeVolume(video, 0);
        setIconType(iconTypes[4]);
      } else {
        changeVolume(video, 0.5);
        setIconType(iconTypes[3]);
      }
    }

    setTimeout(() => {
      setShowIcon(false);
    }, 350);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;

    if (videoRef.current)
      videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e); // gọi 1 lần ngay lúc bấm
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateProgress(e);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const video = videoRef.current;
    const dot = dotRef.current;
    const percent = parseFloat(dot.dataset.percent || 0);
    video.currentTime = percent * video.duration;
  };

  const updateProgress = (e) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;

    const rect = video.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(Math.max(moveX / width, 0), 1);

    progress.style.width = `${percent * 100}%`;
    dot.style.left = `calc(${percent * 100}% - 10px)`;

    dot.dataset.percent = percent;
  };

  // gắn listener global cho mousemove/mouseup
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;
    let animationFrameId;

    if (!video || !progress) return;
    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      progress.style.width = `${percent}%`;
      dot.style.left = `calc(${percent}% - 10px)`;
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    const handlePlay = () =>
      (animationFrameId = requestAnimationFrame(updateProgress));
    const handleEnd = () => cancelAnimationFrame(animationFrameId);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handleEnd);
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handleEnd);
      video.removeEventListener('ended', handleEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    ref(videoRef.current);
  }, []);

  const toString = (hashtags = []) =>
    hashtags.reduce((acc, hashtag) => acc + ' #' + hashtag.tag, '');

  return (
    <div className={cx('video-container')}>
      <video
        ref={videoRef}
        className={cx('video')}
        onClick={handleCheckVideoClick}
        loop
        style={useComment().showComment ? { maxWidth: '758px' } : {}}
      >
        <track
          src='captions_en.vtt'
          kind='captions'
          srcLang='en'
          label='English'
        />
        Your browser does not support the video tag.
      </video>
      <div className={cx('videoInfo')}>
        <div className={cx('videoInfo-username')}>
          {videoInfo?.userPost?.username}
        </div>
        <span className={cx('videoInfo-caption')}>
          {videoInfo?.caption + toString(videoInfo?.hashtags)}
        </span>
      </div>
      <button
        className={cx('progress-container')}
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
      >
        <div ref={dotRef} className={cx('progress-dot')}></div>
        <div className={cx('progress-bar')}>
          <div
            ref={progressRef}
            className={cx('progress-run', 'progress')}
          ></div>
          <div className={cx('progress-static', 'progress')}></div>
        </div>
      </button>
      <PauseContainer
        showIcon={showIcon}
        iconType={iconType}
        handleCheckVideoClick={handleCheckVideoClick}
      />
      <HeartContainer
        hearts={hearts}
        handleCheckVideoClick={handleCheckVideoClick}
      />
      <VolumeContainer
        isMuted={isMuted}
        toggleMute={toggleMute}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
      <SettingWrapper />
    </div>
  );
});

export default VideoContainer;
