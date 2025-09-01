import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FindingProvider } from '../../contexts/FindingContext';
import MainSideBar from '../../components/layouts/mainSidebar/MainSidebar';
import ProfileButton from '../../components/layouts/ProfileButton/ProfileButton';
import ProfileHeader from './components/ProfileHeader';
import ProfileVideo from './components/ProfileVideos';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx('wrapper')}>
      <FindingProvider>
        <MainSideBar />
      </FindingProvider>
      <div className={cx('profile-button')}>
        <ProfileButton />
      </div>
      <div className={cx('profile-container')}>
        <ProfileHeader />
        <ProfileVideo />
      </div>
    </div>
  );
};

export default Profile;
