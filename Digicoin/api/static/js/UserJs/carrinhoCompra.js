import Grid from '../grid.js';

document.addEventListener("DOMContentLoaded", () => {
  //localStorage.clear();

  // Recupera a lista de produtos do local storage
  const storedData = JSON.parse(localStorage.getItem('listaProdutos')) || {};
  const grid = storedData.listaGrid || [];

  const config = {
    idGrid: "itensGrid", // ID do contêiner onde a grid será renderizada
    idSortBotao: "#btOrdenar", // Id do Seletor dos botões de ordenação
    // idInputBusca: "#campoBusca", // Id do Seletor do campo de busca
    // idPaginacao: "paginacao", // ID do contêiner de paginação
    itensPorPagina: 15, // Quantidade de itens por pagina
    formatarGrid: (item) => {
      let valor = parseFloat(item.valorProduto); // passa o valor para float
      let qtd = parseInt(1); // passa a quantidade para int
      let totalProduto = qtd * valor;
      let gridRow = `
        <td data-label="Produto">${item.nomeProduto}</td>
        <td data-label="Valor"><span class="cor-moeda">D$</span> <span class="cor-valor">${totalProduto}</span></td>
        <td data-label="Ações"><button class="botao-remover" data-id="${item.idProduto}"><img src="${imgRemoverSrc}"></button></td>
      `;
      return gridRow;
    },
    addEventosGrid: (listaGrid,grid) => {
      listaGrid.forEach((item) => {
        const inputQtd = document.querySelector(`input[data-id="${item.idProduto}"]`);
        const botaoRemover = document.querySelector(`button[data-id="${item.idProduto}"]`);
        if (inputQtd) {
          inputQtd.addEventListener('change', (event) => {
            verificarValorMaxInput(event.target);
            grid.atualizarQtdItensGrid(item.idProduto, event.target.value);
          });
        }
        if (botaoRemover) {
          botaoRemover.addEventListener('click', () => {
            grid.removerItensGrid(item.idProduto);
            console.log(grid);
            localStorage.setItem('listaProdutos', JSON.stringify({ listaGrid: grid.listaGrid }));
          });
        }
      });
    },
    atualizarTotal: () => {
      let valorTotalCarrinho = 0;
      grid.forEach((item) => {
        let valor = parseFloat(item.valorProduto);
        let qtd = parseInt(1);
        let totalProduto = qtd * valor;
        valorTotalCarrinho += totalProduto;
      });
      const botaoFinalizar = document.getElementById("botaoFinalizarPedido");
      const valorTotal = document.getElementById("valorTotal");
      if (valorTotalCarrinho > 0) {
        botaoFinalizar.disabled = false;
      } else {
        botaoFinalizar.disabled = true;
      }
      valorTotal.textContent = valorTotalCarrinho;
    }
  };
  const carrinho = new Grid(grid, config);

});
