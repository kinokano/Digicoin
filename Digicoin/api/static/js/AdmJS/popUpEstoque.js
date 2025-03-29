// Selecionando os elementos do popup e formulário
document.addEventListener("DOMContentLoaded", function () {

    const modalPrimeiro = document.querySelector("#popupEditarProduto");
    const modalSegundo = document.querySelector("#popupConcluir");
    const modalTerceiro = document.querySelector("#CriacaoDeCampanha");

    const buttonOpen = document.querySelector(".buttonOpen");
    const buttonClose = document.querySelector(".buttonClose");
    const buttonConcluir = document.querySelector(".buttonConcluir");
    const buttonClose2 = document.querySelector(".buttonClose2");
    const buttonLinkCampanha = document.querySelector(".CriarNovaCampanha");
    const buttonClose3 = document.querySelector(".buttonClose3");

    const produto = document.getElementById("Produto");
    const quantidade = document.getElementById("Quantidade");
    const preco = document.getElementById("Preco");
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

    // Eventos para abrir e fechar popups
    buttonOpen.addEventListener("click", () => modalPrimeiro.showModal());
    buttonClose.addEventListener("click", () => modalPrimeiro.close());
    buttonConcluir.addEventListener("click", () => {
        if (checkRequired([produto, quantidade, preco]) && checkCampanhaRequired()) {
            modalSegundo.showModal();
        }
    });
    buttonClose2.addEventListener("click", () => modalSegundo.close());
    buttonLinkCampanha.addEventListener("click", () => modalTerceiro.showModal());
    buttonClose3.addEventListener("click", () => modalTerceiro.close());

    // Evento para adicionar uma nova campanha
    const formCampanha = document.querySelector("#CriacaoDeCampanhaForm");
    if (formCampanha) {
        formCampanha.addEventListener("submit", function (event) {
            event.preventDefault();
            let nome = nomeCampanha.value.trim();
            let inicio = new Date(dataInicio.value);
            let fim = new Date(dataFim.value);

            if (!nome || dataInicio.value === "" || dataFim.value === "" || fim < inicio) {
                alert("Preencha todos os campos corretamente.");
                return;
            }

            let idCampanha = nome.toLowerCase().replace(/\s+/g, "_");
            if (document.getElementById(idCampanha)) {
                alert("Essa campanha já existe!");
                return;
            }

            let novaCampanha = document.createElement("div");
            novaCampanha.classList.add("checkbox-item");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = idCampanha;
            checkbox.classList.add("campanha-checkbox");

            let label = document.createElement("label");
            label.htmlFor = idCampanha;
            label.textContent = nome;

            novaCampanha.appendChild(checkbox);
            novaCampanha.appendChild(label);
            campanhaLista.appendChild(novaCampanha);

            alert("Campanha criada com sucesso!");
            modalTerceiro.close();
            formCampanha.reset();
        });
    }

    // Delegação de evento para checkboxes do segundo popup
    modalSegundo.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            let checkboxes = modalSegundo.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(cb => cb.checked = cb === event.target);
        }
    });


    document.getElementById("imagem").addEventListener("change", function (event) {
        console.log("wdadw")
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const uploadBox = document.querySelector(".UploadBox");
                uploadBox.classList.add("has-image");
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = "cover";
                uploadBox.style.backgroundPosition = "center";
            };
            reader.readAsDataURL(file);
        }
    });
});



