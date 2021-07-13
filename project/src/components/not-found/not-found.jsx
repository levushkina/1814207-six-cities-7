import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';


function NotFound() {
  return (
    <div className="page">
      <Header/>
      <main className="page__main">
        <div className="container">
          <h2>Page not found!</h2>
          <Link to="/">Back to main page</Link>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default NotFound;
