/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
// import Footer from '../Footer/Footer';
import './StartPage.css';
// import AuthForm from '../AuthForm/AuthForm';
// import AlignItemsList from '../TabPanelUser/UI/Chat/Chat';

export default function StartPage() {
  return (
    <div>
      <div className="description1">
        <h1>Легче - не тяжелее!</h1>
        <p> WorkSpace4U - рабочее пространство, где управлять задачами, ослеживать производительность сотрудников и контролировать задачи по каждому клиенту - легко! </p>
        <Link to="/reg"><button className="shop" type="button">Get started for free!</button></Link>
        {/* <AlignItemsList /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
