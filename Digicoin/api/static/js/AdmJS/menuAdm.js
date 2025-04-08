
function exibirMenu() {
    var lateral = document.getElementById('lateral')

    if (lateral.classList.contains('displayOff')) {
        lateral.classList.remove('displayOff')
        lateral.classList.add('displayOn')
       
      } 
  }

function esconderMenu(){
    var lateral = document.getElementById('lateral')
    if (lateral.classList.contains('displayOn')){
        lateral.classList.add('displayOff')
        lateral.classList.remove('displayOn') 

    }

}

document.getElementById('arrowLeft').addEventListener('click', esconderMenu)
document.getElementById('groupAdmin').addEventListener('click', exibirMenu)
