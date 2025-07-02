let velocidade = 0;
const marcador = document.getElementById('marcador');
const ponteiro = document.getElementById('ponteiro');
//Atualixa os seletores para os novos IDs dos pedais
const acelerarBtn = document.getElementById('pedal-acelerador');
const frearBtn = document.getElementById('pedal-freio');
const toggleBtn = document.getElementById('toggleTheme');

function atualizarVelocimetro() {
    marcador.textContent = `${velocidade} km/h`;
    //COnverte de 0-100 para -90° a 90°
    //o ângulo do ponteiro deve ir de -90 (0 km/h) a +90 (100 km/h) 
    const angulo = (velocidade / 100) * 180 - 90;
    ponteiro.style.transform = `translateX(-50%) rotate(${angulo}deg)`;
};
//Adicionando funcionalidade para o acelerador
acelerarBtn.addEventListener('click', () => {
    if (velocidade < 100) {
        velocidade += 10;
        atualizarVelocimetro()
    }
});
//Adicionando funcionalidade para o freio
frearBtn.addEventListener('click', () => {
    if (velocidade > 0) {
        velocidade -= 10;
        atualizarVelocimetro()
    }
});
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleTheme.textContent = document.body.classList.contains('dark') ? '☻' : '☺';
});
atualizarVelocimetro();