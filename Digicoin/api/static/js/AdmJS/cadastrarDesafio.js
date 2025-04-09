async function Cadastrar (evento) {
    evento.preventDefault();
    
    const nomeDesafio = document.getElementById("nomeDesafio").value
    const valorDesafio = document.getElementById("valorDesafio").value 
    const descricao = document.getElementById("descricao").value 
    const inicioDesafio = document.getElementById('inicioDesafio').value
    const fimDesafio = document.getElementById('fimDesafio').value

    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    
    try {

        const response = await apiRequest("/api/desafio/", "POST", 
        {nome:nomeDesafio, 
        valor:valorDesafio, 
        dataInicio:inicioDesafio, 
        descricao:descricao,
        dataFim:fimDesafio,
        }, {'X-CSRFToken':csrf});

       

        if(response != null)
        {
            console.log(response);
        }
        else{
            console.log("erro ao cadastrar" + response);
        }
    } catch (error) {
        console.log("Deu erro" + error);
    }
    
}

document.getElementById("formCadastrarUsuario").addEventListener("submit", Cadastrar);