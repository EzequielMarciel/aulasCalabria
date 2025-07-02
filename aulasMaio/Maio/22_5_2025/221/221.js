const imagens = ['C.jpg', 'E.jpg', 'OIP.jpg'];
let indiceAtual = 0;
const imagemElemento = document.getElementById('imagemAtual');
const botaoAnterior = document.getElementById('anterior');
const botaoProximo = document.getElementById('proximo');

function atualizarImagem() {
    imagemElemento.src = imagens[indiceAtual];
}
function mostrarProximaImagem () {
    if (indiceAtual < imagens.length - 1) {
        indiceAtual++;
    } else {
        indiceAtual = 0;
    }
    atualizarImagem();
}
function mostrarImagemAnterior() {
    if (indiceAtual > 0) {
        indiceAtual--;
    } else {
        indiceAtual = imagens.length - 1;
    }
    atualizarImagem();
}
botaoProximo.addEventListener('click', mostrarProximaImagem);
botaoAnterior.addEventListener('click', mostrarImagemAnterior);
atualizarImagem();