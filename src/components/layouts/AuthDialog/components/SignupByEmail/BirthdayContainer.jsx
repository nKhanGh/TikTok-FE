import classNames from 'classnames/bind';
import styles from './BirthdayContainer.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

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

const BirthdayContainer = ({ year, month, day, setYear, setMonth, setDay }) => {
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
            {year || 'Year'}
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
                    key={y}
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
            {month ? months[month - 1] : 'Month'}
          </button>
          {typeSelected === typeSelections.month && (
            <div className={cx('date-option-container')}>
              {months.map((m, i) => (
                <button
                  key={m}
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
                  key={d}
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
  );
};

BirthdayContainer.propTypes = {
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  setDay: PropTypes.func.isRequired,
};

export default BirthdayContainer;
