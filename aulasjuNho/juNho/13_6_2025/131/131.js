const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryContainer = document.querySelector('.gallery-container');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeButton = document.querySelector('.close-button');

let counter = 0;
let itemWidth = 0; //Largura de um item da galeria
let containerWidth = 0; //Largura do contêiner visivel
let gap = 0; //Espaço entre os itens
//Função para calcular e atualizar as dimensões
function updateDimensions() {
    if (galleryItems.length > 0) {
        //Use offset width para obter a largura total do item (incluindo padding)
        itemWidth = galleryItems[0].offsetWidth;
    }
    containerWidth = galleryContainer.clientWidth; //Largura do container visível
    //Tenta obter gap do estilo computado
    const galleryStyle = window.getComputedStyle(gallery);
    //parseFloat converte o valor do gap para um número
    gap = parseFloat(galleryStyle.gap) || 0;
}
function scrollToImage(index) {
    //Garante que o índice esteja dentro dos limites
    index = Math.max(0, Math.min(index, galleryItems.length - 1));
    counter = index;
    //Calcula a posição do início do item atual, incluindo os gaps anteriores
    //Cada item ocupa itemWidth + gap (exceto o último gap)
    const itemOffset = counter * (itemWidth + gap);
    //Translação = (containerWidth / 2) - (itemOffset + itemWidth / 2)
    //Simplificando: Translação = containerWidth / 2 - itemWidth / 2 - itemOffset
    const translation = (containerWidth / 2) -
    (itemWidth / 2) - itemOffset;

    gallery.style.transform = `translateX(${translation}px)`
};
//Inicializa as dimensões e posiciona na primeira imagem
updateDimensions();
scrollToImage(0);

nextButton.addEventListener('click', () => {
    if (counter < galleryItems.length - 1) {
        scrollToImage(counter + 1);
    }
});
prevButton.addEventListener('click', () => {
    if (counter > 0) {
        scrollToImage(counter - 1)
    }
});
//Event listener para o lightbox (agora nos gallery-items)
galleryItems.forEach((item, index) => {
    const image = item.querySelector('img'); //Pega imagem dentro do item
    image.addEventListener('click', () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add('active');
    });
});
closeButton.addEventListener('click', () => {
    lightbox.classList.remove('active');
});
lightbox.addEventListener('click', (event) => {
    //Fecha a lightBox se o click for fora da imagem
    if (event.target === lightbox) {
        lightbox.classList.remove('active');
    }
});
//Atualiza as dimensões e reposiciona a galeria em caso de redimencionamento
window.addEventListener('resize', () => {
    updateDimensions(); //Recalcula as dimensões
    scrollToImage(counter); //Reposiciona a galeria com base no índice atual
});
