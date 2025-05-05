document.addEventListener('DOMContentLoaded', () => {

    const popUpAdicionarDesafio = document.getElementById('popUpAdicionarDesafio');
    const addDesafio = document.getElementById('addDesafio');
    const iconeX = document.getElementById('iconeX')

    addDesafio.addEventListener('click', () => {
        popUpAdicionarDesafio.showModal();

    });

    iconeX.addEventListener('click', ()=> {
        popUpAdicionarDesafio.close()
    })

    
    const botoesEditar = document.querySelectorAll(".botaoEditar");

    botoesEditar.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.getAttribute("data-id");
            const dialog = document.getElementById(`popUpEditarDesafio-${id}`);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    // Fechar o dialog quando clicar no ícone X
    const iconesFechar = document.querySelectorAll(".iconeX");
    iconesFechar.forEach(icone => {
        icone.addEventListener("click", () => {
            const dialog = icone.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });



})