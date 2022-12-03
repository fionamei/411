from django.urls import path
from .views import main, FacebookLogin, GoogleLogin
from .pokemon import getPokemonInfo
from .pokemon import getPokemonForLocation
from .pokemon import *


urlpatterns = [
    path('', main),
    path('api/pokemon/info/<str:pokemon>', getPokemonInfo),
    path('api/get_pokemon_for_location/<str:zip_country_code>', getPokemonForLocation),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/pokemon_list_info/<str:pokemons>', pokemonListInfo),
]