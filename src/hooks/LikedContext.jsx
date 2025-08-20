import { useContext, useState, createContext } from 'react';

const LikedContext = createContext(null);

export const LikedProvider = ({ children }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLiked, setNumLiked] = useState(0);

  return (
    <LikedContext.Provider
      value={{ isLiked, setIsLiked, numLiked, setNumLiked }}
    >
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const ctx = useContext(LikedContext);
  if (!ctx) throw new Error('useLiked must be used inside LikedProvider');
  return ctx;
};
