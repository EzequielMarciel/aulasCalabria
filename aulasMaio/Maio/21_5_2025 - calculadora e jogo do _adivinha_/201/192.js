let display = document.getElementById('display');
let operadorAtual = null;
let primeiroNumero = null;
let operatorPressed = false;
let calculationDone = false;

function inserirNumero(numero) {
    if (operatorPressed || calculationDone) {
        display.value = '';
        operatorPressed = false;
        calculationDone = false;
    }
    display.value += numero;
}
function inserirOperador(operador) {
    if (display.value === '' && primeiroNumero === null) return;
    if (primeiroNumero !== null){
        calcular();
    }
    primeiroNumero = parseFloat(display.value);
    operadorAtual = operador;
    operatorPressed = true;
    calculationDone = false;
}
function inserirDecimal() {
    if (operatorPressed || calculationDone) {
        display.value = '0.';
        operatorPressed = false;
        calculationDone = false
    } else if (!display.value.includes('.')) {
        display.value += '.';
    }
}
function apagarUltimo() {
    if (operatorPressed || calculationDone) {
        return;
    }
    display.value = display.value.slice(0, -1);
}
function calcular() {
    if (primeiroNumero === null || operadorAtual === null 
        || display.value === '') return;
    let segundoNumero = parseFloat(display.value);
    let resultado;
    if (operadorAtual === '+') {
        resultado = primeiroNumero + segundoNumero;
    } else if (operadorAtual === '-') {
        resultado = primeiroNumero - segundoNumero;
    } else if (operadorAtual === '*') {
        resultado = primeiroNumero * segundoNumero
    } else if (operadorAtual === '/') {
        if (segundoNumero === 0) {
            resultado = 'Erro!'
        } else {
            resultado = primeiroNumero / segundoNumero;
        }
    } else {
        resultado = 'Erro!'
    }
    display.value = resultado;
    primeiroNumero = null;
    operadorAtual = null;
    operatorPressed = false;
    calculationDone = true;
}
function limparDisplay() {
    display.value = '';
    primeiroNumero = null;
    operadorAtual = null;
    operatorPressed = false;
    calculationDone = false;
}
