const modalTerceiro = document.querySelector("#CriacaoDeCampanha");

const botaoTeste = document.querySelector(".buttonCriarCampanha");
botaoTeste.addEventListener('click', () => modalTerceiro.showModal())

const buttonClose3 = document.querySelector(".buttonClose3");
buttonClose3.addEventListener("click", () => modalTerceiro.close());



async function EventoCampanha(event) {
    event.preventDefault();

    let nome = document.getElementById('nomeCampanha').value;
    let inicio = new Date(document.getElementById('dataInicio').value + "T00:00:00"); // Garante o horário correto
    let fim = new Date(document.getElementById('dataFim').value + "T00:00:00");
    let descricaoCampanha = document.getElementById('descricaoCampanha').value;
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0);


    if (!nome || dataInicio.value === "" || dataFim.value === "" || fim < inicio || inicio.getTime() < hoje.getTime()) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const evento = {
        nome: nome,
        is_active: true,
        dataInicio: dataInicio.value,
        dataFim: dataFim.value,
        descricao: descricaoCampanha
    };

    let formCampanhaTerceiro = document.getElementById('CriacaoDeCampanhaForm');
    let valorCampanhaId = document.getElementById('valorEditar').value;
    console.log(valorCampanhaId)
    
    let response

    if (valorCampanhaId) {
        
        response = await apiRequest(`/api/campanha/${valorCampanhaId}/`, 'PUT', evento, { 'X-CSRFToken': csrf });


    } else {
        response = await apiRequest('/api/campanha/', 'POST', evento, { 'X-CSRFToken': csrf });
    }

    window.location.href = '/campanhas/';
}

document.getElementById("CriacaoDeCampanhaForm").addEventListener("submit", EventoCampanha);



async function Editar(idCampanha) {
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Requisição para buscar os dados da campanha
    const dados = await apiRequest(`/api/campanha/${idCampanha}/`, 'GET', null, {
        'X-CSRFToken': csrf
    });
    console.log(dados);

    // Preenche os campos do formulário de edição
    document.getElementById('nomeCampanha').value = dados.nome;
    console.log(document.getElementById('nomeCampanha'));
    document.getElementById('dataInicio').value = dados.dataInicio;
    document.getElementById('dataFim').value = dados.dataFim;
    document.getElementById('descricaoCampanha').value = dados.descricao;

    window.campanhasSelecionadas = [dados.idCampanha];
    document.getElementById('CriacaoDeCampanha').showModal();

    document.getElementById("valorEditar").value = idCampanha;
    
}   

async function inativar (elemento) {

    // const confirmar = window.confirm('Tem certeza que deseja inativar este produto?');

    // if(!confirmar){
    //     return
    // }

    const id = elemento
    console.log(id);

    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    const campanha = await apiRequest(`/api/campanha/${id}/`, 'GET', null, { 'X-CSRFToken': csrf });
    console.log(campanha);

    const status = campanha.is_active;
    console.log(status);

    const novoStatus = !status

    const campanhaAtualizada = {
        nome: campanha.nome,
        dataInicio: campanha.dataInicio,
        dataFim: campanha.dataFim,
        descricao: campanha.descricao,
        is_active: novoStatus
    };

    const resultado = await apiRequest(`/api/campanha/${id}/`, 'PUT', campanhaAtualizada, { 'X-CSRFToken': csrf });
    window.location.reload();

    console.log(resultado);
}
