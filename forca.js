var campoPalavra
var boneco
var quantidadeDeAcertos
var quantidadeDeErros
var statusDoJogo
var letrasDigitadas
var palavraEscolhida
var letrasRestantes
var letrasDaPalavra
var dica
var resultado

window.addEventListener('load', iniciar)

function iniciar () {

    campoPalavra = document.getElementById('campoPalavra')
    document.addEventListener('keydown', apertarEnter)

    boneco = [
        document.getElementById('cabeça'),
        document.getElementById('tronco'),
        document.getElementById('braçoEsquerdo'),
        document.getElementById('braçoDireito'),
        document.getElementById('pernaEsquerda'),
        document.getElementById('pernaDireita'),
        document.getElementById('olhos')
    ]

    novaPalavra()

}

function apertarEnter () {

    let tecla = event.keyCode

    if (tecla == 13) {

        testarLetra()

    }

}

// Escolher palavra

function novaPalavra () {

    campoPalavra.innerHTML = ''
    quantidadeDeAcertos = 0
    quantidadeDeErros = 0
    statusDoJogo = true
    letrasDigitadas = document.getElementById('letrasDigitadas')
    letrasDigitadas.innerHTML = ''
    palavraEscolhida = escolherPalavra()
    letrasRestantes = palavraEscolhida
    
    for (let membros = 0; membros < boneco.length; membros ++) {

        boneco[membros].style.visibility = 'hidden'

    }

    for (let letra = 0; letra < palavraEscolhida.length; letra ++) {

        campoPalavra.innerHTML += '<div class = "letra"></div>'

    }

    procurarHífen()

}

function procurarHífen () {

    let teste = letrasRestantes.match('-')
    letrasDaPalavra = document.getElementsByClassName('letra')

    if (teste != null) {

        let posição = letrasRestantes.search('-')

        while (posição != -1) {

            letrasDaPalavra[posição].innerHTML = `<span>-</span>`
            letrasDaPalavra[posição].setAttribute('class', 'hífen')            
            letrasRestantes = letrasRestantes.replace('-', '')
            posição = letrasRestantes.search('-')

        }

    }

}

function sortearNúmero (quantidade) {

    return Math.floor(Math.random() * quantidade)

}

function escolherClasseDePalavras () {
    
    let númeroAleatório = sortearNúmero(listaDePalavras.length)

    dica = tiposDePalavras[númeroAleatório]
    return listaDePalavras[númeroAleatório]

}

function escolherPalavra () {

    let classeDePalavras = escolherClasseDePalavras()
    let númeroAleatório = sortearNúmero(classeDePalavras.length)

    return classeDePalavras[númeroAleatório].toUpperCase()

}

// Testar letra

function testarLetra () {

    let letraEscolhida = [ document.getElementById('letraEscolhida').value.toUpperCase() ]
    document.getElementById('letraEscolhida').value = ''

    if (statusDoJogo) {

        if (validarLetra(letraEscolhida)) {

            letraEscolhida = procurarLetrasEspeciais(letraEscolhida)
            procurarLetra(letraEscolhida)
    
        } else {
    
            alert('Digite uma letra válida!')
    
        }

    } else {

        alert('O jogo acabou...')
        exibirResultado()

    }

}

function validarLetra (letraEscolhida) {

    if (letraEscolhida.length != 1) {

        return false

    } else if (letrasDigitadas.innerHTML.search(letraEscolhida) != -1) {

        return false

    } else if ('AÁÀÂÃBCÇDEÉÊFGHIÍJKLMNOÓÔÕPQRSTUÚVWXYZ'.search(letraEscolhida) == -1) {

        return false

    } else {

        letrasDigitadas.innerHTML += `${letraEscolhida[0]}, `
        return true

    }

}

function procurarLetrasEspeciais (letraEscolhida) {

    if (letraEscolhida == 'A' || letraEscolhida == 'Á' || letraEscolhida == 'À' || letraEscolhida == 'Â' || letraEscolhida == 'Ã') {

        return [ 'A', 'Á', 'À', 'Â', 'Ã' ]

    } else if (letraEscolhida == 'E' || letraEscolhida == 'É' || letraEscolhida == 'Ê') {

        return [ 'E', 'É', 'Ê' ]

    } else if (letraEscolhida == 'I' || letraEscolhida == 'Í') {

        return [ 'I', 'Í' ]

    } else if (letraEscolhida == 'O' || letraEscolhida == 'Ó' || letraEscolhida == 'Ô' || letraEscolhida == 'Õ') {

        return [ 'O', 'Ó', 'Ô', 'Õ' ]

    } else if (letraEscolhida == 'U' || letraEscolhida == 'Ú') {

        return [ 'U', 'Ú' ]

    } else if (letraEscolhida == 'C' || letraEscolhida == 'Ç') {

        return [ 'C', 'Ç' ]

    } else {

        return letraEscolhida

    }

}

function procurarLetra (letraEscolhida) {

    let acumuladorDeAcertos = 0

    for (let letras = 0; letras < letraEscolhida.length; letras ++) {

        let teste = letrasRestantes.match(letraEscolhida[letras])

        if (teste != null) {

            acumuladorDeAcertos ++

            let posição = letrasRestantes.search(letraEscolhida[letras])

            while (posição != -1) {

                inserirLetra(posição, letraEscolhida[letras])
                letrasRestantes = letrasRestantes.replace(letraEscolhida[letras], ' ')
                
                posição = letrasRestantes.search(letraEscolhida[letras])

            }

        }

    }

    if (acumuladorDeAcertos == 0) {

        mostrarBoneco()

    }

}

function inserirLetra (posição, letraEscolhida) {

    letrasDaPalavra[posição].innerHTML = `<span>${letraEscolhida}</span>`

    testarAcertos()

}

function mostrarBoneco () {

    boneco[quantidadeDeErros++].style.visibility = 'visible'

    testarErros()

}

function testarAcertos () {

    if (++ quantidadeDeAcertos == letrasRestantes.length) {

        resultado = 'venceu'
        statusDoJogo = false

        exibirResultado()
        
    }

}

function testarErros () {

    if (quantidadeDeErros == boneco.length) {

        statusDoJogo = false
        resultado = 'perdeu'

        exibirResultado()

    }

}

function exibirResultado () {

    alert(`Você ${resultado}!`)
    alert(`A palavra era ${palavraEscolhida}.`)

}

function darDica () {

    alert(dica)

}