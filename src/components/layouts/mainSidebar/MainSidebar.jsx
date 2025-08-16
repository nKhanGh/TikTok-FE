import styles from './MainSideBar.module.scss'
import classNames from 'classnames/bind';
import { SidebarContext } from '../../../hooks/SidebarContext';
import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarFooter from './components/SidebarFooter';
import SidebarSearch from './components/SidebarSearch';


const cx = classNames.bind(styles);

const MainSideBar = () => {
    const [isFinding, setIsFinding] = useState(false);
    const nodeRef = useRef(null);

    return (
        <SidebarContext.Provider value={{isFinding, setIsFinding}}>
            <div style={{display: 'flex'}}>
                <div 
                    className={cx('wrapper')}
                    style={isFinding ? {width: '66px'}: {}}
                >
                    <SidebarHeader />
                    <div className={cx('wrapper-content')}>
                        <SidebarContent />
                        <SidebarFooter />
                    </div>
                </div>
                <CSSTransition 
                    in={isFinding}
                    timeout={400}
                    classNames={{
                        enter: cx('sidebar-search-enter'),
                        enterActive: cx('sidebar-search-enter-active'),
                        exit: cx('sidebar-search-exit'),
                        exitActive: cx('sidebar-search-exit-active')}}
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef}>
                        <SidebarSearch />
                    </div>
                </CSSTransition>
            </div>
        </SidebarContext.Provider>
    )
}

export default MainSideBar;