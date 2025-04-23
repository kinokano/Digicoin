document.addEventListener("DOMContentLoaded", function(){
    async function GetUserLogado(){
        const response = await apiRequest('/api/GetDadosUsuarioLogado')
        const nomeUsuario = document.getElementById('nomeUsuario')
        const saldo = document.getElementById('saldo')
        nomeUsuario.innerHTML = response.first_name
        saldo.innerHTML = response.saldo
    }
    
    GetUserLogado()
})

