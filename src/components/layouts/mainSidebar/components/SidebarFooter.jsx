import styles from './SideBarFooter.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useFinding } from '../../../../hooks/FindingContext';

const cx = classNames.bind(styles);

const buttons = [
  {
    label: 'Company',
    content: (
      <div className={cx('sidebar-footer-tiktok')}>
        <div>About Newsroom Contact Careers</div>
      </div>
    ),
  },
  {
    label: 'Program',
    content: (
      <div className={cx('sidebar-footer-tiktok')}>
        <div>Tiktok for good Advised</div>
        <div>Sell on Tiktok</div>
        <div>Tiktok LIVE Creator Networks</div>
        <div>Deverlopers Transparency</div>
        <div>Tiktok Embeds</div>
        <div>SoundOn Music Distribution</div>
        <div>Tiktok Live Tiktok Shop</div>
        <div>Tiktok Video Download</div>
      </div>
    ),
  },
  {
    label: 'Term & Policies',
    content: (
      <div className={cx('sidebar-footer-tiktok')}>
        <div>Help Safety Terms Privacy Policy</div>
        <div>Accessibility Privacy Center</div>
        <div>Create Academy</div>
        <div>Community Guidelines Copyright</div>
        <div>Law Enforcement Guidelines</div>
      </div>
    ),
  },
];

const SidebarFooter = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [active, setActive] = useState(false);

  const { isFinding } = useFinding();

  const handleClick = (index) => {
    if (index == activeIndex) {
      setActive(false);
      setActiveIndex(-1);
    } else {
      setActive(true);
      setActiveIndex(index);
    }
  };
  return (
    <>
      {!isFinding && (
        <div
          className={
            active ? cx('sidebar-footer-active') : cx('sidebar-footer')
          }
        >
          {buttons.map((button, index) => (
            <div key={button.label}>
              <button
                onClick={() => handleClick(index)}
                className={
                  index == activeIndex
                    ? cx('button-active')
                    : cx('button-nonactive')
                }
              >
                {button.label}
              </button>
              {activeIndex == index && button.content}
            </div>
          ))}
          <div className={cx('sidebar-footer-tiktok')}>
            <FontAwesomeIcon icon={faC} />
            2025 tiktok
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarFooter;
