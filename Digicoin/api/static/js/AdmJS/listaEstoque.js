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
        img1: produto.img1,
        img2: produto.img2,
        img3: produto.img3,
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
