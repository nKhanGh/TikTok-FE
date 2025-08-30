import classNames from 'classnames/bind';
import styles from './UploadAdd.module.scss';
import PropTypes from 'prop-types';
import { faCameraAlt, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faTv } from '@fortawesome/free-solid-svg-icons/faTv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const footerElement = [
  {
    icon: faCameraAlt,
    header: 'Size and duration',
    content: 'Maximum size: 30 GB, video duration: 60 minutes.',
  },
  {
    icon: faCameraRetro,
    header: 'File formats',
    content: 'Recommended: “.mp4”. Other major formats are supported.',
  },
  {
    icon: faTv,
    header: 'Video revolutions',
    content: 'High-resolution recommended: 1080p, 1440p, 4K.',
  },
  {
    icon: faLightbulb,
    header: 'Aspect ratios',
    content: 'Recommended: 16:9 for landscape, 9:16 for vertical.',
  },
];

const UploadAdd = ({ handleUpload }) => {
  return (
    <div className={cx('upload-wrapper')}>
      <label className={cx('upload-container')}>
        <img
          src={
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOS4zNDc1IDcuNDQwNzFMOC44MDY0MiAxMS44MDY5QzMuOTQ0NDggMTIuODQwMyAwLjg0MDg2MiAxNy42MTk0IDEuODc0MyAyMi40ODE0TDkuOTgyODUgNjAuNjI5MUMxMS4wMTYzIDY1LjQ5MTEgMTUuNzk1NCA2OC41OTQ3IDIwLjY1NzQgNjcuNTYxM0w0MC44MzA5IDYzLjI3MzJDMzkuNzUzNiA2Mi4yNDE3IDM4LjcwMjkgNjAuNTcyNSAzOC43MDI5IDU4LjM1MTFDMzguNzAyOSA1Ni4wNTQ3IDM5LjgyNTggNTQuMzQ4MyA0MC45NDA1IDUzLjMyNjNDNDEuOTEyNSA1Mi40MzUxIDQyLjk2MjkgNTEuOTYzMiA0My41Njk5IDUxLjcyMTVDNDQuNjQzNSA1MS4yOTQxIDQ1Ljk0NSA1MC45OTExIDQ2Ljc2NzggNTAuNzk5NUw0Ny4wMTExIDUwLjc0MjdDNDcuMjYyNCA1MC42ODM1IDQ3LjQ5NjkgNTAuNjI3NCA0Ny43MTY3IDUwLjU3MzJMNDAuMDIyMSAxNC4zNzI4QzM4Ljk4ODYgOS41MTA4OSAzNC4yMDk1IDYuNDA3MjcgMjkuMzQ3NSA3LjQ0MDcxWk0zMy40MzY5IDM0LjYxNTdDMzQuOTc0MyAzNS4xMTUyIDM1LjM5NDUgMzcuMDkxOCAzNC4xOTMxIDM4LjE3MzVMMjMuMTg3OSA0OC4wODI3QzIxLjk4NjUgNDkuMTY0NCAyMC4wNjQ3IDQ4LjUzOTkgMTkuNzI4NiA0Ni45NTg3TDE2LjY0OTYgMzIuNDczM0MxNi4zMTM1IDMwLjg5MiAxNy44MTUyIDI5LjUzOTkgMTkuMzUyNiAzMC4wMzk0TDMzLjQzNjkgMzQuNjE1N1oiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl84MDNfMjAxNDApIi8+CjxwYXRoIGQ9Ik02OC45NzU3IDMyLjQyNjJMNjMuNzgyOSA0MS40MjA1QzYzLjY1ODQgNDEuMjU5MiA2My41MjM2IDQxLjA5NzcgNjMuMzc3NCA0MC45MzgzQzYyLjUwNDggMzkuOTg2NyA2MS4xMzI5IDM5LjAyODcgNTkuMzIwNSAzOC43Njk0TDYyLjU3MTMgMjAuMzMzN0M2Mi42ODQxIDE5LjY5MzYgNjIuNzM2NCAxOS4wNTY4IDYyLjczMjMgMTguNDI5M0w2NS42ODE1IDIwLjEzMkM2OS45ODYxIDIyLjYxNzMgNzEuNDYxIDI4LjEyMTYgNjguOTc1NyAzMi40MjYyWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzgwM18yMDE0MCkiLz4KPHBhdGggZD0iTTU3LjYxODUgMjIuNTA2Nkw1NC41NTU4IDM5Ljg3NkM1NC4wNzQ4IDQwLjIwNDIgNTMuNjY0NCA0MC41NzE5IDUzLjMyODIgNDAuOTM4NkM1Mi40MzcgNDEuOTEwNyA1MS45NjUgNDIuOTYxIDUxLjcyMzMgNDMuNTY4QzUxLjUxMzMgNDQuMDk1NSA1MS4zMzMzIDQ0LjY3ODEgNTEuMTgxOSA0NS4yMzE4TDQ0LjQyMzcgMTMuNDM3MkM0NC4yMzUxIDEyLjU1IDQzLjk2MzQgMTEuNzAxOSA0My42MTg1IDEwLjg5OTJMNTAuMzE4MSAxMi4wODA1QzU1LjIxMzEgMTIuOTQzNyA1OC40ODE3IDE3LjYxMTYgNTcuNjE4NSAyMi41MDY2WiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzgwM18yMDE0MCkiLz4KPHBhdGggZD0iTTU3LjYxNzMgMjIuNTA1OUw1NC41NTQ2IDM5Ljg3NTJDNTQuMDczNSA0MC4yMDM1IDUzLjY2MzIgNDAuNTcxMSA1My4zMjY5IDQwLjkzNzlDNTIuNDM1NyA0MS45MDk5IDUxLjk2MzggNDIuOTYwMyA1MS43MjIxIDQzLjU2NzNDNTEuNTEyMSA0NC4wOTQ4IDUxLjMzMjEgNDQuNjc3MyA1MS4xODA2IDQ1LjIzMUw0NC40MjI1IDEzLjQzNjVDNDQuMjMzOSAxMi41NDkzIDQzLjk2MjIgMTEuNzAxMSA0My42MTcyIDEwLjg5ODRMNTAuMzE2OCAxMi4wNzk4QzU1LjIxMTkgMTIuOTQyOSA1OC40ODA0IDE3LjYxMDggNTcuNjE3MyAyMi41MDU5WiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzgwM18yMDE0MCkiLz4KPHBhdGggZD0iTTY4Ljk3NTUgMzIuNDI2Nkw2My43ODI2IDQxLjQyMDlDNjMuNjU4MiA0MS4yNTk2IDYzLjUyMzMgNDEuMDk4MSA2My4zNzcyIDQwLjkzODdDNjIuNTA0NSAzOS45ODcxIDYxLjEzMjcgMzkuMDI5MSA1OS4zMjAzIDM4Ljc2OThMNjIuNTcxIDIwLjMzNDFDNjIuNjgzOSAxOS42OTQgNjIuNzM2MiAxOS4wNTcyIDYyLjczMjEgMTguNDI5N0w2NS42ODEyIDIwLjEzMjRDNjkuOTg1OSAyMi42MTc3IDcxLjQ2MDggMjguMTIyIDY4Ljk3NTUgMzIuNDI2NloiIGZpbGw9InVybCgjcGFpbnQ0X2xpbmVhcl84MDNfMjAxNDApIi8+CjxjaXJjbGUgY3g9IjUzLjI1IiBjeT0iNTMuMjUiIHI9IjE4Ljc1IiBmaWxsPSIjRjdGN0Y3Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTAuODAxNSA0Mi4wMDM5QzUyLjA2MTMgNDAuNjY1NCA1NC4xODg3IDQwLjY2NTQgNTUuNDQ4NSA0Mi4wMDM5TDY0LjcyOTcgNTEuODY1MUM2NS40NTQzIDUyLjYzNTEgNjUuNDE3NiA1My44NDY3IDY0LjY0NzYgNTQuNTcxM0M2My44Nzc3IDU1LjI5NiA2Mi42NjYxIDU1LjI1OTMgNjEuOTQxNCA1NC40ODkzTDU1LjAzOTUgNDcuMTU2VjY0LjQ3MzNDNTUuMDM5NSA2NS41MzA2IDU0LjE4MjMgNjYuMzg3OCA1My4xMjUgNjYuMzg3OEM1Mi4wNjc3IDY2LjM4NzggNTEuMjEwNSA2NS41MzA2IDUxLjIxMDUgNjQuNDczM1Y0Ny4xNTZMNDQuMzA4NiA1NC40ODkzQzQzLjU4MzkgNTUuMjU5MyA0Mi4zNzIzIDU1LjI5NiA0MS42MDI0IDU0LjU3MTNDNDAuODMyNCA1My44NDY3IDQwLjc5NTcgNTIuNjM1MSA0MS41MjA0IDUxLjg2NTFMNTAuODAxNSA0Mi4wMDM5WiIgZmlsbD0idXJsKCNwYWludDVfbGluZWFyXzgwM18yMDE0MCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl84MDNfMjAxNDAiIHgxPSI0MS4yNSIgeTE9IjY3LjUiIHgyPSI0MS4yNSIgeTI9IjAuNzQ5OTk5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNCRUJFQkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURFREVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl84MDNfMjAxNDAiIHgxPSI0MS4yNSIgeTE9IjY3LjUiIHgyPSI0MS4yNSIgeTI9IjAuNzQ5OTk5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNCRUJFQkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURFREVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl84MDNfMjAxNDAiIHgxPSI0MS4yNSIgeTE9IjY3LjUiIHgyPSI0MS4yNSIgeTI9IjAuNzQ5OTk5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNCRUJFQkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURFREVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl84MDNfMjAxNDAiIHgxPSIyMC4wOTczIiB5MT0iODQuMTczMyIgeDI9IjIwLjA5NzMiIHkyPSItMTUuNTA0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4MTgxODEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURFREVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ0X2xpbmVhcl84MDNfMjAxNDAiIHgxPSI0MS4yNSIgeTE9IjY3LjQ5OSIgeDI9IjQxLjI1IiB5Mj0iMC43NDkwMjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzVCNUI1QiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFREVERUQiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDVfbGluZWFyXzgwM18yMDE0MCIgeDE9IjAuNjU4NjU5IiB5MT0iODguNzgxNCIgeDI9IjAuNjU4NjYiIHkyPSIyMy43ODM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM1QjVCNUIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURFREVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=='
          }
          alt='Upload'
          className={cx('upload-image')}
        />
        <div className={cx('upload-select')}>Select video to upload</div>
        <div className={cx('upload-desc')}>Or drag and drop it here</div>
        <input
          type='file'
          className={cx('upload-input')}
          accept='video/*'
          onChange={handleUpload}
        />
        <div className={cx('upload-label')}>
          <span className={cx('upload-text')}>Select video</span>
        </div>
      </label>
      <div className={cx('upload-footer')}>
        {footerElement.map((element) => (
          <div key={element.header} className={cx('footer-element')}>
            <FontAwesomeIcon
              icon={element.icon}
              className={cx('footer-icon')}
            />
            <div className={cx('footer-container')}>
              <div className={cx('footer-header')}>{element.header}</div>
              <div className={cx('footer-content')}>{element.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UploadAdd.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default UploadAdd;
