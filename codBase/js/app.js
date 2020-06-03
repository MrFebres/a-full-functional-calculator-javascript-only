//

var Calculadora = {
  actualizarResultado: function(nuevoResultado) {
    this.mostrarEnPantalla(nuevoResultado)
  },
  calcularResultado: function() {
    var acumulado = this.arregloDeOperaciones[0]
    for (var i = 1; i < this.arregloDeOperaciones.length; i += 2) {
      var operacion = this.arregloDeOperaciones[i]
      var siguienteNumero = this.arregloDeOperaciones[i + 1]
      acumulado = this[operacion](acumulado, siguienteNumero)
    }
    this.actualizarResultado(acumulado)
    this.arregloDeOperaciones = [acumulado]
  },
  resetearVariables: function() {
    this.arregloDeOperaciones = [0]
    this.pusoPunto = false
  },
  resetearCalculadora: function() {
    this.resetearVariables()
    this.mostrarEnPantalla(0)
  },
  mostrarEnPantalla: function(numero) {
    document.getElementById('display').innerHTML = numero.toString().substring(0, 8)
  },
  iniciarAnimaciones: function(){
    function apretarTecla() {
      this.style.transform = 'scale(0.95, 0.95)'
    }

    function liberarTecla() {
      this.style.transform = 'scale(1, 1)'
    }

    document.querySelectorAll('.tecla').forEach(function(tecla) {
      tecla.addEventListener('mousedown', apretarTecla)
      tecla.addEventListener('mouseup', liberarTecla)
      tecla.addEventListener('onkeypress', apretarTecla)
      tecla.addEventListener('onkeyup', liberarTecla)
    })
  },
  init: function() {
    var calculadora = this
    calculadora.iniciarAnimaciones()
    var operaciones = ['mas', 'menos', 'por', 'dividido']
    calculadora.arregloDeOperaciones = [0]
    pusoPunto = false

    document.querySelectorAll('.tecla').forEach(function(element) {
      element.addEventListener('click', function() {
        var tecla = this.id
        var numero = parseInt(tecla)
        var valor = 0
        var ultimaPosicion = calculadora.arregloDeOperaciones.length - 1
        if (isNaN(numero)) {
          if (operaciones.includes(tecla)) {
            var ultimoNumero = calculadora.arregloDeOperaciones[ultimaPosicion]
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
          var ultimoValor = calculadora.arregloDeOperaciones[ultimaPosicion]
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
  on: function(){
    this.resetearCalculadora()
  },
  raiz: function(){
    console.log('No he definido la raiz aun')
  },
  sign: function(){
    this.arregloDeOperaciones[this.arregloDeOperaciones.length - 1] = this.arregloDeOperaciones[this.arregloDeOperaciones.length - 1] * -1
  },
  dividido: function(num1, num2){
    return num1 / num2
  },
  por: function(num1, num2){
    return num1 * num2
  },
  menos: function(num1, num2){
    return num1 - num2
  },
  punto: function(){
    // hacer una verga loca
    pusoPunto = true
  },
  igual: function(){
    this.calcularResultado()
  },
  mas: function(num1, num2){
    return num1 + num2
  }
}

Calculadora.init()
