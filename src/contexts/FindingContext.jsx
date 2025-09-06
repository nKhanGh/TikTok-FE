import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const FindingContext = createContext(null);

export const FindingProvider = ({ children }) => {
  const [isFinding, setIsFinding] = useState(false);

  const value = useMemo(
    () => ({
      isFinding,
      setIsFinding,
    }),
    [isFinding],
  );

  return (
    <FindingContext.Provider value={value}>{children}</FindingContext.Provider>
  );
};

FindingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFinding = () => {
  const ctx = useContext(FindingContext);
  if (!ctx) throw new Error('useFinding must be used inside FindingProvider');
  return ctx;
};
