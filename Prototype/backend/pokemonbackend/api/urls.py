from django.urls import path
from .views import main
from .pokemon import getPokemonInfo
from .pokemon import getPokemonForLocation


urlpatterns = [
    path('', main),
    path('api/pokemon/info/<str:pokemon>', getPokemonInfo),
    path('api/get_pokemon_for_location/<str:zip_country_code>', getPokemonForLocation)
]