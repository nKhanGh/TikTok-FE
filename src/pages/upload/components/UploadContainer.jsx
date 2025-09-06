import classNames from 'classnames/bind';
import styles from './UploadContainer.module.scss';
import { useState } from 'react';
import UploadAdd from './uploadContainer/UploadAdd';
import UploadPreview from './uploadContainer/UploadPreview';
import useAxios from '../../../service/useAxios';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const UploadContainer = ({ chooseButton }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoId, setVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxios();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
    setUploadProgress(0);
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append('videoFile', file);

    try {
      const response = await axiosInstance.post('/videoFiles', formData, {
        skipAuth: false,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setUploadProgress(Math.round((loaded / total) * 100));
          console.log(Math.round((loaded / total) * 100));
        },
      });
      const videoFileId = response.data.result.videoFileId;
      console.log(videoFileId);
      setVideoId(videoFileId);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('wrapper')}>
      {chooseButton === 'null' &&
        (selectedFile === null ? (
          <UploadAdd handleUpload={handleUpload} />
        ) : (
          <UploadPreview
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            uploadProgress={uploadProgress}
            videoId={videoId}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

UploadContainer.propTypes = {
  chooseButton: PropTypes.string.isRequired,
};

export default UploadContainer;
