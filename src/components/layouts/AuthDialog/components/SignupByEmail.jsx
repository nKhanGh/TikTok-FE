import classNames from 'classnames/bind';
import styles from './SignupByEmail.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const typeSelections = {
  null: 'null',
  day: 'day',
  month: 'month',
  year: 'year',
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SignupByEmail = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [checked, setChecked] = useState(false);
  const [typeSelected, setTypeSelected] = useState(typeSelections.null);
  const dateRef = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (dateRef.current && !dateRef.current.contains(e.target))
        setTypeSelected(typeSelected.null);
    };

    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  const getDaysInMonth = (year, month) => {
    if (!year || !month) return 31;
    return new Date(year, month, 0).getDate();
  };
  return (
    <form onSubmit={() => {}} className={cx('wrapper')}>
      <div className={cx('birthday-container')}>
        <div className={cx('birthday-header')}>When's your birthday?</div>
        <div className={cx('date-container')} ref={dateRef}>
          <div style={{ position: 'relative' }}>
            <button
              type='button'
              className={cx('date-select')}
              onClick={() =>
                setTypeSelected(
                  typeSelections.year === typeSelected
                    ? typeSelections.null
                    : typeSelections.year,
                )
              }
            >
              {year || 'year'}
            </button>
            {typeSelected === typeSelections.year && (
              <div className={cx('date-option-container')}>
                {Array.from(
                  { length: new Date().getFullYear() - 1990 },
                  (_, i) => i + 1991,
                )
                  .reverse()
                  .map((y) => (
                    <button
                      className={cx('date-option-element')}
                      onClick={() => {
                        setYear(y);
                        setTypeSelected(typeSelections.null);
                      }}
                    >
                      {y}
                    </button>
                  ))}
              </div>
            )}
            <FontAwesomeIcon
              className={cx('date-select-icon')}
              icon={faCaretDown}
              style={
                typeSelected === typeSelections.year
                  ? { transform: 'rotate(180deg)' }
                  : {}
              }
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button
              type='button'
              className={cx('date-select')}
              onClick={() =>
                setTypeSelected(
                  typeSelections.month === typeSelected
                    ? typeSelections.null
                    : typeSelections.month,
                )
              }
            >
              {month ? months[month - 1] : 'month'}
            </button>
            {typeSelected === typeSelections.month && (
              <div className={cx('date-option-container')}>
                {months.map((m, i) => (
                  <button
                    type='button'
                    className={cx('date-option-element')}
                    onClick={() => {
                      setMonth(i + 1);
                      setTypeSelected(typeSelections.null);
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
            <FontAwesomeIcon
              className={cx('date-select-icon')}
              icon={faCaretDown}
              style={
                typeSelected === typeSelections.month
                  ? { transform: 'rotate(180deg)' }
                  : {}
              }
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button
              type='button'
              className={cx('date-select')}
              onClick={() =>
                setTypeSelected(
                  typeSelections.day === typeSelected
                    ? typeSelections.null
                    : typeSelections.day,
                )
              }
            >
              {day || 'Day'}
            </button>
            {typeSelected === typeSelections.day && (
              <div className={cx('date-option-container')}>
                {Array.from(
                  { length: getDaysInMonth(year, month) },
                  (_, i) => i + 1,
                ).map((d) => (
                  <button
                    className={cx('date-option-element')}
                    onClick={() => {
                      setDay(d);
                      setTypeSelected(typeSelections.null);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
            <FontAwesomeIcon
              className={cx('date-select-icon')}
              icon={faCaretDown}
              style={
                typeSelected === typeSelections.day
                  ? { transform: 'rotate(180deg)' }
                  : {}
              }
            />
          </div>
        </div>
        <div className={cx('birthday-footer')}>
          Your birthday won't be shown publicly.
        </div>
      </div>
      <div className={cx('email-container')}>
        <div className={cx('email-header')}>Email</div>
        <input
          type='text'
          className={cx('input-element')}
          placeholder='Email address'
        />
        <input
          type='password'
          className={cx('input-element')}
          placeholder='Password'
        />
        <div className={cx('password-description')}>
          <div className={cx('password-description-headed')}>
            Your password must have:
          </div>
          <div className={cx('password-description-content')}>
            8 to 20 characters
          </div>
          <div className={cx('password-description-content')}>
            Letters, numbers, and special characters
          </div>
        </div>
        <div className={cx('email-code')}>
          <input
            type='text'
            placeholder='Enter 6-digit code'
            className={cx('email-code-input')}
          />
          <button type='button' className={cx('email-code-button')}>
            Send code
          </button>
        </div>
        <div className={cx('signup-check')}>
          <input
            id='checkbox-signup'
            className={cx('signup-check-button')}
            type='checkbox'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label
            htmlFor='checkbox-signup'
            className={cx('signup-check-content')}
          >
            Get trending content, newsletters, promotions, recommendations, and
            account updates sent to your email
          </label>
        </div>
      </div>
      <button className={cx('signup-submit')} type='submit'>
        Next
      </button>
    </form>
  );
};

export default SignupByEmail;
