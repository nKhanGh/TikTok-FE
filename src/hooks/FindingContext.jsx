import { createContext, useContext, useState } from 'react';

const FindingContext = createContext(null);

export const FindingProvider = ({ children }) => {
  const [isFinding, setIsFinding] = useState(false);

  return (
    <FindingContext.Provider value={{ isFinding, setIsFinding }}>
      {children}
    </FindingContext.Provider>
  );
};

export const useFinding = () => {
  const ctx = useContext(FindingContext);
  if (!ctx) throw new Error('useFinding must be used inside FindingProvider');
  return ctx;
};
