import classNames from "classnames/bind"
import styles from './SidebarSearchHistory.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faChevronDown, faClock, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

const youMayLikes = [
    "khang",
    "who is Khang",
    "Khang pro vai",
    "review phim",
    "football news",
    "music trending",
    "Iphone 18 pro max",
    "coffe",
    "hot trend world 2025",
    "kakakaaka",
    "Sunday the king play",
    "Messi",
]

const cx = classNames.bind(styles);
const SidebarSearchHistory = () => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [numhis, setNumhis] = useState(5);
    const [histories, setHistories] = useState(
        [
            "who is the goat of football",
            "Lionel Messi",
            "Cristiano Ronaldo",
            "King of football",
            "7 grass",
            "pen",
            "Messi date of birth",
            "premier league",
            "laliga",
            "champions league"
        ]
    );

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleDeleteHistory = (index) => {
        setHistories(histories.filter((_, i) => i != index));
    }

    const handleSubmit = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            if(!value.trim()) return;
            setHistories((prev) => {
                let newHistories = [value, ...prev];
                if(newHistories.length >= 10)
                    newHistories.pop();
                return newHistories;
            });
            setValue("");
        }
    }
    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, [])

    return (
        <div className={cx('searchHistory')}>
            <div style={{position: 'fixed', backgroundColor: '#000', zIndex: '2'}}>
                <input 
                    ref={inputRef}
                    type="text" 
                    className={cx('searchHistory-input')}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                />
                { value.trim() == "" && <div className={cx('searchHistory-input-content')}>Search</div>}
            </div>
            <div className={cx('search-content-container')}>
                {histories.length != 0 && <div className={cx('searchHistory-container')}>
                    <div className={cx('searchHistory-header')}>Recent Searches</div>
                    {histories.slice(0, numhis).map(((history, index) => 
                        <div key={history} className={cx('searchHistory-content')}>
                            <FontAwesomeIcon icon={faClock} className={cx('searchHistory-content-clock')}/>
                            {history}
                            <button 
                                className={cx('searchHistory-content-x')}
                                onClick={() => handleDeleteHistory(index)}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    ))}
                    {numhis == 5
                        ? histories.length > 5 && <button 
                            className={cx('searchHistory-seemore')}
                            onClick={() => numhis == 5 ? setNumhis(10) : setNumhis(5)}
                        >
                            See more 
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                        : <button 
                            className={cx('searchHistory-seemore')}
                            onClick={() => {setHistories([]); setNumhis(5)}}
                        >
                            Clear all
                        </button>
                    }
                </div>}
                <div className={cx('searchHistory-container')}>
                    <div className={cx('searchHistory-header')}>You may like</div>
                    {youMayLikes.map(((youMayLike, index) => 
                        <div key={youMayLike} className={cx('searchHistory-content')}>
                            <FontAwesomeIcon icon={faArrowUp} className={cx('searchHistory-content-clock')}/>
                            {youMayLike}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SidebarSearchHistory;