import classNames from 'classnames/bind';
import styles from './viewMainLayout.module.scss';
import { CommentProvider } from '../../../contexts/CommentContext';
import CommentContainer from '../commentMainLayOut/CommentContainer';
import VideoWrapper from '../videoMainLayout/VideoWrapper';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';
import ControlContainer from '../videoMainLayout/components/ControlContainer';
import { FollowProvider } from '../../../contexts/FollowContext';

const cx = classNames.bind(styles);

const getVideoUrl = (id) => `/api/videos/public/${id}/get`;

const ViewMainLayout = ({ fetchVideo, hasMore, videoIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const containerRef = useRef();
  const videoRefs = useRef({});

  useEffect(() => {
    fetchVideo();
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-feed-item='1']"));
    const observer = new IntersectionObserver(
      (entries) => {
        let candidate = { idx: -1, ratio: 0 };
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.intersectionRatio > candidate.ratio) {
            candidate = { idx, ratio: entry.intersectionRatio };
          }
        });
        if (candidate.idx != -1 && candidate.ratio >= 0.6) {
          setCurrentIndex(candidate.idx);
          setActiveVideoId(videoIds[candidate.idx]);
          videoRefs.current[candidate.idx].play();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], root },
    );
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [videoIds.length]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((v) => {
      if (!v) return;
      if (Number(v.dataset.index) === currentIndex) v.play().catch(() => {});
      else v.pause();
    });
  }, [currentIndex]);

  useEffect(() => {
    if (hasMore && videoIds.length - currentIndex <= 3) {
      fetchVideo();
    }

    const minIdx = Math.max(0, currentIndex - 1);
    const maxIdx = Math.min(videoIds.length - 1, currentIndex + 1);

    for (let i = 0; i < videoIds.length; i++) {
      const vEl = videoRefs.current[i];
      if (!vEl) continue;

      if (i >= minIdx && i <= maxIdx) {
        if (!vEl.src || vEl.src.endsWith('#empty')) {
          vEl.src = getVideoUrl(videoIds[i]);

          if (i === currentIndex) vEl.setAttribute('preload', 'auto');
          else vEl.setAttribute('preload', 'metadata');
          vEl.load();
        }
      } else if (vEl.src && !vEl.src.endsWith('#empty')) {
        vEl.removeAttribute('src');
        vEl.src = '#empty';
        vEl.load();
      }
    }
  }, [currentIndex, videoIds, fetchVideo, hasMore]);

  useEffect(() => {
    const onVis = () => {
      const v = videoRefs.current[currentIndex];
      if (!v) return;
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);

    return () => document.removeEventListener('visibilitychange', onVis);
  }, [currentIndex]);
  return (
    <div className={cx('wrapper')} ref={containerRef}>
      <FollowProvider>
        <CommentProvider>
          {videoIds.map((videoId, idx) => (
            <div
              style={{ height: '100vh' }}
              key={videoId}
              data-index={idx}
              data-feed-item='1'
            >
              <VideoWrapper
                videoId={videoId}
                ref={(el) => (videoRefs.current[idx] = el)}
              />
            </div>
          ))}
          <CommentContainer videoId={activeVideoId} />
          <ProfileButton />
          <ControlContainer />
        </CommentProvider>
      </FollowProvider>
    </div>
  );
};

ViewMainLayout.propTypes = {
  fetchVideo: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  videoIds: PropTypes.array.isRequired,
};

export default ViewMainLayout;
