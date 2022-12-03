import React, { Component, useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import fbLogin from "./services/fblogin.js"
// import googleLogin from "./services/googlelogin.js"
import './App.css';
 // managing the data
import axios from 'axios';
import Login from './login';
import PokeInfo from './pokemonapitest';

function App() {
  //pokemon is a variable which holds the data
  const [data, setData] = useState({}); // initially holding the empty array, setPokemon helps to change its data
  const [zip, setzip] = useState('');

  // useEffect(() => {
  //   fetchData()
  //     .catch(console.error);;
  // }, [pokemon])
  // functions are  reusable piece of code
  const fetchData = async () => {
    // async means it will run in background
    const url = 'http://127.0.0.1:8000/api/get_pokemon_for_location/'+zip;
    // const data = await fetch(url);
    // const json = await data.json();
    // console.log(json)

    // setpokemon(json.pokemonData.name);
    axios.get(url)
      .then(res => {
        if (res.data.status === true) {
          
          setData(res.data);
        } else {
          setData([])
          alert("Invalid pokemon")
        }
      })
  };

  // click, dblclick, typing in textbox are types of events
  // current event is onchange
  const handleChange = event => {
    // it will get the value from event and set it to name using setname
    setzip(event.target.value);
  };
  
return(
  <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>
        <Login />
        <PokeInfo />
      </div>
      }

  </div>)

  
    
  
}

export default App;