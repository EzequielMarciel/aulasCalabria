let gameState = "start";
let inimigoSelecionado = null;
let item = null;

const player = {
  hp: 100,
  attack: 15
};

const sorte = ['inimigo', 'bau'];

const Bau = [
  { name: 'escudo', defesa: 5 },
  { name: 'areia', defesa: 9 }
];

const todosOsInimigos = [
  { name: "Goblin", hp: 30, attack: 5, defesa: 2 },
  { name: "Esqueleto", hp: 25, attack: 7, defesa: 3 },
  { name: "um Orc", hp: 40, attack: 10, defesa: 4 },
  { name: "um Zumbi", hp: 35, attack: 6, defesa: 3 },
  { name: "O Cavaleiro Sombrio", hp: 50, attack: 12, defesa: 8 },
  { name: "um mimic", hp: 20, attack: 25, defesa: 1 },
  { name: "XD", hp: 20, attack: 80, defesa: 16 }
];

let inimigosRestantes = todosOsInimigos.map(inimigo => ({ ...inimigo }));

function selecionarInimigoAleatorio() {
  const index = Math.floor(Math.random() * inimigosRestantes.length);
  return inimigosRestantes[index];
}

function eliminarInimigo(inimigo) {
  inimigosRestantes = inimigosRestantes.filter(entry => entry.name !== inimigo.name);

  if (inimigosRestantes.length === 0) {
    displayMessage("Você venceu todos os inimigos! 🎉 Fim da jornada.");
    gameState = "fim";
    setTimeout(() => reiniciarJogo(), 3000);
  } else {
    displayMessage(`Restam ${inimigosRestantes.length} inimigos. Continue avançando.`);
    gameState = "start";
  }
}

function reiniciarJogo() {
  player.hp = 100;
  delete player.defesa;
  inimigosRestantes = todosOsInimigos.map(inimigo => ({ ...inimigo }));
  gameState = "start";
  displayMessage("Novo ciclo iniciado. Que venham os monstros!");
}

function sorteSelecionada() {
  const azar = Math.floor(Math.random() * sorte.length);
  return sorte[azar];
}

function selecao() {
  const index = Math.floor(Math.random() * Bau.length);
  return Bau[index];
}

