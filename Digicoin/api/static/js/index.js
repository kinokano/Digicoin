
async function Login(evento) {
    evento.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

    const response = await apiRequest('api/login/', 'POST', {nome:email, senha:senha}, {'X-CSRFToken':csrf});
    console.log(response);

    if(response.status == 200)
    {
        console.log('logou');

        window.location.href = '/home/'
    }
    else{
        console.log('erro ao logar');
    }
    
    
}


document.getElementById('loginForm').addEventListener('submit', Login);