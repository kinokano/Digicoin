document.addEventListener("DOMContentLoaded", function(){
    async function GetUserLogado(){
        const response = await apiRequest('/api/GetDadosUsuarioLogado')
        const nomeUsuario = document.getElementById('nomeUsuario')
        const saldo = document.getElementById('saldo')
        nomeUsuario.innerHTML = response.first_name
        saldo.innerHTML = response.saldo
    }
    
    GetUserLogado()

    const dropdownMenu = document.getElementById("dropdownMenu");
    const imgFlecha = document.getElementById('imgFlecha')
    const imgFlechaCima = document.getElementById('imgFlechaCima')

    imgFlecha.addEventListener('click', () => {
        imgFlecha.style.display = 'none';
        imgFlechaCima.style.display = 'block';
        dropdownMenu.style.display = 'flex'; // mostra o menu
    });
    
    imgFlechaCima.addEventListener('click', () => {
        imgFlecha.style.display = 'block';
        imgFlechaCima.style.display = 'none';
        dropdownMenu.style.display = 'none'; // esconde o menu
    });



})

