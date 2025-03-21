from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class CampanhaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campanha
        fields = '__all__'

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class DesafioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desafio
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

class ItensCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItensCompra
        fields = '__all__'

        