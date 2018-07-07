import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import logo from '../images/logo.png'

import '../styles/App.css';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import HomeNav from './HomeNav';


class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <center>
          <Image src={logo} className="Home-logo"/>
          <article className="Home-intro">
          <h2>Welcome to Serge!</h2>
          <p>Serge to system zarządzania magazynem napisany na potrzeby niewielkiego wirtualnego centrum logistycznego wzorowanego na duńskim centrum logistycznym, w którym autor pracował przez kilka dni latem 2014 roku.</p>
<p>Magazyn, o którym mowa, jest handlowym centrum konsolidacyjnym wybudowanym na potrzeby sieci największych hipermarketów i zajmuje się realizacją względnie stałych zamówień na potrzeby poszczególnych lokalnych punktów handlowych obsługiwanych przez ten magazyn.</p>
          </article>

          <HomeNav />
        </center>
      </div>
    );
  }
}

export default Home;
