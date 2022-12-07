import {useState} from 'react';
import axios from 'axios';

export default function PokeListInfo(){
    const [pokemonData, setpokemonData] = useState([])
    const pokemonList = '1,2,3,4,5,6,7'
    const fetchData = async () =>  {
        const url = 'http://127.0.0.1:8000/api/pokemon_list_info/'+pokemonList
        axios.get(url)
            .then(res => {
                console.log(res)
                if(res.data.status === true){
                    const newData = [];
                    while(res.data.data.length) newData.push(res.data.data.splice(0,3));
                    console.log(newData)
                    setpokemonData(newData)
                    console.log(pokemonData)
                }
            })
    };

    const mapPokemon = pokemonData.map((pokemon,index) => {
        //console.log('hello')
        if(pokemon.length==3){
        return(
            <table cellpadding="20" cellspacing="0">
            <tr>
                <th>
                    <h2>Pokemon: {pokemon[0].name}</h2>
                    <h2><img src={pokemon[0].image} alt={pokemon.name}/> </h2>
                    <h2>Type: {pokemon[0].type}</h2>
                </th>

                <th>
                    <h2>Pokemon: {pokemon[1].name}</h2>
                    <h2><img src={pokemon[1].image} alt={pokemon.name}/> </h2>
                    <h2>Type: {pokemon[1].type}</h2>
                </th>
                <th>
                    <h2>Pokemon: {pokemon[2].name}</h2>
                    <h2><img src={pokemon[2].image} alt={pokemon.name}/> </h2>
                    <h2>Type: {pokemon[2].type}</h2>
                </th>
            </tr>
            </table>
            )
        }else if(pokemon.length==2){
            return(
                <table cellpadding="20" cellspacing="0">
                <tr>
                    <th>
                        <h2>Pokemon: {pokemon[0].name}</h2>
                        <h2><img src={pokemon[0].image} alt={pokemon.name}/> </h2>
                        <h2>Type: {pokemon[0].type}</h2>
                    </th>

                    <th>
                        <h2>Pokemon: {pokemon[1].name}</h2>
                        <h2><img src={pokemon[1].image} alt={pokemon.name}/> </h2>
                        <h2>Type: {pokemon[1].type}</h2>
                    </th>
                </tr>
                </table> 
            )
        }else{
            return(
                <table cellpadding="20" cellspacing="0">
                <tr>
                    <th>
                        <h2>Pokemon: {pokemon[0].name}</h2>
                        <h2><img src={pokemon[0].image} alt={pokemon.name}/> </h2>
                        <h2>Type: {pokemon[0].type}</h2>
                    </th>
                </tr>
                </table>
            )
        }
    }
    )  

    return (
    <div>
        <button onClick={fetchData}>saved pokemons</button>
        <center> {mapPokemon} </center>
        </div>
    )

}