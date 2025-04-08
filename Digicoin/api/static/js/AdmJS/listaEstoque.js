document.addEventListener("DOMContentLoaded", function () {



});

async function inativar (elemento) {

    const confirmar = window.confirm('Tem certeza que deseja inativar este produto?');

    if(!confirmar){
        return
    }

    const id = elemento

    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    const produto = await apiRequest(`/api/produto/${id}/`, 'GET', null, { 'X-CSRFToken': csrf });

    const status = produto.is_active;

    const novoStatus = !status

    const produtoAtualizado = {
        nome: produto.nome,
        img1: null,
        img2: null,
        img3: null,
        valor: produto.valor,
        quantidade: produto.quantidade,
        tipo: produto.tipo,
        is_active: novoStatus,
        idCampanha: produto.idCampanha
    };

    const resultado = await apiRequest(`/api/produto/${id}/`, 'PUT', produtoAtualizado, { 'X-CSRFToken': csrf });
    window.location.href = '/listaEstoque/';

    console.log(resultado);
}
async function Editar(idProduto) {
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Faz requisição GET para pegar os dados do produto
    const dados = await apiRequest(`/api/produto/${idProduto}/`, 'GET', null, {
        'X-CSRFToken': csrf
    });

    // Preenche o primeiro pop-up
    document.getElementById('Produto').value = dados.nome;
    document.getElementById('Quantidade').value = dados.quantidade;
    document.getElementById('Preco').value = dados.valor;
    document.getElementById('Campanha').checked = true;

    if (dados.tipo.toLowerCase() === "físico") {
        document.getElementById('Fisico').checked = true;
    } else if (dados.tipo.toLowerCase() === "virtual") {
        document.getElementById('Virtual').checked = true;
    }

    // Salva a campanha selecionada
    window.campanhasSelecionadas = [dados.idCampanha];

    // Abre o primeiro modal (sem resetar ainda)
    document.getElementById('popupEditarProduto').showModal();

    document.getElementById("valorEditar").value = idProduto
    console.log(document.getElementById("valorEditar").value = idProduto)
    
    
}

// Botão "Concluir" do primeiro modal → abre segundo modal por cima
document.querySelector('.buttonConcluir').addEventListener('click', () => {
    // Marca os checkboxes no segundo modal
    preencherPopupConcluir(window.campanhasSelecionadas);

    // Abre segundo modal sem fechar o primeiro
    document.getElementById('popupConcluir').showModal();
});

// Função para marcar as campanhas selecionadas no segundo modal
function preencherPopupConcluir(campanhasSelecionadas = []) {
    document.querySelectorAll('.listaCampanha').forEach(checkbox => {
        const valor = parseInt(checkbox.value);
        checkbox.checked = campanhasSelecionadas.includes(valor);
    });
}

// Botão "X" do primeiro modal → fecha tudo e limpa
document.querySelector('.buttonClose').addEventListener('click', () => {
    document.getElementById('popupEditarProduto').close();
    document.getElementById('popupConcluir').close(); // garante fechamento

    // Limpa os campos
    document.getElementById('Produto').value = "";
    document.getElementById('Quantidade').value = "";
    document.getElementById('Preco').value = "";
    document.getElementById('Campanha').checked = false;
    document.getElementById('Fisico').checked = false;
    document.getElementById('Virtual').checked = false;
    window.campanhasSelecionadas = [];
    preencherPopupConcluir([]); // desmarca todas
});

// Botão "X" do segundo modal → fecha só ele (volta pro primeiro sem perder dados)
document.querySelector('.buttonClose2').addEventListener('click', () => {
    document.getElementById('popupConcluir').close();
});


