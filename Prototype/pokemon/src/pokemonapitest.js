import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {
  const [pokemon, setpokemon] = useState([]);
  const [name, setname] = useState('');
  const hi = true
  // useEffect(() => {
  //   fetchData()
  //     .catch(console.error);;
  // }, [pokemon])

  const fetchData = async () => {
    const url = 'http://127.0.0.1:8000/api/pokemon/info/'+name;
    // const data = await fetch(url);
    // const json = await data.json();
    // console.log(json)

    // setpokemon(json.pokemonData.name);
    axios.get(url)
      .then(res => {
        if (res.data.status == true) {
          setpokemon(res.data.pokemonData);
        } else {
          setpokemon([])
          alert("Invalid pokemon")
        }
      })
  };

  const handleChange = event => {
    setname(event.target.value);
  };
  
return(
  <div>
    <input value={name} onChange={handleChange} />
   {name && <button onClick={fetchData}>Click</button>}
    <h2>Pokemon: {pokemon.name}</h2>
    <h2>Image: <img src={pokemon.image}/> </h2>
    <h2>Id: {pokemon.id}</h2>
    <h2>Type: {pokemon.type}</h2>
  </div>)

  

}

// {pokemon.map(pokemon =>
//   <div key={pokemon.id} className='pokemon_item'>
//     <h1>{pokemon.name}</h1>
//     {/* <img className='pokemon_image' src={pokemon.pokemonData.image}/> */}
//   </div>)}

export default App;

