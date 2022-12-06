/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import StartPage from './components/StartPage/StartPage';

import { startUserSigninAC } from './store/actions/userActions';
import MainPageCompany from './components/MainPageCompany/MainPageCompany';
import Login from './components/Login/Login';
import AuthForm from './components/AuthForm/AuthForm';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);
  const { loading } = useSelector((store) => store.globalStore);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    dispatch(startUserSigninAC(signal));

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    loading ? (
      <div className="spinner-container">
        <img className="spinner" src="https://i.pinimg.com/originals/e2/eb/9e/e2eb9e845ff87fb8fac15f72359efb10.gif" alt="spinner" />
      </div>
    )
      : (
        <div>
          <Header />
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<AuthForm />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          </Routes>
          {user
            ? (
              <MainPageCompany />
            ) : <StartPage />}
            <Footer />
        </div>
      )

  );
}

export default App;
