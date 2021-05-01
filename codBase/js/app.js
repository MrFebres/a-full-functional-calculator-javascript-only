const Calculadora = {
  actualizarResultado: (nuevoResultado) => { this.mostrarEnPantalla(nuevoResultado) },
  calcularResultado: () => {
    let acumulado = this.arregloDeOperaciones[0]
    for (let i = 1; i < this.arregloDeOperaciones.length; i += 2) {
      let operacion = this.arregloDeOperaciones[i]
      let siguienteNumero = this.arregloDeOperaciones[i + 1]
      acumulado = this[operacion](acumulado, siguienteNumero)
    }
    this.actualizarResultado(acumulado)
    this.arregloDeOperaciones = [acumulado]
  },
  resetearVariables: () => {
    this.arregloDeOperaciones = [0]
    this.pusoPunto = false
  },
  resetearCalculadora: () => {
    this.resetearVariables()
    this.mostrarEnPantalla(0)
  },
  mostrarEnPantalla: (numero) => {
    document.getElementById('display').innerHTML = numero.toString().substring(0, 8)
  },
  iniciarAnimaciones: () => {
    const apretarTecla = () => {
      this.style.transform = 'scale(0.95, 0.95)'
    }

    const liberarTecla = () => {
      this.style.transform = 'scale(1, 1)'
    }

    document.querySelectorAll('.tecla').forEach(tecla => {
      tecla.addEventListener('mousedown', apretarTecla)
      tecla.addEventListener('mouseup', liberarTecla)
      tecla.addEventListener('onkeypress', apretarTecla)
      tecla.addEventListener('onkeyup', liberarTecla)
    })
  },
  init: () => {
    let calculadora = this
    calculadora.iniciarAnimaciones()
    let operaciones = ['mas', 'menos', 'por', 'dividido']
    calculadora.arregloDeOperaciones = [0]
    pusoPunto = false

    document.querySelectorAll('.tecla').forEach(element => {
      element.addEventListener('click', () => {
        let tecla = this.id
        let numero = parseInt(tecla)
        let valor = 0
        let ultimaPosicion = calculadora.arregloDeOperaciones.length - 1
        if (isNaN(numero)) {
          if (operaciones.includes(tecla)) {
            let ultimoNumero = calculadora.arregloDeOperaciones[ultimaPosicion]
            if (tecla === 'dividido' && ultimoNumero === 0) {
              window.alert('No se puede dividir entre cero.')
            }
            else if (ultimoNumero === 0 && ultimaPosicion > 0) {
              calculadora.arregloDeOperaciones[ultimaPosicion - 1] = tecla
            } else {
              calculadora.arregloDeOperaciones.push(tecla)
              calculadora.arregloDeOperaciones.push(0)
            }
          } else {
            calculadora[tecla]()
          }
        } else {
          let ultimoValor = calculadora.arregloDeOperaciones[ultimaPosicion]
          if (pusoPunto) {

          } else {
            valor = (ultimoValor * 10) + numero
            calculadora.arregloDeOperaciones[ultimaPosicion] = valor
          }
        }
        if (tecla !== 'igual') {
          calculadora.mostrarEnPantalla(valor)
        }
        console.log(calculadora.arregloDeOperaciones)
      })
    })
  },
  on: () => { this.resetearCalculadora() },
  raiz: () => { console.log('No he definido la raiz aun') },
  sign: () => {
    this.arregloDeOperaciones[this.arregloDeOperaciones.length - 1] = this.arregloDeOperaciones[this.arregloDeOperaciones.length - 1] * -1
  },
  dividido: (num1, num2) => num1 / num2,
  por: (num1, num2) => num1 * num2,
  menos: (num1, num2) => num1 - num2,
  punto: () => {
    // hacer una verga loca
    pusoPunto = true
  },
  igual: () => { this.calcularResultado() },
  mas: (num1, num2) => num1 + num2
}

Calculadora.init()
