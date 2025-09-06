import classNames from 'classnames/bind';
import styles from './UploadPreviewInfo.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAxios from '../../../../service/useAxios';

const cx = classNames.bind(styles);

const postTime = {
  now: 'now',
  schedule: 'schedule',
};

const UploadPreviewInfo = ({ selectedFile, videoFileId, setSelectedFile }) => {
  const [uploadContent, setUploadContent] = useState(() => {
    const filename = selectedFile.name;
    const dotIndex = filename.lastIndexOf('.');
    return filename.substring(0, dotIndex);
  });
  const [timePost, setTimePost] = useState(postTime.now);

  const axiosInstance = useAxios();

  const addHashtag = () => {
    setUploadContent((prev) => {
      if (!prev.endsWith('#')) prev += '#';
      return prev;
    });
  };

  const handlePostVideo = async (e) => {
    e.preventDefault();
    let tmpHashtags = [];
    let caption = '';
    console.log(uploadContent);
    uploadContent.split('#').forEach((a, index) => {
      console.log(a);
      if (index == 0 && uploadContent[0] != '#') caption = a;
      else tmpHashtags.push(a);
    });

    try {
      const response = await axiosInstance.post(
        '/videos',
        {
          videoFileId,
          caption,
          hashtags: tmpHashtags,
        },
        { skipAuth: false },
      );
      console.log(response.data.result);
      alert('Video Published');
      setSelectedFile(null);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('preview-header')}>Details</div>
      <div className={cx('preview-container')}>
        Description
        <div className={cx('input-container')}>
          <textarea
            value={uploadContent}
            type='text'
            className={cx('input-content')}
            onChange={(e) => setUploadContent(e.target.value)}
          />
          <button
            className={cx('input-button', 'input-hashtags')}
            onClick={addHashtag}
          >
            # Hashtags
          </button>
          <button className={cx('input-button', 'input-mention')}>
            @ Mention
          </button>
        </div>
      </div>

      <div className={cx('preview-header')}>Setting</div>
      <div className={cx('preview-container')}>
        When to Post
        <div className={cx('preview-checkbox')}>
          <label className={cx('custom-checkbox')}>
            <input
              type='checkbox'
              checked={timePost === postTime.now}
              onChange={() => setTimePost(postTime.now)}
            />
            <div className={cx('checkbox')}></div>
            <span>Now</span>
          </label>
          <label className={cx('custom-checkbox')}>
            <input
              type='checkbox'
              checked={timePost === postTime.schedule}
              onChange={() => setTimePost(postTime.schedule)}
            />
            <div className={cx('checkbox')}></div>
            <span>Schedule</span>
          </label>
        </div>
      </div>
      <div className={cx('preview-footer')}>
        <button className={cx('preview-post')} onClick={handlePostVideo}>
          Post
        </button>
        <button className={cx('preview-discard')}>Discard</button>
      </div>
    </div>
  );
};

UploadPreviewInfo.propTypes = {
  selectedFile: PropTypes.instanceOf(File).isRequired,
  videoFileId: PropTypes.string.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default UploadPreviewInfo;
