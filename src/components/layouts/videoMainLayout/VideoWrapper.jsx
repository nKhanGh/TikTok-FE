import classNames from 'classnames/bind';
import styles from './VideoWrapper.module.scss';

import { LikedProvider } from '../../../contexts/LikedContext';
import InteractionContainer from './components/InteractionContainer';
import VideoContainer from './components/VideoContainer';
import { useComment } from '../../../contexts/CommentContext';
import { forwardRef, useEffect, useState } from 'react';
import useAxios from '../../../service/useAxios';
import { FollowProvider } from '../../../contexts/FollowContext';

const cx = classNames.bind(styles);

const VideoWrapper = forwardRef(({ videoId }, ref) => {
  const { showComment } = useComment();
  const [videoInfo, setVideoInfo] = useState({});
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await axiosInstance.get(`/videos/public/${videoId}`);
        const newVideoInfo = response.data.result;
        setVideoInfo(newVideoInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideoInfo();
  }, []);

  return (
    <LikedProvider>
      <div
        className={cx('wrapper')}
        style={showComment ? { width: '836px', padding: '0px ' } : {}}
      >
        <div className={cx('video-container')}>
          <VideoContainer videoInfo={videoInfo} ref={ref} />
          <InteractionContainer videoInfo={videoInfo} />
        </div>
      </div>
    </LikedProvider>
  );
});

export default VideoWrapper;
