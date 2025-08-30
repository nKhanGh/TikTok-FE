import classNames from 'classnames/bind';
import styles from './UploadPreview.module.scss';
import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons/faArrowRotateLeft';
import PropTypes from 'prop-types';
import UploadPreviewInfo from './UploadPreviewInfo';
import UploadPreviewSee from './UploadPreviewSee';

const cx = classNames.bind(styles);

const UploadPreview = ({
  selectedFile,
  setSelectedFile,
  uploadProgress,
  isLoading,
  videoId,
}) => {
  console.log(isLoading);
  return (
    <div className={cx('preview-wrapper')}>
      <div className={cx('preview-progress')}>
        <div className={cx('preview-info')}>
          <div className={cx('preview-name')}>{selectedFile.name}</div>
          {isLoading ? (
            <div
              className={cx('preview-size')}
              style={{ color: 'rgb(0, 117, 220)' }}
            >
              <FontAwesomeIcon
                icon={faSpinner}
                className={cx('preview-loading')}
              />
              Upload in progress ({(selectedFile.size / 1024).toFixed(2)}KB)
            </div>
          ) : (
            <div className={cx('preview-size')}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={cx('preview-check')}
              />
              Uploaded ({(selectedFile.size / 1024).toFixed(2)}KB)
            </div>
          )}
        </div>
        <button
          className={cx('preview-replace')}
          onClick={() => setSelectedFile(null)}
        >
          <FontAwesomeIcon
            icon={faArrowRotateLeft}
            style={{ fontSize: '10px' }}
          />{' '}
          Replace
        </button>
        <div
          className={cx('progress-bar')}
          style={
            uploadProgress === 100 && !isLoading
              ? {
                  backgroundColor: '#0be09b',
                  width: '100%',
                }
              : {
                  background: `linear-gradient(90deg, rgba(0, 117, 220, 0.4) 0%, rgb(0, 117, 220) 100%)`,
                  width: `${uploadProgress}%`,
                }
          }
        ></div>
      </div>
      <div className={cx('preview-container')}>
        <UploadPreviewInfo
          selectedFile={selectedFile}
          videoFileId={videoId}
          setSelectedFile={setSelectedFile}
        />
        <UploadPreviewSee />
      </div>
    </div>
  );
};

UploadPreview.propTypes = {
  selectedFile: PropTypes.instanceOf(File).isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default UploadPreview;
