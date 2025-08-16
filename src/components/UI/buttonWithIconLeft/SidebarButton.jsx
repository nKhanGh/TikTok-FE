import classNames from "classnames/bind";
import styles from "./SidebarButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const SidebarButton = ({ icon, content, onClick}) => {
    return (
        <button className={cx('sidebar-button')} onClick={onClick}>
            {icon && 
                (<FontAwesomeIcon icon={icon} className={cx('sidebar-button-icon')} />)
            }
            <div className={cx('sidebar-button-content')}>
                {content}
            </div>
        </button>
    )
}

export default SidebarButton;