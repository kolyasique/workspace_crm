/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './StartPage.css';
// import AuthForm from '../AuthForm/AuthForm';

export default function StartPage() {
  return (
    <div>
      <div className="description1">
        <h1>Легче - не тяжелее!</h1>
        <p> Управлять задачами, ослеживать производительность сотрудников и быть в курсе статуса каждого клиента - теперь легко! Ничего лишнего, только добрый запас чая </p>
        <Link to="/reg"><button className="shop" type="button">Зарегистрироваться</button></Link>
      </div>
      <Footer />
    </div>
  );
}
