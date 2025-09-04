import classNames from 'classnames/bind';
import styles from './VideoWrapper.module.scss';

import { LikedProvider } from '../../../contexts/LikedContext';
import InteractionContainer from './components/InteractionContainer';
import VideoContainer from './components/VideoContainer';
import { useComment } from '../../../contexts/CommentContext';
import ControlContainer from './components/ControlContainer';
import ProfileButton from '../ProfileButton/ProfileButton';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const VideoWrapper = forwardRef(({ videoId }, ref) => {
  const { showComment } = useComment();

  return (
    <LikedProvider>
      <div
        className={cx('wrapper')}
        style={showComment ? { width: '836px', padding: '0px ' } : {}}
      >
        <div className={cx('video-container')}>
          <VideoContainer videoId={videoId} ref={ref} />
          <InteractionContainer />
        </div>
      </div>
    </LikedProvider>
  );
});

export default VideoWrapper;
