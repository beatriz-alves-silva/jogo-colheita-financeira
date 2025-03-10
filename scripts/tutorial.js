function iniciarVideo() {
    var video = document.getElementById("video");

    // reproduz o vídeo e remove o 'muted'
    video.play();
    video.muted = false;

    document.querySelector(".play-btn").style.display = "none";
}

function começar() {
    window.location.href = "/pages/main.html"; 
}

// função para ajustar o volume do vídeo
function ajustarVolume(valor) {
    var video = document.getElementById("video");
    video.volume = valor;

    // ajustar a cor da barra de volume dinamicamente
    ajustarCorVolume(valor);
}

function ajustarCorVolume(valor) {
    var barraVolume = document.querySelector('.volume .volume-control');

    barraVolume.style.background = `linear-gradient(to right, #3e8948 ${valor * 100}%, #ddd ${valor * 100}%)`;
}

// inicializa o volume em 100% ao carregar a página
window.onload = function() {
    var video = document.getElementById("video");
    video.volume = 1;  // define o volume inicial em 100%
    
    // ajusta a cor da barra de volume para refletir o volume inicial de 100%
    ajustarCorVolume(1);
};