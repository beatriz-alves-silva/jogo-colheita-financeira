import { moedasUsuario, atualizarMoedas } from "./inventario-e-moeda.js";

const popup = document.querySelector('.popup');
const botaoFechar = document.querySelector('.botao-fechar-popup');
const recompensaDisplay = document.getElementById('msg-recompensa');

const audioAlertaErva = document.getElementById('audio-alerta-erva');
const audioSelecionarSemente = document.getElementById('audio-selecionar-semente');



let ultimoMarco = 0; // armazena o último valor de moedas que concedeu a recompensa

export function verificarMoedas() {
  if (moedasUsuario >= 500 && moedasUsuario >= ultimoMarco + 500) {
    recompensaDisplay.innerHTML = `
    <div style="text-align: justify; line-height: 1.2;">
        <p>PARABÉNS!<br>
        VOCÊ ACUMULOU <span style="color: #3e8948;">R$ ${ultimoMarco + 500}</span>!<br>
        COMO RECOMPENSA,<br>
        VOCÊ GANHOU <span style="color: #3e8948;">R$ 50 EXTRAS</span>.<br>
        CONTINUE ACUMULANDO<br>
        PARA ALCANÇAR NOVAS METAS!</p>
    </div>
`;
      ultimoMarco += 500; // atualiza o último marco atingido
      atualizarMoedas(moedasUsuario + 50); // atualiza a exibição das moedas na tela
      
      // exibe o pop-up
      popup.style.display = "flex";

      // fecha o pop-up automaticamente após 20 segundos
      setTimeout(() => {
          popup.style.display = "none";
      }, 40000);

      //console.log(`Recompensa concedida! Total de moedas: ${moedasUsuario}`);
  }
}

// fecha o pop-up ao clicar no botão
botaoFechar.addEventListener("click", () => {
popup.style.display = "none";
});

const alerta = document.getElementById('alerta');
const botaoFecharAlerta = document.querySelector('.botao-fechar-alerta');
const alertaDisplay = document.getElementById('msg-alerta');

function tocarSom(audioElement) {
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

export function exibirAlerta(mensagem, tipoDeSom = 'erro') { // tipoDeSom pode ser 'erva', 'erro' etc
    alertaDisplay.textContent = mensagem;
    alerta.style.display = "flex";

    switch (tipoDeSom) {
        case 'erva':
            tocarSom(audioAlertaErva);
            break;
        case 'erro':
            tocarSom(audioSelecionarSemente);
            break;

        default:
            //tocarSom(audioAlertaErro);
            break;
    }

    setTimeout(() => { alerta.style.display = "none"; }, 10000);
}

botaoFecharAlerta.addEventListener("click", () => {
  alerta.style.display = "none";
});