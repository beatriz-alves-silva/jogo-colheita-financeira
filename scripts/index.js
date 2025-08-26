import { inicializarAudio, vincularControlesVolume } from './gerenciador-audio.js';

const telaPrincipal = document.getElementById("tela-principal");
const telaCreditos = document.getElementById("tela-creditos");
const telaVolume = document.getElementById("tela-volume");

const botaoComecar = document.getElementById("botao-iniciar");
const botaoVolume = document.getElementById("botao-volumes");
const botaoCreditos = document.getElementById("botao-creditos");
const botaoVoltarC = document.getElementById("botao-voltar-creditos");
const botaoVoltarV = document.getElementById("botao-voltar-volume");

const musicaFundo = document.getElementById("musica-fundo");
const somClick = document.getElementById("click-som");
const narracaoComecar = document.getElementById("comecar-jogo");
const narracaoVolume = document.getElementById("volume");
const narracaoCreditos = document.getElementById("creditos");

document.addEventListener('DOMContentLoaded', () => {
    inicializarAudio();

    const volumeMusicaSlider = document.getElementById("volume-musica");
    const volumeNarracaoSlider = document.getElementById("volume-narracao");
    const volumeJogoSlider = document.getElementById("volume-jogo");

    if (volumeMusicaSlider && volumeNarracaoSlider && volumeJogoSlider) {
        vincularControlesVolume(volumeMusicaSlider, volumeNarracaoSlider, volumeJogoSlider);
    }

    localStorage.removeItem('saldo');
    localStorage.removeItem('inventario');
    console.log("Progresso do jogo resetado no menu inicial.");
});

function navigateTo(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

botaoComecar.addEventListener("click", () => navigateTo('/pages/tutorial.html'));
botaoCreditos.addEventListener("click", () => {
    telaPrincipal.style.display = "none";
    telaCreditos.style.display = "flex";
});
botaoVolume.addEventListener("click", () => {
    telaPrincipal.style.display = "none";
    telaVolume.style.display = "flex";
});
botaoVoltarC.addEventListener("click", () => {
    telaCreditos.style.display = "none";
    telaPrincipal.style.display = "flex";
});
botaoVoltarV.addEventListener("click", () => {
    telaVolume.style.display = "none";
    telaPrincipal.style.display = "flex";
});

let isPlayingNarration = false;

function tocarNarracao(audioElement) {
    if (!isPlayingNarration && audioElement) {
        isPlayingNarration = true;
        audioElement.currentTime = 0;
        audioElement.play();
        setTimeout(() => { isPlayingNarration = false; }, 1500);
    }
}

botaoComecar.addEventListener("mouseover", () => tocarNarracao(narracaoComecar));
botaoVolume.addEventListener("mouseover", () => tocarNarracao(narracaoVolume));
botaoCreditos.addEventListener("mouseover", () => tocarNarracao(narracaoCreditos));

function tocarSomClick() {
    if (somClick) {
        somClick.currentTime = 0;
        somClick.play();
    }
}

[botaoComecar, botaoVolume, botaoCreditos, botaoVoltarC, botaoVoltarV].forEach(botao => {
    botao.addEventListener("click", tocarSomClick);
});

window.addEventListener("click", () => {
    musicaFundo.play().catch(err => {});
}, { once: true });