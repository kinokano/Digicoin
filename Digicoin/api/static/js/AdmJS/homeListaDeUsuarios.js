// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado");
    
    // Elementos dos Modais
    const modalMoedas = document.getElementById("modalAddMoedas");
    const modalUsuario = document.getElementById("modalAddUsuario");
    const modalEditar = document.getElementById("modalEditarUsuario");

    // Botões de abrir modais
    const btnAbrirModalMoedas = document.getElementById("btnAddMoedas");
    const btnAbrirModalUsuario = document.getElementById("btnAddUsuario");
    const botoesEditar = document.querySelectorAll(".edit-icon");

    // Botões de fechar modais
    const botoesFechar = document.querySelectorAll(".close-modal");

    // Função para abrir modal
    function abrirModal(modal) {
        if (modal) {
            modal.style.display = "block";
        }
    }

    // Função para fechar modal
    function fecharModal(modal) {
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Fechar todos os modais
    function fecharTodosModais() {
        [modalMoedas, modalUsuario, modalEditar].forEach(modal => {
            if (modal) fecharModal(modal);
        });
    }

    // Eventos para abrir modais
    if (btnAbrirModalMoedas) {
        btnAbrirModalMoedas.addEventListener('click', () => abrirModal(modalMoedas));
    }

    if (btnAbrirModalUsuario) {
        btnAbrirModalUsuario.addEventListener('click', () => abrirModal(modalUsuario));
    }

    // Eventos para fechar modais
    botoesFechar.forEach(btn => {
        btn.addEventListener('click', () => {
            fecharTodosModais();
        });
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            fecharTodosModais();
        }
    });

    // Controle do modal de edição
    let currentUserCard = null;

    botoesEditar.forEach(btn => {
        btn.addEventListener('click', () => {
            currentUserCard = btn.closest('.user-card');
            if (currentUserCard && modalEditar) {
                const nome = currentUserCard.querySelector('.user-name').textContent;
                const email = currentUserCard.querySelector('.user-info .email')?.textContent || '';
                const ra = currentUserCard.querySelector('.user-info .ra')?.textContent || '';
                const status = currentUserCard.querySelector('.status').textContent;

                // Preencher campos
                document.getElementById('editNomeUsuario').value = nome;
                document.getElementById('editEmailUsuario').value = email;
                document.getElementById('editRaUsuario').value = ra;

                // Controle dos botões de status
                const btnAtivar = modalEditar.querySelector('.btn-ativar');
                const btnDesativar = modalEditar.querySelector('.btn-desativar');

                if (status === 'Ativo') {
                    btnAtivar.style.display = 'none';
                    btnDesativar.style.display = 'block';
                } else if (status === 'Desativado') {
                    btnAtivar.style.display = 'block';
                    btnDesativar.style.display = 'none';
                } else {
                    btnAtivar.style.display = 'block';
                    btnDesativar.style.display = 'block';
                }

                abrirModal(modalEditar);
            }
        });
    });

    // Controle dos botões de status
    if (modalEditar) {
        const btnAtivar = modalEditar.querySelector('.btn-ativar');
        const btnDesativar = modalEditar.querySelector('.btn-desativar');

        if (btnAtivar) {
            btnAtivar.addEventListener('click', () => {
                if (currentUserCard) {
                    const statusElement = currentUserCard.querySelector('.status');
                    statusElement.textContent = 'Ativo';
                    btnAtivar.style.display = 'none';
                    btnDesativar.style.display = 'block';
                }
            });
        }

        if (btnDesativar) {
            btnDesativar.addEventListener('click', () => {
                if (currentUserCard) {
                    const statusElement = currentUserCard.querySelector('.status');
                    statusElement.textContent = 'Desativado';
                    btnDesativar.style.display = 'none';
                    btnAtivar.style.display = 'block';
                }
            });
        }

        // Controles do saldo
        const btnMinus = modalEditar.querySelector('.btn-minus');
        const btnPlus = modalEditar.querySelector('.btn-plus');
        const inputSaldo = modalEditar.querySelector('#editSaldo');

        if (btnMinus && btnPlus && inputSaldo) {
            btnMinus.addEventListener('click', () => {
                let valor = parseInt(inputSaldo.value) || 0;
                if (valor >= 1000) {
                    inputSaldo.value = valor - 1000;
                }
            });

            btnPlus.addEventListener('click', () => {
                let valor = parseInt(inputSaldo.value) || 0;
                inputSaldo.value = valor + 1000;
            });
        }
    }

    // Impedir valores negativos no input de moedas
    const inputQuantidade = document.getElementById("quantidadeMoedas");
    if (inputQuantidade) {
        inputQuantidade.addEventListener("input", (e) => {
            if (e.target.value < 0) {
                e.target.value = 0;
            }
        });
    }
});
