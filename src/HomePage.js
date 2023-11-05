import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; // Import Materialize JS
import './App.css';
function HomePage() {


  return (
    <div className='bg'>
    <div className="container">
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card-panel z-depth-3 blue-grey darken-3">
            <h2 className="white-text center-align">Welcome to timeFrame</h2>
            <p className="white-text center-align">Your Personal Time Management Assistant</p>
            <div className="center-align">
            <a href="/signup" className="waves-effect waves-light btn-large pulse">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
