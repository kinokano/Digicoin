document.addEventListener("DOMContentLoaded", function () {
    const dialog = document.getElementById("modal");
    const flipCard = document.querySelector(".flip");
    const fecharBtns = document.querySelectorAll("#fechar, #fechar2");
    const imgButtons = document.querySelectorAll(".imgD button"); 
    const btnVirarTras = document.getElementById("refresh");
    const btnVirarFrente = document.getElementById("refresh2");
    const adquirirBtns = document.querySelectorAll(".Adquirir");

    imgButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const img = this.querySelector("img");
            const modalImg = document.querySelector(".ImProduto");
            const nomeProduto = document.querySelectorAll(".NProduto"); 
    
            flipCard.classList.remove("virado", "virado2");
    
            modalImg.src = img.src;
            nomeProduto.forEach(el => el.textContent = img.alt);
    
            dialog.showModal();
        });
    });

    fecharBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            dialog.close();
            flipCard.classList.remove("virado", "virado2");
        });
    });

    btnVirarTras.addEventListener("click", () => {
        flipCard.classList.remove("virado2");
        flipCard.classList.toggle("virado");
    });

    btnVirarFrente.addEventListener("click", () => {
        flipCard.classList.remove("virado");
        flipCard.classList.toggle("virado2");
    });

    dialog.addEventListener("click", (event) => {
        const container = document.querySelector(".container");
        if (!container.contains(event.target)) {
            dialog.close();
            flipCard.classList.remove("virado", "virado2"); // Reseta para a primeira página
        }
    });

    // Função para adicionar produto ao localStorage
    function adicionarProdutoAoLocalStorage(produto) {
        let listaProdutos = JSON.parse(localStorage.getItem('listaProdutos')) || { listaGrid: [] };
        listaProdutos.listaGrid.push(produto);
        localStorage.setItem('listaProdutos', JSON.stringify(listaProdutos));
    }

    // Adiciona evento de clique ao botão "Adquirir"
    adquirirBtns.forEach((btn) => {
        const idProduto = btn.getAttribute("data-id");
        console.log(idProduto);
        const tipo = document.querySelector(`input[name="tipoProduto[${idProduto}]"]`).value;
        console.log(tipo);
        let tipoFisico;
        if (tipo === "Fisico") {
            tipoFisico = true;
        }else {
            tipoFisico = false;
        }
        btn.addEventListener("click", () => {
            const produto = {
                id: idProduto, // Gera um ID único baseado no timestamp atual
                idProduto: idProduto, // Você pode ajustar conforme necessário
                nomeProduto: document.querySelector(`input[name="nomeProduto[${idProduto}]"]`).value,
                valorProduto: document.querySelector(`input[name="valorProduto[${idProduto}]"]`).value,
                qtdProduto: 1, // Quantidade padrão, ajuste conforme necessário
                fisicoProduto: tipoFisico // Ajuste conforme necessário
            };
            console.log(produto);
            adicionarProdutoAoLocalStorage(produto);
            dialog.close();
            flipCard.classList.remove("virado", "virado2");
        });
    });
});

