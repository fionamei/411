from django.urls import path
from .views import main
from .pokemon import getPokemonInfo

urlpatterns = [
    path('', main),
    path('api/pokemon/info/<str:pokemon>', getPokemonInfo)
]