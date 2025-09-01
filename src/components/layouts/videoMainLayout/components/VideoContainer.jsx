import classNames from 'classnames/bind';
import styles from './VideoContainer.module.scss';
import demo1 from '../demo1.mp4';

import React, { useEffect, useRef, useState } from 'react';
import { useLiked } from '../../../../contexts/LikedContext';
import HeartContainer from './videoContainerComponent/HeartContainer';
import VolumeContainer from './videoContainerComponent/VolumeContainer';
import PauseContainer from './videoContainerComponent/PauseContainer';
import SettingWrapper from './videoContainerComponent/SettingWrapper';
import { useComment } from '../../../../contexts/CommentContext';

const cx = classNames.bind(styles);

const iconTypes = ['NULL', 'PAUSE', 'PLAY', 'MUTED', 'UNMUTED'];

const VideoContainer = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState(iconTypes[0]);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [hearts, setHearts] = useState([]);

  const { isLiked, setIsLiked, numLiked, setNumLiked } = useLiked();

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);

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

  const handleShowHeart = (e) => {
    clearTimeout(clickTimeout);
    clickTimeout = null;

    const id = Date.now();
    if (!videoRef.current) return;

    const rect = videoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = Math.floor(Math.random() * 60) - 30;
    const ref = React.createRef();

    const newHeart = { id, x, y, angle, ref, show: true };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(hideHeart(id), 1000);
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
    const handleEnd = () => cancelAnimationFrame(updateProgress);

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

  return (
    <div className={cx('video-container')}>
      <video
        ref={videoRef}
        className={cx('video')}
        onClick={handleCheckVideoClick}
        loop
        style={useComment().showComment ? { maxWidth: '758px' } : {}}
      >
        <source src={demo1} type='video/mp4' />
        <track
          src='captions_en.vtt'
          kind='captions'
          srcLang='en'
          label='English'
        />
        Your browser does not support the video tag.
      </video>
      <button
        className={cx('progress-container')}
        onClick={handleProgressClick}
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
};

export default VideoContainer;
