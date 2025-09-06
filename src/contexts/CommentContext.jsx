import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
  const [showComment, setShowComment] = useState(false);
  const [numComment, setNumComment] = useState(0);

  const value = useMemo(
    () => ({ showComment, setShowComment, numComment, setNumComment }),
    [showComment, numComment],
  );

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useComment = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error('useComment must be used inside CommentProvider');
  return ctx;
};
