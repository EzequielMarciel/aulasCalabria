function iniciarJogoDaCobra() {
  const tela = document.getElementById("gameCanvas");
  const desenho = tela.getContext("2d");
  const tamanhoCelula = 20; // Dimensões de cada bloco da cobra

  // A cobra é representada por uma lista de blocos (cada um com coordenadas x e y)
  let partesCobra = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
  ];

  // Define a direção inicial: a cobra vai para a direita
  let deslocamentoX = tamanhoCelula;
  let deslocamentoY = 0;

  // Função para criar uma posição aleatória para a comida, garantindo que ela não apareça onde já existe um bloco da cobra
  function gerarComida() {
    let posicaoValida = false;
    let posicaoComida;
    
    while (!posicaoValida) {
      const x = Math.floor(Math.random() * (tela.width / tamanhoCelula)) * tamanhoCelula;
      const y = Math.floor(Math.random() * (tela.height / tamanhoCelula)) * tamanhoCelula;
      posicaoComida = { x, y };
      
      // Verifica se algum bloco da cobra está na posição gerada.
      posicaoValida = !partesCobra.some(bloco => bloco.x === x && bloco.y === y);
    }
    
    return posicaoComida;
  }

  // Define a comida inicialmente
  let comida = gerarComida();

  // Função para desenhar a comida no canvas
  function desenharComida() {
    desenho.fillStyle = "red";
    desenho.fillRect(comida.x, comida.y, tamanhoCelula, tamanhoCelula);
  }

  // Altera a direção com base nas teclas pressionadas, evitando reversão rápida
  document.addEventListener("keydown", function(tecla) {
    if (tecla.key === "ArrowUp" && deslocamentoY === 0) {
      deslocamentoX = 0;
      deslocamentoY = -tamanhoCelula;
    } else if (tecla.key === "ArrowDown" && deslocamentoY === 0) {
      deslocamentoX = 0;
      deslocamentoY = tamanhoCelula;
    } else if (tecla.key === "ArrowLeft" && deslocamentoX === 0) {
      deslocamentoX = -tamanhoCelula;
      deslocamentoY = 0;
    } else if (tecla.key === "ArrowRight" && deslocamentoX === 0) {
      deslocamentoX = tamanhoCelula;
      deslocamentoY = 0;
    }
  });

  function atualizarJogo() {
    // Calcula a nova posição da cabeça da cobra
    const novaCabeca = {
      x: partesCobra[0].x + deslocamentoX,
      y: partesCobra[0].y + deslocamentoY
    };

   
    // Verifica colisão com as bordas do canvas
    if (
      novaCabeca.x < 0 ||
      novaCabeca.x >= tela.width ||
      novaCabeca.y < 0 ||
      novaCabeca.y >= tela.height
    ) {
      clearInterval(intervaloJogo);
      alert("NOOB");
      return;
    }

    // Verifica se a nova cabeça colide com algum segmento do corpo da cobra
    if (partesCobra.some(segmento => segmento.x === novaCabeca.x && segmento.y === novaCabeca.y)) {
      clearInterval(intervaloJogo);
      alert("Game Over: A cobra colidiu com o próprio corpo.");
      return;
    }

    // Se a nova cabeça colidir com a comida, reposiciona-a e simula o crescimento (não remove o último bloco)
    if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
      partesCobra.unshift(novaCabeca); // Cresce a cobra adicionando a nova cabeça
      comida = gerarComida();           // Reposiciona a comida
    } else {
      partesCobra.unshift(novaCabeca);
      partesCobra.pop();
    }
    
    // Limpa o canvas
    desenho.clearRect(0, 0, tela.width, tela.height);
    
    // Desenha a cobra
    desenho.fillStyle = "green";
    partesCobra.forEach(function(bloco) {
      desenho.fillRect(bloco.x, bloco.y, tamanhoCelula, tamanhoCelula);
    });

    // Desenha a comida
    desenharComida();
  }

  // Executa o jogo a cada 100 milissegundos
  const intervaloJogo = setInterval(atualizarJogo, 100);
}

    // Função de reinício: recarrega a página para reinicializar todo o jogo
    function reiniciarJogo() {
      location.reload();
    }

// Chama a função para iniciar o jogo
iniciarJogoDaCobra();
