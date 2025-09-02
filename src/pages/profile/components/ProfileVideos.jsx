import classNames from 'classnames/bind';
import styles from './ProfileVideos.module.scss';
import { faIndent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import useAxios from '../../../service/useAxios';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const buttons = [
  { icon: faIndent, content: 'Videos' },
  { icon: faBookmark, content: 'Favorites' },
  { icon: faHeart, content: 'Liked' },
];

const ProfileVideo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [videoIds, setVideoIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const axiosInstance = useAxios();

  const location = useLocation();

  const containerRef = useRef();
  const loadMoreRef = useRef();

  const fetchVideo = async () => {
    if (!hasMore) return;

    const username = location.pathname.substring(2);

    try {
      const response = await axiosInstance.get(
        `/videos/public/byUser/${username}/paged?cursor=${cursor}&limit=${limit}`,
        { skipAuth: false },
      );
      const result = response.data.result;
      console.log(result);
      setVideoIds((prev) => [...prev, ...result.videoIds]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (error) {
      console.log(error.data.message);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchVideo();
        }
      },
      { threshold: 0.1 },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [cursor, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    const index = hoverIndex === null ? activeIndex : hoverIndex;
    const activeButton = container.children[index];

    setUnderlineStyle({
      width: activeButton.offsetWidth + 'px',
      left: activeButton.offsetLeft + 'px',
    });
  }, [activeIndex, hoverIndex]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-header')}>
        <div className={cx('video-buttons')} ref={containerRef}>
          {buttons.map((b, i) => (
            <button
              key={b.content}
              className={cx('video-button', {
                'video-button-active':
                  b.content === buttons[activeIndex].content,
              })}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <FontAwesomeIcon icon={b.icon} />
              {b.content}
            </button>
          ))}
          <div className={cx('underline')} style={underlineStyle}></div>
        </div>
      </div>
      <div className={cx('video-container')}>
        {videoIds.map((videoId) => (
          <video
            key={videoId}
            className={cx('video-element')}
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
            tabIndex={0}
            muted
            loop
          >
            <source src={`/api/videos/public/${videoId}/get`} />
            <track kind='captions' src={null} label='none' />
          </video>
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: '1px' }}></div>
    </div>
  );
};

export default ProfileVideo;
