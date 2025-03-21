from django.shortcuts import render, redirect
from api.models import *

def login(request):
    return render(request, 'index.html')


def home(request):
    return render(request, 'UserHtml/home.html')
def historicoCompra(request):
    return render(request, 'UserHtml/historicoCompra.html')
def primeiroAcesso(request):
    return render(request, 'primeiroAcesso.html')

def perfilUsuario(request):
    return render(request, 'UserHtml/perfilUsuario.html')

def listaProdutos(request):
    return render(request, 'UserHtml/listaProdutos.html')
