import classNames from 'classnames/bind';
import styles from './LoginSubmitButton.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const LoginSubmitButton = ({ disabled, content }) => {
  return (
    <button
      type='submit'
      className={disabled ? cx('input-submit') : cx('input-submit-active')}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

LoginSubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

export default LoginSubmitButton;
