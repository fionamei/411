import {useState} from 'react';
import axios from 'axios';

export default function PokeListInfo(){
    const [pokemonData, setpokemonData] = useState([])
    const pokemonList = '1,2,3,11,43,13,342,241,52'
    const fetchData = async () =>  {
        const url = 'http://127.0.0.1:8000/api/pokemon_list_info/'+pokemonList
        axios.get(url)
            .then(res => {
                console.log(res)
                if(res.data.status === true){
                    setpokemonData(res.data.data)
                    console.log(pokemonData)
                }
            })
    };
    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0,n));
        return chunks;
    }

    const mapPokemon = pokemonData.map((pokemon,index) => {
        console.log('hello')
        return(
            <span>
                <h2>Pokemon: {pokemon.name}</h2>
                <h2>Image: <img src={pokemon.image}/> </h2>
                <h2>Id: {pokemon.id}</h2>
                <h2>Type: {pokemon.type}</h2>
            </span>)
    }
    )  

    return (
    <div>
        <button onClick={fetchData}>saved pokemons</button>
        {mapPokemon}
        </div>
    )

}