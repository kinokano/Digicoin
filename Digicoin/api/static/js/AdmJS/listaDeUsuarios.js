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
            const popupEditarUsuario = document.getElementById(`popupEditarUsuario-${id}`);
            popupEditarUsuario.showModal();
            
        });
    }

    
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

