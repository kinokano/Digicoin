from django.urls import include, path
from .views.api_views import *
from .views.web_views import *

urlpatterns = [
    path('', login, name="login"),
    path('home/', home, name="home"),
    path('primeiroAcesso', primeiroAcesso, name="primeiroAcesso"),
    path('historicoCompra', historicoCompra, name="historicoCompra"),
    path('perfilUsuario', perfilUsuario, name="perfilUsuario"),

]
