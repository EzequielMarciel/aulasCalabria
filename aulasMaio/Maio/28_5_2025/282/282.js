const bola = document.getElementById('bola'); // Seleciona a bola
const toggleTheme = document.getElementById('toggleTheme'); 
// Seleciona o botão de alternância de tema
const container = document.querySelector('.container'); 
// Seleciona o container onde a bola se move
let isDragging = false; // Variável para controlar se a bola está sendo arrastada
let offsetX = 0; // Variáveis para armazenar a posição do mouse em relação à bola
let offsetY = 0; // Variáveis para armazenar a posição e velocidade da bola
let posX = 0; // Posição inicial da bola
let posY = 0; // Posição inicial da bola
let velocity = 0; // Velocidade inicial da bola, 0 significa que a bola não está se movendo
let gravity = 0.5; //Gravidade que afeta a bola
let bounce = 1; //Fator de quique da bola, quanto maior, mais alto ela quica
// A bola quica quando solta, e a velocidade diminui com o tempo
let animationFrame; // Variável para armazenar o ID do requestAnimationFrame

// Função para definir a posição da bola
function setBolaPosition(x,y) {
    bola.style.left = `${x}px`;
    bola.style.top = `${y}px`;
};
// Inicializa a posição da bola no centro do container
bola.addEventListener('mousedown', (e) => {
    isDragging = true;
    cancelAnimationFrame(animationFrame);
    bola.classList.add("dragging");
    const rect = bola.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});
// Atualiza a posição da bola enquanto arrasta
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;
    const maxX = container.offsetWidth - bola.offsetWidth;
    const maxY = container.offsetHeight - bola.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    posX = x;
    posY = y;
    
    setBolaPosition(x, y);
});
document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    bola.classList.remove("dragging");
   
    velocity = 0;
    quicar();
});
function quicar() {
    const chao = container.offsetHeight - bola.offsetHeight;
    function animar() {
        velocity += gravity;
        posY += velocity;

        if (posY >= chao) {
            posY = chao;
            velocity *= -bounce;

            if (Math.abs(velocity) < 2) {
                cancelAnimationFrame(animationFrame);
                return;
            }
        }
        setBolaPosition(posX, posY);
        animationFrame = requestAnimationFrame(animar)
    }
    animationFrame = requestAnimationFrame(animar);
}
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleTheme.textContent = document.body.classList.contains('dark') ? "☺" : "☻";
});