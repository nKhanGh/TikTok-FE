import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [isFollowedMap, setIsFollowedMap] = useState({});

  const updateFollow = (userId, isFollowed) => {
    setIsFollowedMap((prev) => ({
      ...prev,
      [userId]: isFollowed,
    }));
  };

  const value = useMemo(
    () => ({
      isFollowedMap,
      updateFollow,
    }),
    [isFollowedMap],
  );

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
};

FollowProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFollow = () => {
  const ctx = useContext(FollowContext);
  if (!ctx)
    throw new Error('Follow context must be used inside FollowProvider');
  return ctx;
};
