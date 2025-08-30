import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import UploadHeader from './components/UploadHeader';
import UploadSidebar from './components/UploadSidebar';
import UploadContainer from './components/UploadContainer';
import { useState } from 'react';

const cx = classNames.bind(styles);
const Upload = () => {
  const [chooseButton, setChooseButton] = useState('null');
  return (
    <div className={cx('wrapper')}>
      <UploadHeader />
      <UploadSidebar
        setChooseButton={setChooseButton}
        chooseButton={chooseButton}
      />
      <UploadContainer
        chooseButton={chooseButton}
        setChooseButton={setChooseButton}
      />
    </div>
  );
};

export default Upload;
