const produtos  = [ // Lista de produtos com detalhes
    {nome: 'Camiseta', detalhes:
        {preco: 25.99, estoque: 50} },
    {nome: 'Calça', detalhes: 
        {preco: 79.90, estoque: 30} },
    {nome: 'Tênis Esportivo', detalhes: 
        {preco: 199.90, estoque: 20} },
    {nome: 'Boné', detalhes: 
        {preco:39.90, estoque: 60} },
    {nome: 'Jaqueta', detalhes:
        {preco: 159.90, estoque: 15} },
    {nome: 'Meias (par)', detalhes: 
        {preco: 9.90, estoque: 100} },
    {nome: 'Relógio', detalhes:
        {preco: 299.90, estoque: 10} },
    {nome: 'Óculos de Sol', detalhes:
        {preco: 89.90, estoque: 25} },
    {nome: 'Cinto', detalhes:
        {preco: 49.90, estoque: 40} },
    {nome: 'Mochila', detalhes:
        {preco: 120.90, estoque: 18} },
];
// Exibe a lista de produtos e detalhes ao clicar 
//, com opção de voltar
const listaProdutosElement = document.getElementById
('listaProdutos'); 
const detalhesProdutoElement = document.getElementById
('detalhesProduto');
function mostrarDetalhes(produto) {
    listaProdutosElement.style.display = 'none';
    detalhesProdutoElement.innerHTML = `
        <h2>Detalhes: ${produto.nome}</h2>
        <p>Preço: R$ ${produto.detalhes.preco.toFixed(2)}</p>
        <p>Estoque: ${produto.detalhes.estoque}</p>
        <button onclick="esconderDetalhes()">Voltar</button>
    `;
    detalhesProdutoElement.style.display = 'block';
};
function esconderDetalhes() {
    detalhesProdutoElement.style.display = 'none';
    listaProdutosElement.style.display = 'block';
};
window.onload = function() {
    produtos.forEach(produto => {
        const itemLista = document.createElement('li');
        itemLista.textContent = produto.nome;
        itemLista.classList.add('item-produto');
        itemLista.onclick = () => mostrarDetalhes(produto);
        listaProdutosElement.appendChild(itemLista);
    });
};