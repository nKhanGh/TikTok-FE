import classNames from 'classnames/bind';
import styles from './viewMainLayout.module.scss';
import { CommentProvider } from '../../../hooks/CommentContext';
import CommentContainer from '../commentMainLayOut/CommentContainer';
import VideoWrapper from '../videoMainLayout/VideoWrapper';
import { LoginProVider } from '../../../hooks/LoginContext';

const cx = classNames.bind(styles);

const ViewMainLayout = () => {
  return (
    <LoginProVider>
      <CommentProvider>
        <div className={cx('wrapper')}>
          <VideoWrapper />
          <CommentContainer />
        </div>
      </CommentProvider>
    </LoginProVider>
  );
};

export default ViewMainLayout;
