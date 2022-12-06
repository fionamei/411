import {useState} from 'react';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, arrayUnion, setDoc} from "firebase/firestore";


export default function WeatherPoke() {
    const [data, setData] = useState({}); // initially holding the empty array, setPokemon helps to change its data
    const [zip, setzip] = useState('');

  
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
      const firebaseConfig = {
        apiKey: "AIzaSyCFSwqeLKS3e8nebyFsOWCnzE6eqRLQ-xo",
        authDomain: "weathermon-370220.firebaseapp.com",
        projectId: "weathermon-370220",
        storageBucket: "weathermon-370220.appspot.com",
        messagingSenderId: "479306296760",
        appId: "1:479306296760:web:bc86e82cc1c7bbd463b34d",
        measurementId: "G-Y0VKT2KBTW"
      };
        
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(app);
    
      const auth = getAuth();
      const user = auth.currentUser;
      const pokemonref = doc(db, "userdata", user.uid);

      // // Atomically add a new region to the "regions" array field.
      updateDoc(pokemonref, {
        pokemonIDS: arrayUnion(data.pokemonData.id)
      });
    };
  
    const handleChange = event => {
      // it will get the value from event and set it to name using setname
      setzip(event.target.value);
    };
    
    return (
    <div>
      <input value={zip} onChange={handleChange} />
      {zip && <button onClick={fetchData}>Click</button>}
          {'pokemonData' in data && <div>
            <h2>Pokemon: {data.pokemonData.name}</h2>
            <h2>Image: <img src={data.pokemonData.image}/> </h2>
            <h2>Id: {data.pokemonData.id}</h2>
            <h2>Type: {data.pokemonData.type}</h2>
            <h2>Weather: {data.weather}</h2>
            <h2>Temperature: {data.temperature}</h2>
            </div>
            }
    </div>
    )
  }
  
  