function displayMessage(text) {
  const messageArea = document.getElementById("messageArea");
  const newMessage = document.createElement("div");
  newMessage.className = "message";
  newMessage.textContent = text;
  messageArea.appendChild(newMessage);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function handleInput() {
  const inputElem = document.getElementById("input");
  const command = inputElem.value.trim().toLowerCase();
  inputElem.value = "";
  processCommand(command);
}

if (gameState === 'start') {
  displayMessage('Rise and Shine')
}
//Adicionando funcionalidade aos comandos
function processCommand(command) {
  if (gameState === "start") {
    if (command === "passo") {
      const evento = sorteSelecionada();
      if (evento === "inimigo") {
        inimigoSelecionado = selecionarInimigoAleatorio();
        displayMessage("Você encontra um " + inimigoSelecionado.name + "!");
        gameState = "combat";
      } else if (evento === "bau") {
        item = selecao();
        displayMessage("Tu encontras " + item.name + ". O que vai fazer?");
      }
    }
  }
//Comando para pegar o escudo
  if (command === "pegarescudo" || command === "pegar escudo") {
    if (item && item.name === "escudo") {
      player.defesa = item.defesa;
      item.defesa += player.defesa
      displayMessage("isto vai te doer o braço Sua defesa agora é " + player.defesa + ".");
      item = null;
    } else {
      displayMessage("sem escudos");
    }
  }

if (command === '?') {
  displayMessage('Bem vindo ao rpg de texto inacabado começado em 16/6/2025 e terminado em 24/6/2025.')
}
//Comando para pegar o Shukaku
  if (command === "pegarareia" || command === "pegar areia") {
    if (item && item.name === "areia") {
      player.defesa = item.defesa;
      item.defesa += player.defesa
      displayMessage("Por que ela te defende? defesa: " + player.defesa + ".");
      item = null;
    } else {
      displayMessage("Só tinha esta pequena cabaça!");
    }
  }

  if (gameState === "combat") {
    if (command === "atacar") {
      const playerDamage = Math.floor(Math.random() * player.attack) + 1;
      inimigoSelecionado.hp -= playerDamage;
      displayMessage("Você ataca o " + inimigoSelecionado.name + " causando " + playerDamage + " de dano.");

      if (inimigoSelecionado.hp > 0) {
        let enemyDamage = Math.floor(Math.random() * inimigoSelecionado.attack) + 1;
        if (player.defesa) enemyDamage = Math.max(0, enemyDamage - player.defesa);
        player.hp -= enemyDamage;
        displayMessage("O " + inimigoSelecionado.name + " ataca você causando " + enemyDamage + " de dano.");

        if (player.hp <= 0) {
          displayMessage("noob.");
          gameState = "end";
          reiniciarJogo();
        } else {
          displayMessage("Sua vida: " + player.hp + " HP | " + inimigoSelecionado.name + " vida: " + inimigoSelecionado.hp + " HP");
        }
      } else {
        displayMessage("Você derrotou o " + inimigoSelecionado.name + "!");
        eliminarInimigo(inimigoSelecionado);
      }
    }

     if (command === "joelhada") {
      const playerDamage = Math.floor(Math.random() * player.attack) + 6;
      inimigoSelecionado.hp -= playerDamage;
      displayMessage("O " + inimigoSelecionado.name + " recebe " + playerDamage + " de dano. Doeu em mim");

      if (inimigoSelecionado.hp > 0) {
        let enemyDamage = Math.floor(Math.random() * inimigoSelecionado.attack) + 1;
        if (player.defesa) enemyDamage = Math.max(0, enemyDamage - player.defesa);
        player.hp -= enemyDamage;
        displayMessage("O " + inimigoSelecionado.name + " ataca você causando " + enemyDamage + " de dano.");

        if (player.hp <= 0) {
          displayMessage("noob.");
          gameState = "end";
          reiniciarJogo();
        } else {
          displayMessage("Sua vida: " + player.hp + " HP | " + inimigoSelecionado.name + " vida: " + inimigoSelecionado.hp + " HP");
        }
      } else {
        displayMessage("Você derrotou o " + inimigoSelecionado.name + "!");
        eliminarInimigo(inimigoSelecionado);
      }
    }


     if (command === "cheat") {
      const playerDamage = Math.floor(Math.random() * player.attack) + 999999999;
      inimigoSelecionado.hp -= playerDamage;
      displayMessage("Com cheat code até o Papa mataria. morto com " + playerDamage );

      if (inimigoSelecionado.hp > 0) {
        let enemyDamage = Math.floor(Math.random() * inimigoSelecionado.attack) + 1;
        if (player.defesa) enemyDamage = Math.max(0, enemyDamage - player.defesa);
        player.hp -= enemyDamage;
        displayMessage("O " + inimigoSelecionado.name + " ataca você causando " + enemyDamage + " de dano.");

        if (player.hp <= 0) {
          displayMessage("noob.");
          gameState = "end";
          reiniciarJogo();
        } else {
          displayMessage("Sua vida: " + player.hp + " HP | " + inimigoSelecionado.name + " vida: " + inimigoSelecionado.hp + " HP");
        }
      } else {
        displayMessage("Você derrotou o " + inimigoSelecionado.name + ", trepaceiro");
        eliminarInimigo(inimigoSelecionado);
      }
    }

    else if (command === "curar") {
      const healAmount = Math.floor(Math.random() * 10) + 1;
      player.hp += healAmount;
      displayMessage("Você se cura em " + healAmount + " pontos.");

      const enemyDamage = Math.floor(Math.random() * inimigoSelecionado.attack) + 1;
      player.hp -= enemyDamage;
      displayMessage("Enquanto se cura, o " + inimigoSelecionado.name + " ataca causando " + enemyDamage + " de dano.");

      if (player.hp <= 0) {
        displayMessage("noob.");
        gameState = "end";
        reiniciarJogo();
      } else {
        displayMessage("Sua vida: " + player.hp + " HP | " + inimigoSelecionado.name + " vida: " + inimigoSelecionado.hp + " HP");
      }
    }

    else if (command === "fugir") {
      displayMessage("covarde.");
      gameState = "end";
      reiniciarJogo();
    }
  }

  if (command === "vida") {
    displayMessage("Sua vida é " + player.hp + " HP.");
  }
}
