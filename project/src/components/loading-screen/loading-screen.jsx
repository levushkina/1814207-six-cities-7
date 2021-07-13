import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';


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
      <Footer/>
    </div>
  );
}

export default LoadingScreen;
