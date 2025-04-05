document.addEventListener("DOMContentLoaded", function () {



});

async function inativar (elemento) {
    const id = elemento
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
    console.log(elemento)
    const produtos = await apiRequest(`/api/produto/${id}/`, 'GET', null, { 'X-CSRFToken': csrf });
    console.log(produtos);

    const status = produtos.is_active;
    

    const novoStatus = !status
    
    const produtoAtualizado = {
        nome: produto.nome,
        img1: produto.img1,
        img2: produto.img2,
        img3: produto.img3,
        valor: produto.valor,
        quantidade: produto.quantidade,
        tipo: produto.tipo,
        is_active: !produto.is_active,
        idCampanha: produto.idCampanha
    };

    const resultado = await apiRequest(`/api/produto/${id}/`, 'PUT', produtoAtualizado, { 'X-CSRFToken': csrf });

    console.log(resultado);
}
