async function Cadastrar (evento) {
    evento.preventDefault();
    
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value 
    const ra = document.getElementById("ra").value 
    const senha = document.getElementById("senha").value
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    
    try {

        const response = await apiRequest("/api/user/", "POST", {nome:email, senha:senha, ra:ra, first_name:nome }, {'X-CSRFToken':csrf});

        if(response.status == 201)
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

document.getElementById("cadastrarUsuario").addEventListener("click", Cadastrar);