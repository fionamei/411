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
import PokeListInfo from './pages/pokemonListInfo';

function App() {

return(
  <div className="App">
        <Login />
        <h1>Welcome to WeatherMon!</h1>
        <WeatherPoke />
        <PokeListInfo />
      </div>
  )
  
}

export default App;