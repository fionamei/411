import React, { Component, useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import fbLogin from "./services/fblogin.js"
// import googleLogin from "./services/googlelogin.js"
import './App.css';
 // managing the data
import axios from 'axios';
import Login from './pages/login';
import PokeInfo from './pages/pokemonapitest';
import WeatherPoke from './pages/pokemonWeather';

function App() {

return(
  <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>
        <Login />
        <WeatherPoke />
      </div>
  )
  
}

export default App;