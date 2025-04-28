
async function historicoSaldoById() {
  try {
    
    const idUsuario = 1;
    const url = `/api/user/${idUsuario}/historico-saldo/`;

    // apiRequest já devolve JSON
    const data = await apiRequest(url, 'GET', null, {});

    if (data) {
      return data.ultimas_alteracoes;
    } else {
      console.error('Nenhum dado retornado.');
    }
  } catch (error) {
    console.error('Erro ao buscar histórico de saldo:', error);
  }
}


// var historico = await historicoSaldoById();
// var divhistorico = document.getElementById("historico");

// historico.forEach(element => {
//     divhistorico.innerHTML += `<p>${element.diferenca}</p>`
// });

async function historicoSaldoByUserLogado(params) {
    try{
        const url = '/api/user/historico-saldo/';
        const data = await apiRequest(url, 'GET', null, {});
        if(data){
            return data.ultimas_alteracoes;
        }else{
            console.error('Nenhum dado retornado.');
        }
    }catch(error){
        console.error('Erro ao buscar histórico de saldo:', error);
    }

}

var historico = await historicoSaldoByUserLogado();
var divhistorico = document.getElementById("historico");

historico.forEach(element => {
    divhistorico.innerHTML += `<p>${element.diferenca}</p>`
});