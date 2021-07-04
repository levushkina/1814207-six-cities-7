import React from 'react';
import Header from '../header/header';

function LoadingScreen() {
  return (
    <div className="page">
      <Header/>
      <main className="page__main">
        <div className="container">
          <section>
            <h1>Loading ...</h1>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default LoadingScreen;
