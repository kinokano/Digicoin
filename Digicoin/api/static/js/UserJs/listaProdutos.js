document.addEventListener("DOMContentLoaded", function () {
    const produtos = document.getElementsByClassName("imgD");

    for (let i = 0; i < produtos.length; i++) {
        produtos[i].children[0].addEventListener("click", function () {
            const idProduto = produtos[i].children[0].dataset.valor;
            const dialog = document.getElementById(`modal-${idProduto}`);
            const flipCard = document.getElementById(`flip-${idProduto}`);
            const refresh = flipCard.querySelector(".frente .refresh");
            const refresh2 = flipCard.querySelector(".tras .refresh");
            const fecharBtns = dialog.querySelectorAll(".fechar");

            dialog.showModal();

            if (!flipCard.dataset.listenersAdded) {
                refresh.addEventListener("click", () => {
                    flipCard.classList.remove("virado2");
                    flipCard.classList.toggle("virado");
                });

                refresh2.addEventListener("click", () => {
                    flipCard.classList.remove("virado");
                    flipCard.classList.toggle("virado2");
                    refresh2.click()
                });

                fecharBtns.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        dialog.close();
                        flipCard.classList.remove("virado", "virado2");
                    });
                });

                dialog.addEventListener("click", (event) => {
                    const container = dialog.querySelector(".container");
                    if (!container.contains(event.target)) {
                        dialog.close();
                        flipCard.classList.remove("virado", "virado2");
                    }
                });

                flipCard.dataset.listenersAdded = "true";
            }
        });
    }
});
