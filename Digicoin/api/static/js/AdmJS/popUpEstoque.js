// Selecionando os elementos do popup e formulário
document.addEventListener("DOMContentLoaded", function () {


    const modalPrimeiro = document.querySelector("#popupEditarProduto");
    const modalSegundo = document.querySelector("#popupConcluir");
    const modalTerceiro = document.querySelector("#CriacaoDeCampanha");

    
    const buttonClose = document.querySelector(".buttonClose");
    const buttonConcluir = document.querySelector(".buttonConcluir");
    const buttonClose2 = document.querySelector(".buttonClose2");
    const buttonLinkCampanha = document.querySelector(".CriarNovaCampanha");
    const buttonClose3 = document.querySelector(".buttonClose3");

    const produto = document.getElementById("Produto");
    const quantidade = document.getElementById("Quantidade");
    quantidade.addEventListener("input", function () {
        mascaraMilhar(quantidade);
    });

    quantidade.addEventListener("keydown", function (event) {
        bloqueiaCaracteresIndesejados(event);
    });

    const preco = document.getElementById("Preco");
    preco.addEventListener("input", function () {
        mascaraMilhar(preco);
    });

    preco.addEventListener("keydown", function (event) {
        bloqueiaCaracteresIndesejados(event);
    });

    const campanhaCheckbox = document.getElementById("Campanha");

    const checkboxlist = document.getElementById("checkboxlist");
    const campanhaLista = document.querySelector(".temaCampanhaCorpo");


    // Função para exibir erros
    function ShowError(input, mensagem) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");
        small.textContent = mensagem;
        small.classList.add("error");
    }

    // Função para remover erros
    function ShowSucesso(input) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");
        small.classList.remove("error");
    }

    // Função de validação dos campos obrigatórios
    function checkRequired(inputs) {
        return inputs.every(input => {
            if (input.value.trim() === "") {
                ShowError(input, "Campo obrigatório");
                return false;
            } else {
                ShowSucesso(input);
                return true;
            }
        });
    }

    // Função para validar o checkbox de Campanha
    function checkCampanhaRequired() {
        if (!campanhaCheckbox.checked) {
            ShowError(campanhaCheckbox, "*");
            return false;
        } else {
            ShowSucesso(campanhaCheckbox);
            return true;
        }
    }


    // Função para validar Físico e Virtual
    function checkFisicoVirtualRequired() {
        const fisicoCheckbox = document.getElementById('Fisico');
        const virtualCheckbox = document.getElementById('Virtual');

        if (!fisicoCheckbox.checked && !virtualCheckbox.checked) {
            return false;
        } else {
            ShowSucesso(fisicoCheckbox);
            return true;
        }
    }

    document.getElementById('Fisico').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('Virtual').checked = false;
        }
        checkFisicoVirtualRequired();
    });

    document.getElementById('Virtual').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('Fisico').checked = false;
        }
        checkFisicoVirtualRequired();
    });


    // Eventos para abrir e fechar popups
    
    buttonClose.addEventListener("click", () => modalPrimeiro.close());
    buttonConcluir.addEventListener("click", () => {
        if (checkRequired([produto, quantidade, preco]) && checkCampanhaRequired() && checkFisicoVirtualRequired()) {



            modalSegundo.showModal();
        }
    });


    buttonClose2.addEventListener("click", () => modalSegundo.close());
    buttonLinkCampanha.addEventListener("click", () => modalTerceiro.showModal());
    buttonClose3.addEventListener("click", () => modalTerceiro.close());


    async function handleSubmit(event) {
        event.preventDefault();
    
        let nome = document.getElementById('Produto').value;
        let quantidade = document.getElementById('Quantidade').value;
        quantidade = quantidade.replace(/\./g, '');
        quantidade = parseInt(quantidade);
    
        let preco = document.getElementById('Preco').value;
        preco = preco.replace(/\./g, '');
        preco = parseInt(preco);
    
        let imagemInput = document.getElementById('imagem');
        let imagemFile = imagemInput.files[0];
    
        let idCampanha = null;
        let checkboxes = document.getElementsByClassName('listaCampanha');
    
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                idCampanha = checkboxes[i].value;
                break;
            }
        }
    
        let fisico = document.getElementById("Fisico");
        let virtual = document.getElementById("Virtual");
        let tipo = "";
    
        if (fisico.checked) {
            tipo = "Físico";
        } else if (virtual.checked) {
            tipo = "Virtual";
        } else {
            tipo = null;
        }
    
        const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
        const chaveEstrangeira = await apiRequest(`/api/campanha/${idCampanha}/`, 'GET', null, { 'X-CSRFToken': csrf });
    
        // Criação do formData para envio com imagem
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("valor", preco);
        formData.append("quantidade", quantidade);
        formData.append("tipo", tipo);
        formData.append("idCampanha", chaveEstrangeira.id);
        formData.append("dataInicio", chaveEstrangeira.dataInicio);
        formData.append("dataFim", chaveEstrangeira.dataFim);
        formData.append("descricao", chaveEstrangeira.descricao);
        formData.append("is_active", chaveEstrangeira.is_active);
    
        if (imagemFile) {
            formData.append("img1", imagemFile);
        }
    
        let editarValor = document.getElementById("valorEditar").value;
    
        let response;
    
        if (editarValor) {
            // Atualização via PUT — mas precisa ver se seu back aceita multipart no PUT
            response = await fetch(`/api/produto/${editarValor}/`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrf
                    // sem Content-Type
                },
                body: formData
            });
        } else {
            // Cadastro via POST com FormData e imagem
            response = await fetch('/api/produto/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrf
                    // sem Content-Type
                },
                body: formData
            });
        }
    
        window.location.reload()
    }
    


    
    document.getElementById("produtoForm2").addEventListener("submit", handleSubmit);

    async function EventoCampanhas(event) {
        event.preventDefault();

        let nome = document.getElementById('nomeCampanha').value;
        let inicio = new Date(document.getElementById('dataInicio').value + "T00:00:00"); // Garante o horário correto
        let fim = new Date(document.getElementById('dataFim').value + "T00:00:00");
        let descricaoCampanha = document.getElementById('descricaoCampanha').value;
        const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value

        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0);


        if (!nome || dataInicio.value === "" || dataFim.value === "" || fim < inicio || inicio.getTime() < hoje.getTime()) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const evento = {
            nome: nome,
            is_active: true,
            dataInicio: dataInicio.value,
            dataFim: dataFim.value,
            descricao: descricaoCampanha
        };


        let valorCampanhaId = document.getElementById('valorEditar').value;

        let formCampanhaTerceiro = document.getElementById('CriacaoDeCampanhaForm');

        let response
        if (valorCampanhaId) {

            response = await apiRequest(`/api/campanha/${valorCampanhaId}/`, 'PUT', evento, { 'X-CSRFToken': csrf });
            window.location.reload();




        } else {
            const response = await apiRequest('/api/campanha/', 'POST', evento, { 'X-CSRFToken': csrf });
            let novaCampanha = document.createElement("div");


            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("listaCampanha");
            checkbox.value = response.id;

            let label = document.createElement("label");
            label.textContent = response.nome;

            novaCampanha.appendChild(checkbox);
            novaCampanha.appendChild(label);
            campanhaLista.appendChild(novaCampanha);

            modalTerceiro.close();
            formCampanhaTerceiro.reset();
            
        }
    }

    document.getElementById("CriacaoDeCampanhaForm").addEventListener("submit", EventoCampanhas);






    // Delegação de evento para checkboxes do segundo popup
    modalSegundo.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            let checkboxes = modalSegundo.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(cb => cb.checked = cb === event.target);
        }
    });


    document.getElementById("imagem").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const uploadBox = document.querySelector(".UploadBox");
                uploadBox.classList.add("has-image");
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = "contain";
                uploadBox.style.backgroundRepeat = "no-repeat";
                uploadBox.style.backgroundPosition = "center";
            };
            reader.readAsDataURL(file);
        }
    });



});


function mascaraMilhar(input) {
    // Remove tudo que não for número
    let valor = input.value.replace(/\D/g, "");

    // Aplica separador de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    input.value = valor;
}

function bloqueiaCaracteresIndesejados(event) {
    // Bloqueia vírgula, ponto digitado, sinais etc.
    const caracteresBloqueados = [",", ".", "-", "+", "e"]; // "e" evita casos tipo 1e10
    if (caracteresBloqueados.includes(event.key)) {
        event.preventDefault();
        return false;
    }
}

