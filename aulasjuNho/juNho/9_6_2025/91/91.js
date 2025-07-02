const listaFavoritos = document.getElementById('listaFavoritos');
const toggleTheme = document.getElementById('toggleTheme');
let itens = [
    'café cappuccino',
    'musica rock e heavy metal',
    'filmes de ficção científica',
    'jogos indies de plataforma',
    'livros de literatura clássica',
    'festa de aniversario com amigos',
    'chocolate meio amargo',
    'caminhadas ao ar livre',
];
function renderizarLista() {
    listaFavoritos.innerHTML = '';
    itens.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${item}</span>
        <div class="botoes">
            <button onclick="mover(${index}, -1)">↑</button>
            <button onclick="mover(${index}, 1)">↓</button>
        </div>
        `;
        listaFavoritos.appendChild(li);
    });
};
function mover (index, direcao) {
    const novoIndex = index + direcao;
    if (novoIndex < 0 || novoIndex >= itens.length) return;
    [itens[index], itens[novoIndex]] = [itens[novoIndex], itens[index]];
    renderizarLista();
};
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleTheme.textContent = 
    document.body.classList.contains('dark') ? '☺' : '☻';
});
renderizarLista();