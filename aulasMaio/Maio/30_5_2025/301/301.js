const btnRolar = document.getElementById("rolar");
const imgDado = document.getElementById("dado");
const toggleTheme = document.getElementById("toggleTheme"); 
// Este event listener adiciona a funcionalidade de rolar o dado
btnRolar.addEventListener("click", () => {
    // Gera um número aleatório entre 1 e 6
    const numero = Math.floor(Math.random() * 6) + 1;
    // Atualiza a imagem do dado com o número gerado
    imgDado.src = `dados/d${numero}.png`;
    // Aplica uma rotação aleatória à imagem do dado
    imgDado.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent = 
    document.body.classList.contains("dark") ? "☻" : "☺";
});