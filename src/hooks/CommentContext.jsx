import { createContext, useContext, useState } from 'react';

const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
  const [showComment, setShowComment] = useState(false);
  const [numComment, setNumComment] = useState(0);
  return (
    <CommentContext.Provider
      value={{ showComment, setShowComment, numComment, setNumComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error('useComment must be used inside CommentProvider');
  return ctx;
};
