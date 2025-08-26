import { inicializarAudio, vincularControlesVolume } from './gerenciador-audio.js';

const areaPlantacao = document.querySelectorAll('.area-plantio');

const botaoAbrirVolume = document.getElementById('botaoVolume');
const telaVolume = document.getElementById('tela-volume');
const botaoVoltarDoVolume = document.getElementById('botao-voltar-volume-do-pause');

const inventario = document.querySelector('.inventario');
const botaoInventario = document.getElementById('botao-inventario');

const telaLoja = document.querySelector('.tela-loja');
const botaoLoja = document.getElementById('botao-loja');
const botaoVoltarMain = document.querySelector('.botao-voltar-main');

const telaPause = document.querySelector('.telaPause');
const botaoPause = document.getElementById('botao-pause');
const overlay = document.querySelector('.overlay');
const botaoVoltarJogo = document.getElementById('voltar-jogo');
const botaoTutorial = document.getElementById('botaoTutorial');
const botaoVoltarMenu = document.getElementById('botao-voltar-menu');

document.addEventListener('DOMContentLoaded', () => {
    inicializarAudio();

    const volumeMusicaSlider = document.getElementById("volume-musica");
    const volumeNarracaoSlider = document.getElementById("volume-narracao");
    const volumeJogoSlider = document.getElementById("volume-jogo");

    if (volumeMusicaSlider && volumeNarracaoSlider && volumeJogoSlider) {
        vincularControlesVolume(volumeMusicaSlider, volumeNarracaoSlider, volumeJogoSlider);
    }
});

botaoInventario.addEventListener('click', () => {
    const isVisible = inventario.style.display === 'block';
    inventario.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {
        setTimeout(() => {
            inventario.style.display = 'none';
        }, 15000);
    }
});

botaoPause.addEventListener('click', () => {
    const isVisible = telaPause.style.display === 'block';
    telaPause.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
});

botaoVoltarJogo.addEventListener('click', () =>{
    const isVisible = telaPause.style.display === 'block';
    telaPause.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
})

botaoLoja.addEventListener('click', () => {
    const isVisible = telaLoja.style.display === 'block';
    telaLoja.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {
        setTimeout(() => {
            telaLoja.style.display = 'none';
            overlay.style.display = 'none';
        }, 20000);
    }
});

botaoVoltarMain.addEventListener('click', () => {
    telaLoja.style.display = 'none';
    overlay.style.display = 'none';
});

botaoAbrirVolume.addEventListener('click', () => {
    telaPause.style.display = 'none'; 
    telaVolume.style.display = 'flex';
});

botaoVoltarDoVolume.addEventListener('click', () => {
    telaVolume.style.display = 'none';
    telaPause.style.display = 'block';
});

botaoTutorial.addEventListener('click', () => {
    navigateTo('/pages/tutorial.html');
});

botaoVoltarMenu.addEventListener('click', () => {
    navigateTo('../index.html');
});

function navigateTo(url) {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

