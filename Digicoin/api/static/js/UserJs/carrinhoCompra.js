import Grid from '../grid.js';

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o local storage já contém produtos
  if (!localStorage.getItem('listaProdutos') || (JSON.parse(localStorage.getItem('listaProdutos')).listaGrid || []).length === 0) {
    // Adiciona 5 produtos de exemplo ao local storage
    const produtosExemplo = [
      { id: 1, nome: "Produto 1", valor: "2900", qtd: 2, qtd_estoque: 2, tipo_fisico: true },
      { id: 2, nome: "Produto 2", valor: "4900", qtd: 1, qtd_estoque: 5, tipo_fisico: true },
      { id: 3, nome: "Produto 3", valor: "1500", qtd: 3, qtd_estoque: 10, tipo_fisico: false },
      { id: 4, nome: "Produto 4", valor: "3200", qtd: 1, qtd_estoque: 4, tipo_fisico: false },
      { id: 5, nome: "Produto 5", valor: "2100", qtd: 2, qtd_estoque: 6, tipo_fisico: false }
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
            localStorage.setItem('listaProdutos', JSON.stringify({ listaGrid: grid.listaGrid }));
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
