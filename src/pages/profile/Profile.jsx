import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FindingProvider } from '../../contexts/FindingContext';
import MainSideBar from '../../components/layouts/mainSidebar/MainSidebar';
import ProfileButton from '../../components/layouts/ProfileButton/ProfileButton';
import ProfileHeader from './components/ProfileHeader';
import ProfileVideo from './components/ProfileVideos';
import { CommentProvider } from '../../contexts/CommentContext';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx('wrapper')}>
      <FindingProvider>
        <MainSideBar />
      </FindingProvider>
      <div className={cx('profile-button')}>
        <CommentProvider>
          <ProfileButton />
        </CommentProvider>
      </div>
      <div className={cx('profile-container')}>
        <ProfileHeader />
        <ProfileVideo />
      </div>
    </div>
  );
};

export default Profile;
