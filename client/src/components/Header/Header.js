/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
// import { startFilterCandidatesAC } from '../../store/actions/candidateActions';
import { userSignoutAC } from '../../store/actions/userActions';
import cl from './Header.module.css';
import logoWS from './logoWS.png';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dateNow, convertDate1 } = useContext(UserContext);
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
      <div />
      {user ? (
        <div>
          {dateNow === null ? (`${convertDate1(new Date())}`) : (`${convertDate1(new Date(dateNow))}`)}
        </div>
      ) : (
        <Link to="/login"><button className={cl.logoutBtn} type="button">Вход</button></Link>
      )}
      {user
      && (
        <>
          <Link to="/profile"><button type="button" className={cl.logoutBtn}>Profile</button></Link>
          <button className={cl.logoutBtn} type="button" onClick={handleLogout}>SignOut</button>
        </>
      )}

    </div>
  );
}
