import classNames from "classnames/bind";
import styles from './SidebarSearchHeader.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SidebarContext } from "../../../../hooks/SidebarContext";

const cx = classNames.bind(styles);

const SidebarSearchHeader = () => {
    const {setIsFinding} = useContext(SidebarContext);
    return <div className={cx('sidebarSearch-header')}>
        <div className={cx('searchHeader-content')}>Search</div>
        <button 
            className={cx('searchHeader-close')} 
            onClick={() => setIsFinding(false)}
        >
            <FontAwesomeIcon icon={faClose}/>
        </button>
    </div>
}

export default SidebarSearchHeader;