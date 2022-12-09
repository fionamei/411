import {useState} from 'react';
import axios from 'axios';
import {db, auth} from '../index';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import "../style.css";

export default function WeatherPoke() {
    const [data, setData] = useState({}); // initially holding the empty array, setPokemon helps to change its data
    const [zip, setzip] = useState('');


    const fetchData = async (zipcode) => {

      const url = 'http://127.0.0.1:8000/api/get_pokemon_for_location/'+zipcode;
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
  
    function handleChange(event)  {
      setzip(event.target.value);
      fetchData(event.target.value);
    };
    
    return (
    <div>
      <Box sx={{ marginBottom: 2}}>
        <TextField 
          id="input-with-sx" 
          label="Input your Zip Code!" 
          variant="standard" 
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              // Do code here
              handleChange(ev);
              ev.preventDefault();
            }
          }} />
      </Box>
      {'pokemonData' in data &&    
        <Card sx={{display: 'flex', width: 500, marginLeft: 52, marginY: 5}}>
            <Box  sx={{ width: 275 }}>
              <CardContent>
                  <h1>The weather for your current location: {zip}</h1>
                  <p> </p>
                  <h2>Weather: {data.weather}</h2>
                  <h2>Temperature: {data.temperature}°F</h2>
              </CardContent>
            </Box>

            <Divider orientation="vertical" flexItem />

            <div class="poke-info">
                <CardMedia
                  component="img"
                  sx={{ height: 150 }}
                  image={data.pokemonData.image}
                />
                <CardContent>
                  You have caught:
                  <h3>{data.pokemonData.name} (id: {data.pokemonData.id})</h3>
                  Type: {data.pokemonData.type}
                </CardContent>
            </div>
        </Card>
      }
    </div>
    )
  }
  
  