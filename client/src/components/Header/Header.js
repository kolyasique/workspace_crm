/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { startFilterCandidatesAC } from '../../store/actions/candidateActions';
import { userSignoutAC } from '../../store/actions/userActions';
import cl from './Header.module.css';
import logoWS from './logoWS.png';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userStore);

  const handleLogout = useCallback(() => {
    fetch(
      'http://localhost:6622/api/auth/signout',
      { credentials: 'include' },
    ).then((res) => {
      if (res.status === 200) { dispatch(userSignoutAC(null)); }
      try {
        navigate('/');
      } catch (error) {
        navigate('/main');
      }
    });
  }, []);

  // const handleChange = (e) => {
  //   dispatch(startFilterCandidatesAC(e.target.value));
  // };
  return (

    <div className={cl.header}>
      <img className={cl.navlogo} src={logoWS} alt="workspace" />
      {user ? (
        <> </>
      ) : (
        <>
          <Link to="/login"><button className="nav-logout" type="button">Вход для сотрудника</button></Link>
          <Link to="/loginAdmin"><button className="nav-logout" type="button">Вход для Админа</button></Link>
        </>
      )}
      {user && <button className={cl.navlogout} type="button" onClick={handleLogout}>SignOut</button> }

    </div>
  );
}
