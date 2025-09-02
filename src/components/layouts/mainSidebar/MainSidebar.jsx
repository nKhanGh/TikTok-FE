import styles from './MainSideBar.module.scss';
import classNames from 'classnames/bind';

import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarFooter from './components/SidebarFooter';
import SidebarSearch from './components/SidebarSearch';
import { useFinding } from '../../../contexts/FindingContext';

const cx = classNames.bind(styles);

const MainSideBar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div
        className={cx('wrapper')}
        style={useFinding().isFinding ? { width: '72px' } : {}}
      >
        <SidebarHeader />
        <div className={cx('wrapper-content')}>
          <SidebarContent />
          <SidebarFooter />
        </div>
        <SidebarSearch />
      </div>
    </div>
  );
};

export default MainSideBar;
