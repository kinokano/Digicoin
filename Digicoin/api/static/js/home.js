async function GetUserNameLogado(){
    // const response = await apiRequest("/api/GetDadosUsuarioLogado/")
    const response = await fetch("/api/GetDadosUsuarioLogado")
    const div = document.getElementById("username")
    const dados = await response.json()
    div.innerHTML = dados.username
}
GetUserNameLogado()


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editarAlunoForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('dialogAlunoId').value;
        const nome = document.getElementById('dialogNome').value;
        const senha = document.getElementById('dialogSobrenome').value;
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        console.log('Dados enviados:', { id, nome, senha });

        response = await apiRequest(`/api/user/${id}`, "PUT", { username: nome, password: senha }, { "X-CSRFToken": csrfToken })
        window.location.href = "/home"; 
    });
});
function abrirDialogEditarAluno(id, nome, senha) {
    const dialog = document.getElementById('editarAlunoDialog');
    console.log(nome)
    document.getElementById('dialogAlunoId').value = id;
    document.getElementById('dialogNome').value = nome;
    document.getElementById('dialogSobrenome').value = senha;

    dialog.showModal();
}
