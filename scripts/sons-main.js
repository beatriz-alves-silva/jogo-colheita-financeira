const botaoPause = document.getElementById('botao-pause');
const botaoLoja = document.getElementById('botao-loja');
const botaoInventario = document.getElementById('botao-inventario');
const botaoRegador = document.getElementById('botao-regador');
const botaoHerbicida = document.getElementById('botao-herbicida');
const botaoVoltarJogo = document.getElementById('voltar-jogo');
const botaoVolume = document.getElementById('botaoVolume');
const botaoTutorial = document.getElementById('botaoTutorial');
const botaoVoltarMenu = document.getElementById('botao-voltar-menu');

const audioPause = document.getElementById('audio-pause');
const audioLoja = document.getElementById('audio-loja');
const audioInventario = document.getElementById('audio-inventario');
const audioRegador = document.getElementById('audio-regador');
const audioHerbicida = document.getElementById('audio-herbicida');
const audioVoltarJogo = document.getElementById('audio-voltar-jogo');
const audioVolume = document.getElementById('audio-volume');
const audioTutorial = document.getElementById('audio-tutorial');
const audioVoltarmenu = document.getElementById('audio-voltar-menu');

let isPlayingNarration = false;

function tocarNarracao(audioElement) {
    if (!isPlayingNarration && audioElement) {
        isPlayingNarration = true;
        audioElement.currentTime = 0;
        audioElement.play();
        setTimeout(() => { isPlayingNarration = false; }, 1500);
    }
}
botaoPause.addEventListener('mouseover', () => tocarNarracao(audioPause));
botaoLoja.addEventListener('mouseover', () => tocarNarracao(audioLoja));
botaoInventario.addEventListener('mouseover', () => tocarNarracao(audioInventario));
botaoRegador.addEventListener('mouseover', () => tocarNarracao(audioRegador));
botaoHerbicida.addEventListener('mouseover', () => tocarNarracao(audioHerbicida));
botaoVoltarJogo.addEventListener('mouseover', () => tocarNarracao(audioVoltarJogo));
botaoVolume.addEventListener('mouseover', () => tocarNarracao(audioVolume));
botaoTutorial.addEventListener('mouseover', () => tocarNarracao(audioTutorial));
botaoVoltarMenu.addEventListener('mouseover', () => tocarNarracao(audioVoltarmenu));