from django.http import JsonResponse
import requests
import json
import random
import os


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
        pokemonData['image'] = info['sprites']['front_default']
        res["pokemonData"] = pokemonData
    else:
        res["status"] = False
    
 
    return JsonResponse(res)




def getPokemonForLocation(request, zip_country_code=""):
    # Refernce openweathermap website to see how we are supposed to grab the data we want
    api_key = '0ccb8d20800f7feb751f8008429e6903'
    # country_code = 'US'
    geo_response = requests.get(f"http://api.openweathermap.org/geo/1.0/zip?zip={zip_country_code}&appid={api_key}")
    #print(geo_response.status_code)
    #print(geo_response.text)
    res = {}
    if geo_response:
        geo_data = geo_response.json()
        lat = geo_data['lat']
        lon = geo_data['lon']
    
        weather_response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=imperial")
        if weather_response:
            #print('weahter')
            #print(weather_response.status_code)
            #print(weather_response.text)
            weather_data = weather_response.json()
            temperature = weather_data['main']['temp']
            weather_condition = weather_data['weather'][0]['main'] # 'Clouds', 'Rain', 'Snow' ...
            

            current_dir = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

            #  read pokemonData.json file
            pokemonFile = open(os.path.join(current_dir, 'pokemonData.json'))
            pokemonData = json.load(pokemonFile)
            pokemon = random.choice(pokemonData[weather_condition])
            
            ## add more!
            
            
            pokeapiResponse = requests.get("https://pokeapi.co/api/v2/pokemon/" + str(pokemon))
            
            if pokeapiResponse:
                info = pokeapiResponse.json()
                pokemonData = {}
                typeInfo = info["types"][0]["type"]["name"]
                pokemonData['id'] = info['id']
                pokemonData["name"] = info['name']
                pokemonData["type"] = typeInfo
                pokemonData['image'] = info['sprites']['front_default']
                res["pokemonData"] = pokemonData
           
                
            res['weather'] = weather_condition
            res['temperature']=temperature
    
    res["status"] = True
    
 
    return JsonResponse(res)
