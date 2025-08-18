import classNames from "classnames/bind";
import styles from './VideoContainer.module.scss'
import demo1 from './demo11.mp4'
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning, faEllipsis, faFlag, faHardDrive, faHeart, faHeartBroken, faHeartCrack, faPause, faPlay, faUpLong, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons/faVolumeMute";
import { icon } from "@fortawesome/fontawesome-svg-core";

const cx = classNames.bind(styles);

const iconTypes = [
    "NULL",
    "PAUSE",
    "PLAY",
    "MUTED",
    "UNMUTED"
]

const iconMap = {
  [iconTypes[1]]: faPause,
  [iconTypes[2]]: faPlay,
  [iconTypes[3]]: faVolumeHigh,
  [iconTypes[4]]: faVolumeMute
};

const settingElements = [
    {content: "Quality", icon: faHardDrive},
    {content: "Caption", icon: faClosedCaptioning},
    {content: "Auto scroll", icon: faUpLong},
    {content: "Not Interested", icon: faHeartCrack},
    {content: "Report", icon: faFlag}
]

const VideoContainer = () => {
    const [showIcon, setShowIcon] = useState(false);
    const [iconType, setIconType] = useState(iconTypes[0]);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [showHeartIcon, setShowHeartIcon] = useState(false);
    const [heartPosition, setHeartPosition] = useState({x: 0}, {y: 0});
    const [hearts, setHearts] = useState([]);
    const [heartAngle, setHeartAngle] = useState(0);

    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const dotRef = useRef(null);
    const pauseRef = useRef(null);
    const heartRef = useRef(null);

    let clickTimeout = null;    
    let clickCount = 0;

    const resetClick = () => {
        clickCount = 0;
        clickTimeout = null;
    }

    const handleCheckVideoClick = (e) => {
        clickCount++;
        console.log(clickCount);
        if(clickCount % 2 == 0){
            handleShowHeart(e);
            clearTimeout(clickTimeout);
            resetClick();
        }
        if(clickTimeout) clearTimeout(clickTimeout);

        clickTimeout = setTimeout(() => {
            if(clickCount == 1) handleVideoClick();
            resetClick();
        }, 250);
    }

    const handleVideoClick = () => {
        console.log("in video click")
        const video = videoRef.current;
        if(!video) return;

        setShowIcon(true);

        if(video.paused) {
            video.play();
            setIconType(iconTypes[1]);
        } else {
            video.pause();
            setIconType(iconTypes[2]);
        }

        setTimeout(() => {
            setShowIcon(false);
        }, 350);
    }

    const handleShowHeart = (e) => {
        clearTimeout(clickTimeout);
        clickTimeout = null;

        const id = Date.now();
        if(!videoRef.current) return;

        const rect = videoRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const angle = Math.floor(Math.random() * 60) - 30;
        const ref = React.createRef();

        const newHeart = {id, x, y, angle, ref, show: true};
        setHearts(prev => [...prev, newHeart]);

        setTimeout(() => {
            setHearts(prev => prev.map(h => h.id === id ? {...h, show: false} : h))
        }, 1000);
        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== id))
        }, 1600);
    }


    const changeVolume = (video, newVolume) => {
        setVolume(newVolume);

        if(video){
            video.volume = newVolume;
            video.muted = newVolume === 0;
            setIsMuted(newVolume === 0);
        }
    }

    const handleVolumeChange = (e) => {
        const video =  videoRef.current;
        const newVolume = parseFloat(e.target.value);
        changeVolume(video, newVolume);
    }

    const toggleMute = () => {
        setShowIcon(true);
        const video = videoRef.current;
        if(video){
            video.muted = !video.muted;
            setIsMuted(video.muted);
            if(video.muted) {
                changeVolume(video, 0);
                setIconType(iconTypes[4]);
            } else {
                changeVolume(video, 0.5);
                setIconType(iconTypes[3]);
            }
        }

        setTimeout(() => {
            setShowIcon(false);
        }, 350)
    }

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();

        const clickX = e.clientX - rect.left;
        const width = rect.width;

        const percent = clickX / width;

        if(videoRef.current)
            videoRef.current.currentTime = percent * videoRef.current.duration;
    }

    useEffect(() => {
        const video = videoRef.current;
        const progress = progressRef.current;
        const dot = dotRef.current;
        let animationFrameId;

        if(!video || !progress) return;
        const updateProgress = () => {
            const percent = (video.currentTime / video.duration) * 100;
            progress.style.width = `${percent}%`;
            dot.style.left = `calc(${percent}% - 10px)`;
            animationFrameId = requestAnimationFrame(updateProgress);
        }

        const handlePlay = () => animationFrameId = requestAnimationFrame(updateProgress);
        const handleEnd = () => cancelAnimationFrame(updateProgress);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handleEnd);
        video.addEventListener('ended', handleEnd)

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handleEnd);
            video.removeEventListener('ended', handleEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    console.log(showIcon, iconType);


    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <video 
                    ref={videoRef} 
                    className={cx('video')} 
                    onClick={handleCheckVideoClick} 
                    // onDoubleClick={handleShowHeart} 
                    loop
                >
                    <source src={demo1} type="video/mp4"/>
                    <track src="captions_en.vtt" kind="captions" srcLang="en" label="English"/>
                    Your browser does not support the video tag.
                </video>
            <button className={cx('progress-container')} onClick={handleProgressClick}>
                    <div ref={dotRef} className={cx('progress-dot')}></div>
                    <div className={cx('progress-bar')}>
                        <div ref={progressRef} className={cx('progress-run', 'progress')}></div>
                        <div className={cx('progress-static', 'progress')}></div>
                    </div>
                </button>
                <CSSTransition
                    in={showIcon}
                    timeout={700}
                    classNames={{
                        enter: cx('pause-container-enter'),
                        enterActive: cx('pause-container-enter-active'),
                        exit: cx('pause-container-exit'),
                        exitActive: cx('pause-container-exit-active')
                    }}
                    unmountOnExit
                    nodeRef={pauseRef}
                >
                    <button 
                        ref={pauseRef} 
                        className={cx('pause-container')} 
                        onClick={handleCheckVideoClick}
                        // onDoubleClick={handleShowHeart}
                    >
                        <FontAwesomeIcon 
                            icon={iconMap[iconType]} 
                            className={cx('pause-icon')} />
                    </button>
                </CSSTransition>
                <TransitionGroup>

                    {hearts.map(heart => 
                        <CSSTransition
                            key={heart.id}
                            in={heart.show}
                            timeout={600}
                            classNames={{
                                enter: cx('heart-container-enter'),
                                enterActive: cx('heart-container-enter-active'),
                                exit: cx('heart-container-exit'),
                                exitActive: cx('heart-container-exit-active')
                            }}
                            nodeRef={heart.ref}
                            unmountOnExit
                        >
                            <button 
                                className={cx('heartIcon-container')} 
                                onClick={handleCheckVideoClick}
                                // onDoubleClick={handleShowHeart}
                                style={{
                                    left: heart.x,
                                    top: heart.y, 
                                }}
                                ref={heart.ref}
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    className={cx('heartIcon')} 
                                    style={{ transform: `rotate(${heart.angle}deg)`}}
                                />
                            </button>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                <div className={cx('volume-container')}>
                    <button className={cx('volume-icon')} onClick={toggleMute}>
                        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
                    </button>
                    <div className={cx('volume-slider-container')}>
                        <input  
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className={cx('volume-slider')}
                        />
                    </div>
                </div>
                <div className={cx('setting-wrapper')}>
                    <button 
                        className={cx('setting-button')}
                        onClick={() => setShowSetting(!showSetting)}
                    >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    {showSetting && 
                        <div className={cx('setting-container')}>
                            {settingElements.map((settingElement) => 
                                <div key={settingElement.content} className={cx('setting-element')}>
                                    <FontAwesomeIcon icon={settingElement.icon} className={cx('setting-icon')}/>
                                    <div>{settingElement.content}</div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default VideoContainer;