const aplicarBtn = document.getElementById('aplicarBtn');
const toggleTheme = document.getElementById('toggleTheme');
const inputCor = document.getElementById('inputCor');
const mensagem = document.getElementById('mensagem');

const coresValidas = [
    'Vermelho',
    'azul',
    "verde",
    'amarelo',
    'preto',
    'branco',
    'rosa',
    'laranja',
    'roxo',
    'cinza',
    'marrom',
    'ciano',
    'dourado',
    'prata'
];

//Mapeamento das cores para o css
const coresMapeadas = {
    Vermelho: 'red',
    azul: 'blue',
    verde: 'green',
    amarelo: 'yellow',
    preto: 'black',
    branco: 'white',
    rosa: 'pink',
    laranja: 'orange',
    roxo: 'purple',
    cinza: 'grey',
    marrom: 'brown',
    ciano: 'cyan',
    dourado: 'gold',
    prata: 'silver'
};

aplicarBtn.addEventListener('click', () => {
    const cor = inputCor.value.toLowerCase().trim();

    if (coresValidas.includes(cor)) {
        const corCSS = coresMapeadas[cor];
        document.body.style.backgroundColor = corCSS;
        mensagem.textContent = `Cor aplicada: ${cor}`;
        mensagem.style.color = cor === 'preto' ? '#fff' : '#000';
    } else {
        mensagem.textContent = 'Cor não reconhecida.';
        mensagem.style.color = 'red';
    }
});

toggleTheme.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    toggleTheme.textContent = document.body.classList.contains('dark') ? '☻' : '☺';


//Restaura fundo original do tema
if (document.body.classList.contains('dark')) {
    document.body.style.backgroundColor = '';
} else {
    document.body.style.backgroundColor = ''
};
});