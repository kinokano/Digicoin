from django.shortcuts import render, redirect
from api.models import *

def login(request):
    return render(request, 'index.html')


def home(request):
    
    user = CustomUser.objects.all().order_by("-saldo")[:5]
    desafios = Desafio.objects.all()
    context = {
        'usuarios': user[1:],
        'primeiro_usuario': user[0] if user else None,
        'desafios': desafios       
    }
    return render(request, 'UserHtml/home.html', context)



def historicoCompra(request):
    return render(request, 'UserHtml/historicoCompra.html')
def primeiroAcesso(request):
    return render(request, 'primeiroAcesso.html')

def perfilUsuario(request):
    return render(request, 'UserHtml/perfilUsuario.html')

def listaProdutos(request):
    return render(request, 'UserHtml/listaProdutos.html')

def cadastrarDesafio(request):
    return render(request, 'AdmHtml/cadastrarDesafio.html')
def ranking(request):
    return render(request, 'UserHtml/ranking.html')

def listaEstoque(request):
    eventos = Campanha.objects.filter(is_active=True)
             

    estoque = [ 

    {
        'id': 1,
        'nome': "Produto 1 ",
        'qtd': 2,
        'valor': "1900",
    },
    {
        'id': 2,
        'nome': "Produto 2 ",
        'qtd': 2,
        'valor': "2900",
    },
    {
        'id': 3,
        'nome': "Produto 3 ",
        'qtd': 2,
        'valor': "3900",
    },
    {
        'id': 4,
        'nome': "Produto 4 ",
        'qtd': 2,
        'valor': "4900",
    }
  
    ]

    
    return render(request, 'AdmHtml/listaEstoque.html', {'estoque': estoque, 'eventos': eventos})



def homeListaDeUsuarios(request):
    return render(request, 'AdmHtml/homeListaDeUsuarios.html')

def desafiosCampanha(request):
    return render(request, 'UserHtml/desafios.html')


def listaDePedidos(request):
    return render(request, 'AdmHtml/listaDePedidos.html')

def carrinho(request):
    return render(request, 'UserHtml/carrinhoCompra.html')

def teste(request):
    return render(request, 'AdmHtml/teste.html')