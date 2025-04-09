import Grid from '../grid.js';

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  // Verifica se o local storage já contém produtos
  if (!localStorage.getItem('listaProdutos') || (JSON.parse(localStorage.getItem('listaProdutos')).listaGrid || []).length === 0) {
    // Adiciona 5 produtos de exemplo ao local storage
    const produtosExemplo = [
      { id:1, idProduto: 1, nomeProduto: "Produto 1", valorProduto: "2900", qtdProduto: 1, fisicoPrduto: true },
      { id:2, idProduto: 2, nomeProduto: "Produto 2", valorProduto: "4900", qtdProduto: 1, fisicoPrduto: true },
      { id:3, idProduto: 3, nomeProduto: "Produto 3", valorProduto: "1500", qtdProduto: 1, fisicoPrduto: false },
      { id:4, idProduto: 4, nomeProduto: "Produto 4", valorProduto: "3200", qtdProduto: 1, fisicoPrduto: false },
      { id:5, idProduto: 5, nomeProduto: "Produto 5", valorProduto: "2100", qtdProduto: 1, fisicoPrduto: false }
    ];
    localStorage.setItem('listaProdutos', JSON.stringify({ listaGrid: produtosExemplo }));
  }

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
