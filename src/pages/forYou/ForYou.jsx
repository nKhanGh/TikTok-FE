import MainSideBar from '../../components/layouts/mainSidebar/MainSidebar';
import ViewMainLayout from '../../components/layouts/viewMainLayout/viewMainLayout';
import { FindingProvider } from '../../hooks/FindingContext';
import styles from './ForYou.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ForYou = () => {
  return (
    <div className={cx('wrapper')}>
      <FindingProvider>
        <MainSideBar />
      </FindingProvider>
      <ViewMainLayout />
    </div>
  );
};

export default ForYou;
