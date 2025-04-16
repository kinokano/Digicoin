// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const popupCadastrarUsuario = document.getElementById('popupCadastrarUsuario');
    const addUsuarios = document.getElementById('addUsuarios');
    const fecharCadastrar = document.getElementById('fecharCadastrar');
    const cadastrarUsuario = document.getElementById('cadastrarUsuario');    

    addUsuarios.addEventListener('click', () => {
        popupCadastrarUsuario.showModal();

    });
   
    fecharCadastrar.addEventListener('click', () => {
        popupCadastrarUsuario.close();
    });

    
  
    
    const popupAdicionarMoedas = document.getElementById('popupAdicionarMoedas');
    const addMoedas = document.getElementById('addMoedas');
    const fecharAdicionarMoedas = document.getElementById('fecharAdicionarMoedas');

    addMoedas.addEventListener('click', () => {
        popupAdicionarMoedas.showModal();
        const ids = getIdsSelecionados();
        
    });
    

    fecharAdicionarMoedas.addEventListener('click', () => {
        popupAdicionarMoedas.close();
    });
    

    const editar = document.querySelectorAll('[id="editar"]');
    for (let i = 0; i < editar.length; i++) {
        editar[i].addEventListener('click', () => {
            const id = editar[i].getAttribute('data-id');
            const popupEditarUsuario = document.getElementById(`editarUsuario-${id}`);
            popupEditarUsuario.showModal();
            
        });
    }


    document.querySelectorAll('.formEditar').forEach(form => {
        form.addEventListener('submit',  function(e) {
            e.preventDefault();
            
            // Pega o ID do usuário a partir do diálogo pai

            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Pega o ID do usuário a partir do diálogo pai
                const dialog = this.closest('.editarUsuario');
                const userId = dialog.id.split('-')[1]; // Extrai o ID do usuário do ID do diálogo
                
                // Dados do formulário
                const nome = this.querySelector('.nome').value;
                const email = this.querySelector('.email').value;
                const ra = this.querySelector('.ra').value;
                const saldo = this.querySelector('.saldo').value;
                
                const response = await apiRequest(`/api/user/${userId}`, "PUT", {username:email, ra:ra, first_name:nome , saldo:saldo});
                
                if(response.status == 200)
                {
                    console.log(response);
                    
                }
                else{
                    console.log("erro ao cadastrar" + response);
                }
            
        });
        });
    });

    


    // document.querySelectorAll('.ativar, .desativar').forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         e.preventDefault();
            
    //         const form = this.closest('.formEditar');
    //         const dialog = form.closest('.editarUsuario');
    //         const userId = dialog.id.split('-')[1];
            
    //         const action = this.classList.contains('ativar') ? 'ativar' : 'desativar';
    //         console.log(`${action} usuário ${userId}`);
            
    //         // Aqui você pode fazer uma requisição AJAX para ativar/desativar
    //     });
    // });

    
    const fecharEditars = document.querySelectorAll('#fecharEditar');

    fecharEditars.forEach(botao => {
        botao.addEventListener('click', (e) => {
            // Acha o <dialog> mais próximo na hierarquia
            const dialog = botao.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });
     
    const concluido = document.querySelectorAll('#concluido');

    concluido.forEach(botao => {
        botao.addEventListener('click', (e) => {
            // Acha o <dialog> mais próximo na hierarquia
            const dialog = botao.closest('dialog');
            if (dialog) {
                dialog.close();
            }
            window.location.reload();
        });
    });
   
    function getIdsSelecionados() {
        const linhas = document.querySelectorAll('.linhaUsuario');
        const idsSelecionados = [];
    
        linhas.forEach(linha => {
            const checkbox = linha.querySelector('.checkbox');
            const inputId = linha.querySelector('.idUser');
    
            if (checkbox && checkbox.checked && inputId) {
                idsSelecionados.push(inputId.value);
            }
        });
    
        return idsSelecionados;
    }

});
