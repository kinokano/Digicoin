from django.shortcuts import render, redirect
from api.models import *
from django.core.paginator import Paginator

def login(request):
    return render(request, 'index.html')




def home(request):
   
    users = CustomUser.objects.all().order_by("-saldo")[:4]
    
    desafio_list = Desafio.objects.all()
    desafio_paginator = Paginator(desafio_list, 5) 
    desafio_page = request.GET.get('desafio_page') 
    desafios = desafio_paginator.get_page(desafio_page)  

    context = {
        'usuarios': users,  
        'primeiro_usuario': users[0] if users else None,  
        'desafios': desafios,  
    }

    return render(request, 'UserHtml/home.html', context)


def historicoCompra(request):
    return render(request, 'UserHtml/historicoCompra.html')
def primeiroAcesso(request):
    return render(request, 'primeiroAcesso.html')

def perfilUsuario(request):
    return render(request, 'UserHtml/perfilUsuario.html')

def listaProdutos(request):
    # produtos = [ 
    # {
    #     'id': 1,
    #     'nome': "Produto 1 ",
    #     'qtd': 2,
    #     'valor': "200",
    #     'descricao': "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    # },
    # ]
    produtos = Produto.objects.filter(is_active=True)
    return render(request, 'UserHtml/listaProdutos.html', {"produtos": produtos})



def cadastrarDesafio(request):
    return render(request, 'AdmHtml/cadastrarDesafio.html')
def ranking(request):
    return render(request, 'UserHtml/ranking.html')

def listaEstoque(request):
    eventos = Campanha.objects.filter(is_active=True)
             

    estoque = Produto.objects.filter(is_active=True)

    
    return render(request, 'AdmHtml/listaEstoque.html', {'estoque': estoque, 'eventos': eventos})



def homeListaDeUsuarios(request):
    return render(request, 'AdmHtml/homeListaDeUsuarios.html')

def desafiosCampanha(request):

    desafios = Desafio.objects.filter(idCampanha=True)

    return render(request, 'UserHtml/desafiosCampanha.html', {'desafios': desafios})


def listaDePedidos(request):
    return render(request, 'AdmHtml/listaDePedidos.html')

def carrinho(request):
    return render(request, 'UserHtml/carrinhoCompra.html')


def relatorio(request):
    return render(request, 'components/adm/relatorio.html')

def campanhas(request):
    return render(request, 'components/adm/campanhas.html')

def teste(request):
    return render(request, 'AdmHtml/teste.html')

def cadastrarUsuario(request):
    return render(request, 'AdmHtml/cadastrarUsuario.html')

def editarUsuario(request, id):
    
    userId = CustomUser.objects.filter(id=id).first()
    return render(request, 'AdmHtml/editarUsuario.html', {'userId': userId})


def adicionarMoedas(request):
    return render(request, 'AdmHtml/adicionarMoedas.html')

