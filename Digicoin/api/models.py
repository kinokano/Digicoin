from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Create your models here.

class CustomUser(AbstractUser):
    is_adm = models.BooleanField(default=False)
    ra = models.CharField(max_length=30, null=False, blank=False, default=False)
    imgPerfil = models.ImageField(upload_to='usuarios/', null=True, blank=True)
    saldo = models.IntegerField(default=0)
    pontuacao = models.IntegerField(default=0)
    primeiroAcesso = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        # Ao salvar, detecta mudança de saldo
        if self.pk:
            original = CustomUser.objects.get(pk=self.pk)
            if original.saldo != self.saldo:
                HistoricoSaldo.objects.create(
                    usuario=self,
                    saldo_anterior=original.saldo,
                    saldo_novo=self.saldo,
                    diferenca=self.saldo - original.saldo,
                    data_alteracao=timezone.now()
                )
        super().save(*args, **kwargs)

class HistoricoSaldo(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='historico_saldo')
    saldo_anterior = models.IntegerField()
    saldo_novo = models.IntegerField()
    diferenca = models.IntegerField()
    data_alteracao = models.DateTimeField()

    class Meta:
        ordering = ['-data_alteracao']

    def is_positivo(self):
        return self.diferenca >= 0

    def __str__(self):
        sinal = '+' if self.is_positivo() else ''
        return f"{self.usuario.username}: {sinal}{self.diferenca} em {self.data_alteracao.strftime('%Y-%m-%d %H:%M')}"

class Campanha(models.Model):
    nome = models.CharField(max_length=30, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    dataInicio = models.DateField(default=False)
    dataFim = models.DateField(default=False)
    descricao = models.TextField(default=False)
    predefinida = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length=100, null=False, blank=False)
    img1 =  models.ImageField(upload_to='produtos/', null=True, blank=True)
    img2 =  models.ImageField(upload_to='produtos/', null=True, blank=True)
    img3 =  models.ImageField(upload_to='produtos/', null=True, blank=True)
    valor = models.IntegerField(null=False, blank=False)
    quantidade = models.IntegerField(null=False, blank=False)
    tipo_choices = [("Físico", "Físico"), ("Virtual","Virtual")]
    tipo = models.CharField(max_length=10, choices=tipo_choices)
    is_active = models.BooleanField(default=True)
    idCampanha = models.ForeignKey(Campanha, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome

class Desafio(models.Model):
    nome = models.CharField(max_length=100, null=False, blank=False)
    valor = models.IntegerField(null=False, blank=False)
    dataInicio = models.DateField(null=True, blank=True)
    descricao = models.TextField(null=True, blank=True)
    dataFim = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    idCampanha = models.ForeignKey(Campanha, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome

class Compra(models.Model):
    total = models.IntegerField(null=False, blank=False)
    entrega_choices = [("Retirar","Retirar"), ("Entrega","Entrega")]
    entrega = models.CharField(max_length=10, choices=entrega_choices)
    cep = models.CharField(max_length=20, default=False)
    cidade = models.CharField(max_length=20, default=False)
    estado = models.CharField(max_length=20, default=False)
    rua = models.CharField(max_length=100, default=False)
    bairro = models.CharField(max_length=100, default=False)
    numero = models.CharField(max_length=100, default=False)
    pedido_choices = [("Pendente", "Pendente"), ("Concluído","Concluído")]
    pedido = models.CharField(max_length=10, choices=pedido_choices, default='Pendente')
    complemento = models.CharField(max_length=100, default=False)
    idUsuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False, blank=False)

class ItensCompra(models.Model):
    qtdProduto = models.IntegerField(null=False, blank=False)
    idProduto = models.ForeignKey(Produto, on_delete=models.CASCADE, null=False, blank=False)
    idCompra = models.ForeignKey(Compra, on_delete=models.CASCADE, null=False, blank=False) 
