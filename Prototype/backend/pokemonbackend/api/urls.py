from django.urls import path
from .views import main, FacebookLogin, GoogleLogin
from .pokemon import getPokemonInfo

urlpatterns = [
    path('', main),
    path('api/pokemon/info/<str:pokemon>', getPokemonInfo),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]