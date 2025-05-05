async function cadastrar(evento) {
    evento.preventDefault();
    const nome = document.getElementById("nome").value
    var email = document.getElementById("email").value 
    const ra = document.getElementById("ra").value 
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
    const senha = document.getElementById("senha").value
   

    try {
        const response = await apiRequest("/api/user/", "POST", {nome:email, senha:senha, ra:ra, first_name:nome }, {'X-CSRFToken':csrf});

        if(response.status == 201)
        {
            alert("Usuário cadastrado com sucesso!")
            document.getElementById("nome").value = ''
            document.getElementById("email").value = ''
            document.getElementById("ra").value = ''
            document.getElementById("senha").value = ''

            console.log(response);
        }
        else{
            console.log("erro ao cadastrar" + response);
        }

    } catch (error) {
        console.log("Deu erro" + error);
    }
    
}

async function editar(evento) {
    evento.preventDefault();


    const id = document.getElementById("id").value
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value 
    const ra = document.getElementById("ra").value 
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
    const saldo = document.getElementById("saldo").value


    try {
        const response = await apiRequest(`/api/user/${id}`, "PUT", {username:email, ra:ra, first_name:nome , saldo:saldo}, {'X-CSRFToken':csrf});
        
        if(response)
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

async function AtivarDesativarUser(evento, ativar) {
    
    evento.preventDefault();
    
    const id = document.getElementById("id").value
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    try {
        const response = await apiRequest(`/api/user/${id}`, "PUT", {is_active:ativar }, {'X-CSRFToken':csrf});
        
        if(response)
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
