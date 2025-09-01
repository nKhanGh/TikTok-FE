import classNames from 'classnames/bind';
import styles from './ProfileVideos.module.scss';
import { faIndent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';

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

  const containerRef = useRef();

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
    </div>
  );
};

export default ProfileVideo;
