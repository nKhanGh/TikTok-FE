import styles from './SideBarHeader.module.scss';
import classNames from 'classnames/bind';
import logo from '@/assets/images/logo.svg';
import singleLogo from '@/assets/images/singleLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useFinding } from '../../../../hooks/FindingContext';

const cx = classNames.bind(styles);

const SidebarHeader = () => {
  const { isFinding, setIsFinding } = useFinding();
  const navigate = useNavigate();
  return (
    <div className={cx('sidebar-header')}>
      <button
        onClick={() => navigate('/')}
        style={{ backgroundColor: '#000', border: 'none' }}
      >
        <img
          src={isFinding ? singleLogo : logo}
          alt='TIKTOK'
          className={cx('logo')}
          style={isFinding ? { marginBottom: '3px', marginTop: '-4px' } : {}}
        />
      </button>
      <div className={cx('search')}>
        <button
          className={cx('search-button')}
          onClick={() => setIsFinding(!isFinding)}
          style={isFinding ? {} : { width: '204px' }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx('search-button-icon')}
          ></FontAwesomeIcon>
          {!isFinding && (
            <div className={cx('search-button-content')}>Search</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
