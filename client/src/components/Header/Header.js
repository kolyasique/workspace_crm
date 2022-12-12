/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useContext, useState } from 'react';
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
  const {
    dateNow, convertDate1,
  } = useContext(UserContext);
  const [mainOrProfile, setMainOrProfile] = useState(true);
  const { user } = useSelector((store) => store.userStore);
  console.log('🚀🚀🚀🚀 =>>>>> file: Header.js:17 =>>>>> Navbar =>>>>> user', user);

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

  const handleButtonChange = () => {
    setMainOrProfile(!mainOrProfile);
  };
  // const handleChange = (e) => {
  //   dispatch(startFilterCandidatesAC(e.target.value));
  // };
  return (

    <div className={cl.header}>
      {user === null && (
        <>
          <img className={cl.navlogo} src={logoWS} alt="workspace" onClick={() => navigate('/')} />
          <Link to="/login"><button className={cl.logoutBtn} type="button">Вход</button></Link>
        </>
      )}
      {(user?.company_id === undefined && user) && (
        <>
          <img className={cl.navlogo} src={logoWS} alt="workspace" />
          <div />
          <button className={cl.logoutBtn} type="button" onClick={handleLogout}>Выйти</button>
        </>
      )}

      {/* {user
      && (
        <>
          <Link to="/profile"><button type="button" className={cl.logoutBtn}>Profile</button></Link>
          <button className={cl.logoutBtn} type="button" onClick={handleLogout}>SignOut</button>
        </>
      )} */}

      {user?.company_id !== undefined && (
        <>
          <img className={cl.navlogo} src={logoWS} alt="workspace" onClick={() => navigate('/workerpage')} />
          <div />
          <div className={cl.dateNow}>
            {dateNow === null ? (`${convertDate1(new Date())}`) : (`${convertDate1(new Date(dateNow))}`)}
          </div>
          <div className={cl.menuBtns}>
            {mainOrProfile ? (
              <Link to="/profile"><button type="button" className={cl.logoutBtn} onClick={handleButtonChange}>Профиль</button></Link>
            ) : (
              <Link to="/workerpage"><button type="button" className={cl.logoutBtn} onClick={handleButtonChange}>Главная</button></Link>
            )}

            <button className={cl.logoutBtn} type="button" onClick={handleLogout}>Выйти</button>
          </div>
        </>
      )}
    </div>
  );
}
