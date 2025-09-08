import { useEffect, useState } from 'react';

const listeners = new Set();

const useAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState(() =>
    localStorage.getItem('tiktokAvatarUrl'),
  );

  useEffect(() => {
    listeners.add(setAvatarUrl);
    return () => listeners.delete(setAvatarUrl);
  }, []);

  const updateAvatar = (newUrl) => {
    console.log(newUrl);
    localStorage.setItem('tiktokAvatarUrl', newUrl);
    setAvatarUrl(newUrl);
    listeners.forEach((listener) => listener(newUrl));
  };

  return { avatarUrl, updateAvatar };
};

export default useAvatar;
