import classNames from 'classnames/bind';
import styles from './viewMainLayout.module.scss';
import { CommentProvider } from '../../../contexts/CommentContext';
import CommentContainer from '../commentMainLayOut/CommentContainer';
import VideoWrapper from '../videoMainLayout/VideoWrapper';
import { LoginProVider } from '../../../contexts/LoginContext';

const cx = classNames.bind(styles);

const ViewMainLayout = () => {
  return (
    <CommentProvider>
      <div className={cx('wrapper')}>
        <VideoWrapper />
        <CommentContainer />
      </div>
    </CommentProvider>
  );
};

export default ViewMainLayout;
