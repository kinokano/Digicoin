import Grid from '../grid.js';

document.addEventListener("DOMContentLoaded", () => {
  const grid = [ // Simula o carrinho
    {
      id: 1,
      nome: "Produto 1",
      valor: "2900",
      qtd: 2,
      qtd_estoque: 2,
      tipo_fisico: true
    },
    {
      id: 2,
      nome: "Produto 2",
      valor: "4900",
      qtd: 1,
      qtd_estoque: 5,
      tipo_fisico: false
    }
  ];

  const config = {
    idGrid: "itensGrid", // ID do contêiner onde a grid será renderizada
    idSortBotao: "#btOrdenar", // Id do Seletor dos botões de ordenação
    // idInputBusca: "#campoBusca", // Id do Seletor do campo de busca
    // idPaginacao: "paginacao", // ID do contêiner de paginação
    itensPorPagina: 15, // Quantidade de itens por pagina
    formatarGrid: (item) => {
      let valor = parseFloat(item.valor); // passa o valor para float
      let qtd = parseInt(item.qtd); // passa a quantidade para int
      let qtdEstoque = parseInt(item.qtd_estoque); // passa a quantidade de estoque para int
      let totalProduto = qtd * valor;
      let gridRow = `
        <td data-label="Produto">${item.nome}</td>
        <td data-label="Valor"><span class="cor-moeda">D$</span> <span class="cor-valor">${totalProduto}</span></td>
        <td data-label="Ações"><button class="botao-remover" data-id="${item.id}"><img src="${imgRemoverSrc}"></button></td>
      `;
      return gridRow;
    },
    addEventosGrid: (listaGrid,grid) => {
      listaGrid.forEach((item) => {
        const inputQtd = document.querySelector(`input[data-id="${item.id}"]`);
        const botaoRemover = document.querySelector(`button[data-id="${item.id}"]`);
        if (inputQtd) {
          inputQtd.addEventListener('change', (event) => {
            verificarValorMaxInput(event.target);
            grid.atualizarQtdItensGrid(item.id, event.target.value);
          });
        }
        if (botaoRemover) {
          botaoRemover.addEventListener('click', () => {
            grid.removerItensGrid(item.id);
          });
        }
      });
    },
    atualizarTotal: () => {
      let valorTotalCarrinho = 0;
      grid.forEach((item) => {
        let valor = parseFloat(item.valor);
        let qtd = parseInt(item.qtd);
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
