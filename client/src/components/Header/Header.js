/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { startFilterCandidatesAC } from '../../store/actions/candidateActions';
import { userSignoutAC } from '../../store/actions/userActions';
import cl from './Header.module.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);

  const handleLogout = useCallback(() => {
    fetch(
      'http://localhost:6622/api/auth/signout',
      { credentials: 'include' },
    ).then((res) => {
      if (res.status === 200) { dispatch(userSignoutAC(null)); }
    });
  }, []);

  // const handleChange = (e) => {
  //   dispatch(startFilterCandidatesAC(e.target.value));
  // };
  return (
    <div className={cl.header}>
      <img className={cl.navlogo} src="https://w7.pngwing.com/pngs/510/957/png-transparent-price-discounts-and-allowances-brand-logo-cheap-price-text-logo-publishing.png" alt="nav-logo-beaver" />
      {user && <button className={cl.navlogout} type="button" onClick={handleLogout}>SignOut</button> }

    </div>
  );
}
