import classNames from 'classnames/bind';
import styles from './ImageCrop.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'react-easy-crop';
import { useCallback, useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const ImageCrop = ({ setIsCropping, setSelectedFile, selectedFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const zoomBarRef = useRef();

  const onCropCompleteHandler = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const generateCroppedImage = async () => {
    if (!croppedAreaPixels) throw new Error('Crop area is not ready');

    const image = new Image();
    const blobUrl = URL.createObjectURL(selectedFile);
    image.src = blobUrl;
    await image.decode();
    URL.revokeObjectURL(blobUrl);

    const size = Math.max(croppedAreaPixels.width, croppedAreaPixels.height);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      size,
      size,
    );

    const type = 'image/png';
    const outName =
      selectedFile.name.replace(/\.(png|jpe?g|webp|gif)$/i, '') + '.png';
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, type));
    const newFile = new File([blob], outName, { type });
    setSelectedFile(newFile);
    setIsCropping(false);
  };

  useEffect(() => {
    if (zoomBarRef.current) {
      const min = zoomBarRef.current.min || 0;
      const max = zoomBarRef.current.max || 100;
      const val = ((zoom - min) / (max - min)) * 100;
      zoomBarRef.current.style.background = `linear-gradient(to right, #fe2c55 ${val}%, #fff ${val}%)`;
    }
  }, [zoom]);

  return (
    <>
      <div className={cx('header')}>
        <button
          className={cx('header-icon')}
          onClick={() => {
            setIsCropping(false);
            setSelectedFile(null);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>Edit Photo</span>
      </div>
      <div className={cx('crop-container')}>
        <Cropper
          image={URL.createObjectURL(selectedFile)}
          crop={crop}
          zoom={zoom}
          maxZoom={10}
          aspect={1}
          cropShape='rect'
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
          style={{
            containerStyle: {
              minHeight: '360px',
              maxHeight: '441px',
              width: '640px',
              maxWidth: '700px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
            mediaStyle: {},
            cropAreaStyle: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              width: '360px',
              height: '100%',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.3)',
            },
          }}
        />
      </div>
      <div className={cx('progress-bar')}>
        <span>Zoom</span>
        <input
          ref={zoomBarRef}
          type='range'
          value={zoom}
          max={10}
          min={1}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e) => setZoom(e.target.value)}
          className={cx('zoom-range')}
        />
      </div>
      <div className={cx('footer')}>
        <button
          onClick={() => {
            setIsCropping(false);
            setSelectedFile(null);
          }}
          className={cx('cancel-button')}
        >
          Cancel
        </button>
        <button onClick={generateCroppedImage} className={cx('apply-button')}>
          Apply
        </button>
      </div>
    </>
  );
};

ImageCrop.propTypes = {
  setIsCropping: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  selectedFile: PropTypes.instanceOf(File).isRequired,
};

export default ImageCrop;
