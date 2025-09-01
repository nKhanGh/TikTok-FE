import classNames from 'classnames/bind';
import styles from './UploadSidebar.module.scss';
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sidebarElements } from './SidebarElement';

const cx = classNames.bind(styles);

const UploadSidebar = ({ chooseButton, setChooseButton }) => {
  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      <button
        className={cx('upload-button', {
          'non-active': chooseButton === 'null',
        })}
        onClick={() => setChooseButton('null')}
      >
        <FontAwesomeIcon icon={faPlus} className={cx('upload-plus')} />
        Upload
      </button>
      {sidebarElements.map((sidebarElement) => (
        <div key={sidebarElement.name} className={cx('element')}>
          <div className={cx('element-header')}>{sidebarElement.name}</div>
          {sidebarElement.elements.map((element) => (
            <button
              key={element.content}
              className={cx('element-button', {
                active: element.content === chooseButton,
              })}
              onClick={() => setChooseButton(element.content)}
            >
              <FontAwesomeIcon
                icon={element.icon}
                className={cx('element-icon')}
              ></FontAwesomeIcon>
              <div className={cx('element-content')}>{element.content}</div>
            </button>
          ))}
        </div>
      ))}
      <button className={cx('sidebar-footer')} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faAngleLeft} className={cx('back-icon')} />
        Back To TikTok
      </button>
    </div>
  );
};

UploadSidebar.propTypes = {
  chooseButton: PropTypes.string.isRequired,
  setChooseButton: PropTypes.func.isRequired,
};

export default UploadSidebar;
