let score = 0;
const scoreDisplay = document.getElementById('score');
const trapButton = document.getElementById('trapButton');

//Clique = perde pontos
trapButton.addEventListener('click', () => {
    score = Math.max(0, score = - 5);
    scoreDisplay.textContent = score;
    alert('Você clicou! -5 pontos.');
});

//Não clicar = ganha pontos por tempo
setInterval(() => {
    score++;
    scoreDisplay.textContent = score;
}, 1000); //A cada 2 segundos sem clicar, ganha ponto