/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';

export const ProfileContext = React.createContext();

export default function ProfileContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [userAvatar, setUserAvatar] = useState({
    path: `${userInfo.avatar}`,
  });
  const [form, setForm] = useState({});
  const [img, setImg] = useState(null);
  useEffect(() => {
    fetch('http://localhost:6622/api/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        setForm(data);
      });
  }, []);

  const value = useMemo(() => ({
    userInfo, setUserInfo, form, setForm, userAvatar, setUserAvatar, img, setImg,
  }));

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
