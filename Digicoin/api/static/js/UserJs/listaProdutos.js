document.addEventListener("DOMContentLoaded", function () {
    const dialog = document.getElementById("modal");
    const flipCard = document.querySelector(".flip");
    const fecharBtns = document.querySelectorAll("#fechar, #fechar2");
    const imgButtons = document.querySelectorAll(".imgD button"); 
    const btnVirarTras = document.getElementById("refresh");
    const btnVirarFrente = document.getElementById("refresh2");

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
});

