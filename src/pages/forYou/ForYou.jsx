import MainSideBar from "../../components/layouts/mainSidebar/MainSidebar";
import VideoContainer from "../../components/layouts/videoContainer/VideoContainer";
import styles from './ForYou.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ForYou = () => {
    return <div className={cx('wrapper')}>
        <MainSideBar />
        <VideoContainer />
    </div>
};

export default ForYou;