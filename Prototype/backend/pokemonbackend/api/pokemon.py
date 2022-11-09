from django.http import JsonResponse
import requests



def getPokemonInfo(request, pokemon=""):
    response = requests.get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    
    
    res = {}
    if response:
        info = response.json()
        res["status"] = True
        pokemonData = {}
        typeInfo = info["types"][0]["type"]["name"]
        pokemonData['id'] = info['id']
        pokemonData["name"] = info['name']
        pokemonData["type"] = typeInfo
        pokemonData['image'] = info['sprites']['back_default']
        res["pokemonData"] = pokemonData
    else:
        res["status"] = False
    
 
    return JsonResponse(res)
