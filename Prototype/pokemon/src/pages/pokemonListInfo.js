import {useState} from 'react';
import axios from 'axios';
import { db, auth } from '..';
import { doc, getDoc } from 'firebase/firestore';
import Card from '@mui/material/Card';


export default function PokeListInfo(){
    const [pokemonData, setpokemonData] = useState([])
    const [pokeList, setPokeList] = useState("")

    const colors = {
        "normal": '#E0DAD9',
        "fighting": '#C84731',
        "flying": '#',
        "poison": '#',
        "ground": '#',
        "rock": '#',
        "bug": '#',
        "ghost": '#',
        "steel": '#',
        "fire": '#FA5858',
        "water": '#6A91FF',
        "grass": '#95F386',
        "electric": '#',
        "psychic": '#C879C3',
        "ice": '#6AD6FF',
        "dragon": '#',
        "dark": '#6A6161',
        "fairy": '#'
    }

    const fetchData = async (list) =>  {
        console.log("fetching data")

        console.log("poke list " + pokeList);
        const url = 'http://127.0.0.1:8000/api/pokemon_list_info/'+list
        // const url = 'http://127.0.0.1:8000/api/pokemon_list_info/'+pokemonList

        axios.get(url)
            .then(res => {
                if(res.data.status === true){
                    const newData = [];
                    while(res.data.data.length) newData.push(res.data.data.splice(0,3));
                    setpokemonData(newData)
                }
            })
    };

    const getSavedPokemons = async () => {
        console.log("getting poke list")
        const docRef = doc(db, "userdata", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const pokeId = docSnap.data().pokemonIDs.map((id) => `${id},`).join('');
            setPokeList(pokeId.slice(0,-1));
            fetchData(pokeId.slice(0,-1));
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
          }
    };

    function cardPoke(name, image, type) {
        return (
        <Card
            sx={{ minWidth: 275 }}
            style={{backgroundColor: `${colors[type]}`}}
        >
            <h2>{name}</h2>
            <h1><img src={image} alt={name}/> </h1>
            <h2>{type}</h2>
        </Card>)
    };

    const mapPokemon = pokemonData.map((pokemon,index) => {
        if(pokemon.length==3){
        return(
            <table key={index} cellPadding="20" cellSpacing="0">
            <tr>
                <th>{cardPoke(pokemon[0].name, pokemon[0].image, pokemon[0].type)}</th>
                <th>{cardPoke(pokemon[1].name, pokemon[1].image, pokemon[1].type)}</th>
                <th>{cardPoke(pokemon[2].name, pokemon[2].image, pokemon[2].type)}</th>
            </tr>
            </table>
            )
        }else if(pokemon.length==2){
            return(
                <table key={index} cellPadding="20" cellSpacing="0">
                <tr>
                    <th>{cardPoke(pokemon[0].name, pokemon[0].image, pokemon[0].type)}</th>
                    <th>{cardPoke(pokemon[1].name, pokemon[1].image, pokemon[1].type)}</th>
                </tr>
                </table> 
            )
        }else{
            return(
                <table key={index} cellPadding="20" cellSpacing="0">
                <tr>
                    <th>{cardPoke(pokemon[0].name, pokemon[0].image, pokemon[0].type)}</th>
                </tr>
                </table>
            )
        }
    }
    )  

    return (
        <div>
        <button onClick={getSavedPokemons}>saved pokemons</button>
        <center> {mapPokemon} </center>
        </div>
    )

}