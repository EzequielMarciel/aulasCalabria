const toggleTheme = document.getElementById('toggleTheme');
const luzes = document.getElementById('luzes');
const toggleLuzes = document.getElementById('toggleLuzes');
const trocarModo = document.getElementById('trocarModo');
const cores = ['red', 'blue', 'lightGreen', 'green'];
let ligadas = true;
let modoAtual = 1;
const totalModos = 3;

function criarLuzes() {
    luzes.innerHTML = '';
    luzes.className = `modo-${modoAtual}`;
    const pontos = [
    [500,490], [510, 380], [550, 480], [610, 600], [380, 390],
    [420,270], [475, 700], [470, 330], [430, 560], [400, 490],
    [450, 340], [500, 300], [310, 510]
];
pontos.forEach((pos, i) => {
    const luz = document.createElement('div');
    luz.classList.add('luz');
    luz.style.backgroundColor = cores[i % cores.length];
    luz.style.left = `${pos[0]}px`;
    luz.style.top = `${pos[1]}px`;
    luz.style.setProperty('--rand', Math.floor(Math.random() * 10));
    luzes.appendChild(luz)
});
}

toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleTheme.textContent = 
    document.body.classList.contains('dark') ? '☻' : '☺';
});

toggleLuzes.addEventListener('click', () =>{
    ligadas = !ligadas;
    document.querySelectorAll('.luz').forEach(luz => {
        luz.style.animationPlayState = ligadas ? 'running' : 'paused';
        luz.style.opacity = ligadas ? '1' : '0.3';
});

    toggleLuzes.textContent = ligadas ? 'Desligar Luzes' : 'Ligar Luzes';
});

trocarModo.addEventListener('click', () => {
    modoAtual = (modoAtual % totalModos) + 1;
    const nomes = ['Alternado', 'Aleatório', 'Ondas'];
    trocarModo.textContent = `Modo: ${nomes[modoAtual - 1]}`;
    criarLuzes();
});
criarLuzes();