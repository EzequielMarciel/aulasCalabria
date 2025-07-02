const tabuleiroJogo = document.getElementById('gameBoard');
const exibicaoStatus = document.getElementById('status');
const botaoReiniciar = document.getElementById('resetButton');
const botaoIniciar = document.getElementById('startButton');
const alteradorTema = document.getElementById('themeToggle');

let estadoTabuleiro =  ['','','','','','','','',''];
let jogadorAtual = 'x';
let jogoAtivo = false;
let jogoIniciado = false;
//mensagens de status
const mensagemVitoria = () => `jogador ${jogadorAtual} ganhou!`;
const mensagemEmpate = () => `Deu velha!`;
const mensagemVezJogadorAtual = () => `Vez do jogador ${jogadorAtual}`;
//Indice das células
const condicoesVitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
//Inicializa o tabuleiro criando as células
function inicializarTabuleiro() {
if (!jogoIniciado) {//Cria as células apenas uma vez
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; //Armazena o índice da célula
        cell.addEventListener('click', lidarComCliqueNaCelula);
        tabuleiroJogo.appendChild(cell);
    }
    jogoIniciado = true;
    } else {//Se o tabuleiro já existe apenas limpa o texto 
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

estadoTabuleiro = ['','','','','','','','',''];
jogadorAtual = 'x';
jogoAtivo = true; //Ativa o jogo
exibicaoStatus.textContent = mensagemVezJogadorAtual();
tabuleiroJogo.style.display = 'grid';
botaoReiniciar.style.display = 'block';
botaoIniciar.style.display = 'none';
}
//lida com o clique em uma célula
function lidarComCliqueNaCelula(event) {
    const clickedCell = event.target;
    const clickedCellIndex = pasrseInt(clickedCell.dataset.index);

    //Verifica se a jogada é válida (jogo ativo e célula vazia)
    if (estadoTabuleiro[clickedCellIndex] !== '' || !jogoAtivo) {
        return;
    }
    //Faz a jogada (lógica integrada de handlePlayerChange)
    estadoTabuleiro[clickedCellIndex] = jogadorAtual;
    clickedCell.textContent = jogadorAtual;

    verificarResultado();//Chama a função
}
//Verifica se há um vencedor ou empate

function verificarResultado() {
    let roundWon = false;
    for (let i = 0; i < condicoesVitoria.length; i++) {
     const winCondition = condicoesVitoria[i];
     let a = estadoTabuleiro[winCondition[0]];
     let b = estadoTabuleiro[winCondition[1]];
     let c = estadoTabuleiro[winCondition[2]];
     if (a === '' || b === '' || c === '') {
        continue; //pular se alguma célula estiver vazia
     }   
    if (a === b && b === c) {
        roundWon = true;
        break;
    }
}
if (roundWon) {
    exibicaoStatus.textContent = mensagemVitoria();
    jogoAtivo = false;
    return;
}
//Verifica por empate
if (!estadoTabuleiro.includes('')) {
    exibicaoStatus.textContent = mensagemEmpate();
    jogoAtivo = false;
    return;
}
//Se não há vencedor e não ouve empate então altera o jogador
jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
exibicaoStatus.textContent = mensagemVezJogadorAtual();
}
//Reinicia o jogo
function reiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = 'x';
    estadoTabuleiro = ['','','','','','','','',''];
    exibicaoStatus.textContent = mensagemVezJogadorAtual();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = ''); //limpa o texto
}
//função para alterar o tema
function alterarTema() {
    document.body.classList.toggle('dark-mode');
    //Salva a preferência do usuário no localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}
//Verifica o tema salvo no localStorage ao carregar a página
function aplicarTemaSalvo() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        alterarTema.checked = true; //Marca o switch se o tema funcionar
    } else {
        document.body.classList.remove('dark-mode');
        alterarTema.checked = false;
    }
}
//Adiciona o listener para o botão de reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo);
//Adiciona o listener para o botao de iniciar
botaoIniciar.addEventListener('click', inicializarTabuleiro);
//Adiciona o listener para o checkBox do switch de tema
alteradorTema.addEventListener('click', aplicarTemaSalvo);
//Esconde  o tabuleiro e o botao de reiniciar no inicio
tabuleiroJogo.style.display = 'none';
botaoReiniciar.style.display = 'none';
exibicaoStatus.style.display = 'none';
exibicaoStatus.textContent = 'Clique em iniciar o jogo';