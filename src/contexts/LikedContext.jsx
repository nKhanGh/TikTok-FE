import { useContext, useState, createContext, useMemo } from 'react';

const LikedContext = createContext(null);

export const LikedProvider = ({ children }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLiked, setNumLiked] = useState(0);

  const value = useMemo(
    () => ({ isLiked, setIsLiked, numLiked, setNumLiked }),
    [isLiked, numLiked],
  );

  return (
    <LikedContext.Provider value={value}>{children}</LikedContext.Provider>
  );
};

export const useLiked = () => {
  const ctx = useContext(LikedContext);
  if (!ctx) throw new Error('useLiked must be used inside LikedProvider');
  return ctx;
};
