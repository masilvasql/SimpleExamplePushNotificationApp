import axios from 'axios'

var resultado = []

function atualizaBusca() {
    setInterval(() => {
        console.log('veio aqui')
    return new Promise(dado => {
        
            axios.get('http://10.1.1.154:5000/auth/usuariosCadastrados').then(resp => {
                dado(resp.data) 
            })
        })
    }, 5000)

}




export { atualizaBusca, resultado }