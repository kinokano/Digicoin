from django.shortcuts import render, redirect
from api.models import *

def login(request):
    return render(request, 'index.html')


def home(request):
    return render(request, 'UserHtml/home.html')
def primeiroAcesso(request):
    return render(request, 'primeiroAcesso.html')
