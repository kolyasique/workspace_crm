/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StartPage from './components/StartPage/StartPage';

import MainPageCompany from './components/MainPageCompany/MainPageCompany';
import Login from './components/Login/Login';
import AuthForm from './components/AuthForm/AuthForm';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import MainPageUser from './components/MainPageUser/MainPageUser';
import 'react-toastify/dist/ReactToastify.css';
import SocketContextProvider from './context/Socket.context';
import UserContextProvider from './context/User.context';
import Profile from './components/Profile/Profile';
import ProfileContextProvider from './context/Profile.context';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);
  const { loading } = useSelector((store) => store.globalStore);
  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:6622/api/auth', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'USER_SIGNIN', payload: res.user });
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch(console.error);

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    loading ? (
    <div className="spinner-container">
    <div className="lds-ripple">
<div />
<div />
    </div>
    </div>
    )
      : (
        <div className="bodyApp">
          <Header />
          {user
            ? (
              <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/adminpage" element={<MainPageCompany />} />
              <Route path="/profile" element={<ProfileContextProvider><Profile /></ProfileContextProvider>} />
              <Route path="/workerpage" element={<SocketContextProvider><MainPageUser /></SocketContextProvider>} />
              <Route path="/login" element={<Login />} />
              </Routes>
            ) : (
              <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reg" element={<AuthForm />} />
              </Routes>
            )}
            <ToastContainer />
        </div>
      )
  );
}

export default App;
