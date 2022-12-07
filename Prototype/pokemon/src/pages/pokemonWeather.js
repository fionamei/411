import {useState} from 'react';
import axios from 'axios';
import {db, auth} from '../index';
import { doc, getDocs, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc} from "firebase/firestore";


export default function WeatherPoke() {
    const [data, setData] = useState({}); // initially holding the empty array, setPokemon helps to change its data
    const [zip, setzip] = useState('');


    const fetchData = async () => {

      const url = 'http://127.0.0.1:8000/api/get_pokemon_for_location/'+zip;
      const user = auth.currentUser;

      axios.get(url)
        .then(res => {
          if (res.data.status === true) {
            setData(res.data);
            const pokemonref = doc(db, "userdata", user.uid);
            updateDoc(pokemonref, {
              pokemonIDs: arrayUnion(res.data.pokemonData.id)
            });
          } else {
              setData([])
              alert("Invalid pokemon")
            }
          })
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
  
  