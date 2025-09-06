import classNames from 'classnames/bind';
import styles from './CommentContainer.module.scss';
import { useComment } from '../../../contexts/CommentContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faClose,
  faEllipsis,
  faFaceSmile,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import useAxios from '../../../service/useAxios';

const cx = classNames.bind(styles);
const PAGE_SIZE = 20;
const replies_step = 3;

const CommentContainer = ({ videoId }) => {
  const { showComment, setShowComment, numComment, setNumComment } =
    useComment();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [replying, setReplying] = useState('');
  const [reply, setReply] = useState('');
  const [visibleRepliesMap, setVisibleRepliesMap] = useState({});

  const nodeRef = useRef(null);
  const loadMoreRef = useRef(null);
  const axiosInstance = useAxios();

  const timeAgo = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffMs = now - createdAt;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    if (diffWeek < 4) return `${diffWeek}w ago`;

    const day = createdAt.getDate();
    const month = createdAt.getMonth() + 1;
    const year = createdAt.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const postComment = async (e, parentId) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        `/comments/${videoId}`,
        {
          content: parentId ? reply : comment,
          parentCommentId: parentId ?? null,
        },
        { skipAuth: false },
      );
      setComment('');
      fetchComment();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComment = async (curPage = page) => {
    try {
      const response = await axiosInstance.get(
        `/comments/byVideo/${videoId}?page=${curPage}&size=${PAGE_SIZE}`,
      );
      const result = response?.data?.result;
      setComments((prev) => {
        const merged = [...prev, ...result.comments];
        const unique = Array.from(
          new Map(merged.map((c) => [c.id, c])).values(),
        );
        return unique;
      });
      result.comments.forEach((comment) => {
        if (comment.repliesCount && comment.repliesCount !== 0) {
          setVisibleRepliesMap((prev) => ({
            ...prev,
            [comment.id]: {
              totalComment: comment.repliesCount,
              renderedComment: prev[comment.id]?.renderedComment || 0,
              nextPage: 0,
              hasMore: true,
              isShow: false,
              repliesList: [],
            },
          }));
        }
      });
      setHasMore(result.hasMore);
      setPage(result.nextPage);
      if (numComment !== result.numComments) setNumComment(result?.numComments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplies = async (commentId) => {
    if (!visibleRepliesMap[commentId].hasMore) return;
    try {
      const page = visibleRepliesMap[commentId].nextPage;
      const response = await axiosInstance.get(
        `/comments/replies/${commentId}?page=${page}&size=${replies_step}`,
      );
      const result = response.data.result;
      console.log(result);
      setVisibleRepliesMap((prev) => ({
        ...prev,
        [commentId]: {
          renderedComment:
            prev[commentId].renderedComment + result.comments.length,
          nextPage: result.nextPage,
          hasMore: result.hasMore,
          isShow: true,
          repliesList: [...prev[commentId].repliesList, ...result.comments],
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const hideReplies = (commentId) => {
    setVisibleRepliesMap((prev) => ({
      ...prev,
      [commentId]: {
        totalComment: comment.repliesCount,
        renderedComment: prev[comment.id]?.renderedComment || 0,
        nextPage: 0,
        hasMore: true,
        isShow: false,
        repliesList: [],
      },
    }));
  };

  const resetAndFetch = useCallback(() => {
    if (!videoId) return;

    setPage(0);
    setHasMore(true);
    setComments([]);

    fetchComment(0);
  }, [videoId]);

  useEffect(() => {
    resetAndFetch();
  }, [resetAndFetch]);

  useEffect(() => {
    if (!videoId || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && page !== 0) {
          fetchComment();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [videoId, hasMore, fetchComment]);

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
          {comments
            ?.filter((comment) => comment.parentComment === null)
            .map((comment) => (
              <div key={comment.id} className={cx('comment-element')}>
                <div className={cx('comment-element-info')}>
                  <img
                    src={comment.userPost.avatarUrl}
                    alt='Khang'
                    className={cx('comment-avatar')}
                  />
                  <div className={cx('comment-info')}>
                    <div className={cx('comment-name')}>
                      {comment.userPost.name}
                    </div>
                    <div className={cx('comment-content')}>
                      {comment.content}
                    </div>
                    <div className={cx('comment-footer')}>
                      <div className={cx('comment-time')}>
                        {timeAgo(comment.createAt)}
                      </div>
                      <button
                        className={cx('comment-reply-button')}
                        onClick={() =>
                          setReplying(replying === comment.id ? '' : comment.id)
                        }
                      >
                        Reply
                      </button>
                      <button className={cx('comment-heart')}>
                        <FontAwesomeIcon icon={faHeart} />
                        {' ' + 0}
                      </button>
                    </div>
                  </div>
                  <button className={cx('comment-report')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </div>
                {replying === comment.id && (
                  <form
                    className={cx('comment-reply')}
                    style={{ paddingLeft: '52px', marginBottom: '16px' }}
                  >
                    <input
                      type='text'
                      style={{ width: '212px' }}
                      className={cx('comment-add')}
                      placeholder='Add a reply...'
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                      type='button'
                      className={cx('comment-tag', 'comment-icon')}
                      style={{ right: '140px' }}
                    >
                      @
                    </button>
                    <button
                      type='button'
                      className={cx('comment-emoji', 'comment-icon')}
                      style={{ right: '112px' }}
                    >
                      <FontAwesomeIcon icon={faFaceSmile} />
                    </button>
                    <button
                      className={cx('comment-post')}
                      type='submit'
                      onClick={(e) => postComment(e, comment.id)}
                      disabled={reply.length === 0}
                      style={{ marginRight: '16px' }}
                    >
                      Post
                    </button>
                    <button
                      className={cx('reply-cancel')}
                      onClick={() => setReplying('')}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </form>
                )}
                {visibleRepliesMap[comment.id]?.isShow &&
                  visibleRepliesMap[comment.id].repliesList.map((reply) => (
                    <div
                      key={reply.id}
                      className={cx('comment-element-info')}
                      style={{ marginLeft: '52px' }}
                    >
                      <img
                        src={reply.userPost.avatarUrl}
                        alt='Khang'
                        className={cx('comment-avatar')}
                      />
                      <div
                        className={cx('comment-info')}
                        style={{ width: '268px' }}
                      >
                        <div className={cx('comment-name')}>
                          {reply.userPost.name}
                        </div>
                        <div className={cx('comment-content')}>
                          {reply.content}
                        </div>
                        <div className={cx('comment-footer')}>
                          <div className={cx('comment-time')}>
                            {timeAgo(reply.createAt)}
                          </div>
                          <button
                            className={cx('comment-reply-button')}
                            onClick={() =>
                              setReplying(replying === reply.id ? '' : reply.id)
                            }
                          >
                            Reply
                          </button>
                          <button className={cx('comment-heart')}>
                            <FontAwesomeIcon icon={faHeart} />
                            {' ' + 0}
                          </button>
                        </div>
                      </div>
                      <button className={cx('comment-report')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </button>
                    </div>
                  ))}
                {comment.repliesCount !== 0 &&
                  (visibleRepliesMap[comment.id].hasMore ? (
                    <button
                      className={cx('comment-more')}
                      onClick={() => fetchReplies(comment.id)}
                    >
                      ---- View{' '}
                      {comment.repliesCount -
                        visibleRepliesMap[comment.id].renderedComment}{' '}
                      replies
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                  ) : (
                    <button
                      className={cx('comment-more')}
                      onClick={() => hideReplies(comment.id)}
                    >
                      ---- Hide
                      <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                  ))}
              </div>
            ))}
          <div ref={loadMoreRef} style={{ height: '1px' }}></div>
        </div>
        <div className={cx('footer')}>
          <form className={cx('footer-content')}>
            <input
              type='text'
              className={cx('comment-add')}
              placeholder='Add comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type='button' className={cx('comment-tag', 'comment-icon')}>
              @
            </button>
            <button
              type='button'
              className={cx('comment-emoji', 'comment-icon')}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button
              className={cx('comment-post')}
              type='submit'
              onClick={postComment}
              disabled={comment.length === 0}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

CommentContainer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default CommentContainer;
