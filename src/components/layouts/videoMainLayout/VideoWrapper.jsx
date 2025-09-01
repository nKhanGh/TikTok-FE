import classNames from 'classnames/bind';
import styles from './VideoWrapper.module.scss';

import { LikedProvider } from '../../../contexts/LikedContext';
import InteractionContainer from './components/InteractionContainer';
import VideoContainer from './components/VideoContainer';
import { useComment } from '../../../contexts/CommentContext';
import ControlContainer from './components/ControlContainer';
import ProfileButton from '../ProfileButton/ProfileButton';

const cx = classNames.bind(styles);

const VideoWrapper = () => {
  const { showComment } = useComment();

  return (
    <LikedProvider>
      <div
        className={cx('wrapper')}
        style={showComment ? { width: '836px', padding: '0px ' } : {}}
      >
        <div className={cx('video-container')}>
          <VideoContainer />
          <InteractionContainer />
        </div>
        <ControlContainer />
        {!showComment && <ProfileButton />}
      </div>
    </LikedProvider>
  );
};

export default VideoWrapper;
