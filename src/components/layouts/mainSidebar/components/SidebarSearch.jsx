import styles from './SidebarSearch.module.scss'
import classNames from 'classnames/bind';
import SidebarSearchHeader from './SidebarSearchHeader';
import SidebarSearchHistory from './SidebarSearchHistory';

const cx = classNames.bind(styles);

const SidebarSearch = () => {
    return <div className={cx('sidebar-search')}>
        <SidebarSearchHeader />
        <SidebarSearchHistory />
    </div>
}

export default SidebarSearch;