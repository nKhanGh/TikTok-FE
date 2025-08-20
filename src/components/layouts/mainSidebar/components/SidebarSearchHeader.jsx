import classNames from 'classnames/bind';
import styles from './SidebarSearchHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useFinding } from '../../../../hooks/FindingContext';

const cx = classNames.bind(styles);

const SidebarSearchHeader = () => {
  const { setIsFinding } = useFinding();
  return (
    <div className={cx('sidebarSearch-header')}>
      <div className={cx('searchHeader-content')}>Search</div>
      <button
        className={cx('searchHeader-close')}
        onClick={() => setIsFinding(false)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};

export default SidebarSearchHeader;
