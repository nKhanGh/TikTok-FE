import styles from './SidebarSearch.module.scss';
import classNames from 'classnames/bind';
import SidebarSearchHeader from './SidebarSearchHeader';
import SidebarSearchHistory from './SidebarSearchHistory';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { useFinding } from '../../../../contexts/FindingContext';

const cx = classNames.bind(styles);

const SidebarSearch = () => {
  const { isFinding } = useFinding();

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={isFinding}
      timeout={300}
      classNames={{
        enter: cx('sidebar-search-enter'),
        enterActive: cx('sidebar-search-enter-active'),
        exit: cx('sidebar-search-exit'),
        exitActive: cx('sidebar-search-exit-active'),
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={cx('sidebar-search')}>
        <SidebarSearchHeader />
        <SidebarSearchHistory />
      </div>
    </CSSTransition>
  );
};

export default SidebarSearch;
