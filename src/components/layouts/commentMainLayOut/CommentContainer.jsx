import classNames from 'classnames/bind';
import styles from './CommentContainer.module.scss';
import { useComment } from '../../../hooks/CommentContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faEllipsis,
  faFaceSmile,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import avatar from './avatar.png';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

const commentList = [
  {
    name: 'khang1',
    content: 'Messi or Nguyen Huu Khang is the goat of football?',
    timePost: Date.now,
  },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
  { name: 'khang1', content: 'MEssiiiiiiii', timePost: Date.now },
];

const CommentContainer = () => {
  const { showComment, setShowComment, numComment, setNumComment } =
    useComment();
  const [comment, setComment] = useState('');
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={showComment}
      timeout={400}
      classNames={{
        enter: cx('comment-enter'),
        enterActive: cx('comment-enter-active'),
        exit: cx('comment-exit'),
        exitActive: cx('comment-exit-active'),
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div ref={nodeRef} className={cx('comment-container')}>
        <div className={cx('comment-header')}>
          <div className={cx('comment-header-content')}>
            Comments ({numComment})
          </div>
          <button
            className={cx('comment-header-button')}
            onClick={() => setShowComment(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className={cx('comment-list')}>
          {commentList.map((comment, index) => (
            <div key={index} className={cx('comment-element')}>
              <img src={avatar} alt='Khang' className={cx('comment-avatar')} />
              <div className={cx('comment-info')}>
                <div className={cx('comment-name')}>{comment.name}</div>
                <div className={cx('comment-content')}>{comment.content}</div>
                <div className={cx('comment-footer')}>
                  <div className={cx('comment-time')}>
                    {comment.timePost} ago
                  </div>
                  <button className={cx('comment-reply')}>Reply</button>
                </div>
              </div>
              <div className={cx('comment-interaction')}>
                <div className={cx('comment-report-wrapper')}>
                  <button className={cx('comment-report')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </div>
                <button className={cx('comment-heart')}>
                  <FontAwesomeIcon icon={faHeart} />
                  {' ' + 0}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={cx('footer')}>
          <div className={cx('footer-content')}>
            <input
              type='text'
              className={cx('comment-add')}
              placeholder='Add comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className={cx('comment-tag', 'comment-icon')}>@</button>
            <button className={cx('comment-emoji', 'comment-icon')}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button className={cx('comment-post')}>Post</button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CommentContainer;
