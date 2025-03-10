const comecarJogo = document.getElementById("comecar-jogo");
const volume = document.getElementById("volume");
const creditos = document.getElementById("creditos");
const botaoComecar = document.getElementById("botao-iniciar");
const botaoVolume = document.getElementById("botao-volumes");
const botaoCreditos = document.getElementById("botao-creditos");
const botaoVoltarC = document.getElementById("botao-voltar-creditos");
const botaoVoltarV = document.getElementById("botao-voltar-volume");
const botaoVolumes = document.getElementById("botao-volumes");
const telaCreditos = document.getElementById("tela-creditos");
const telaPrincipal = document.getElementById("tela-principal");
const telaVolume = document.getElementById("tela-volume");
const musicaFundo = document.getElementById("musica-fundo");
const volumeMusica = document.getElementById("volume-musica");
const narracoes = document.querySelectorAll(".narracao");
const volumeNarracao = document.getElementById("volume-narracao");
const somClick = document.getElementById("click-som");
const volumeJogo = document.getElementById("volume-jogo");
const botoes = [
    botaoComecar,
    botaoVolume,
    botaoCreditos,
    botaoVoltarC,
    botaoVoltarV,
];

let isPlaying = false; // variável para controlar se o áudio já foi tocado

// Eventos de mouseover para narração dos botões
botaoComecar.addEventListener("mouseover", () => {
    tocarNarracao(comecarJogo);
});

botaoVolume.addEventListener("mouseover", () => {
    tocarNarracao(volume);
});

botaoCreditos.addEventListener("mouseover", () => {
    tocarNarracao(creditos);
});

function tocarNarracao(audioElement) {
    if (!isPlaying) {
        isPlaying = true;
        audioElement.currentTime = 0;
        audioElement.play();

        setTimeout(() => {
            isPlaying = false;
        }, 1500);
    }
}

window.addEventListener("click", () => {
    musicaFundo.play().catch(err => {
        console.log("Erro ao tentar tocar a música de fundo:", err);
    });
}, { once: true });

// inicializando volume
musicaFundo.volume = 0.2; // valor padrão no input range
volumeMusica.value = musicaFundo.volume;

// inicializa o volume para todos os áudios de narração
narracoes.forEach((narracao) => {
    narracao.volume = 1; // volume inicial
});
    
 // mostra a tela de créditos ao clicar no botão "Créditos"
botaoCreditos.addEventListener("click", () => {
    telaPrincipal.style.display = "none";
    telaCreditos.style.display = "flex";
});
    
// mostra a tela de volume ao clicar no botão "Volume"
botaoVolumes.addEventListener("click", () => {
    telaPrincipal.style.display = "none";
    telaVolume.style.display = "flex";
});
    
// esconde a tela créditos
botaoVoltarC.addEventListener("click", () => {
    telaCreditos.style.display = "none";
    telaPrincipal.style.display = "flex";
});

// esconder a tela volume
botaoVoltarV.addEventListener("click", () => {
    telaVolume.style.display = "none";
    telaPrincipal.style.display = "flex";
});

// sincroniza o controle de volume com todos os áudios de narração
volumeNarracao.addEventListener("input", (e) => {
    const novoVolume = e.target.value;
    narracoes.forEach((narracao) => {
        narracao.volume = novoVolume; // ajusta o volume para cada áudio
        ajustarCorVolume(volumeNarracao, novoVolume);
    });
    //console.log(`Volume de narração ajustado para: ${novoVolume}`);
});

 // função para ajustar o volume da música
 volumeMusica.addEventListener("input", (e) => {
    const novoVolume = e.target.value;
    musicaFundo.volume = novoVolume;
    ajustarCorVolume(volumeMusica, novoVolume);
});

// função para ajustar o volume do som do jogo
volumeJogo.addEventListener("input", (e) => {
    const novoVolume = e.target.value;
    somClick.volume = novoVolume;
    ajustarCorVolume(volumeJogo, novoVolume);
});

// função genérica de cor:
function ajustarCorVolume(slider, valor) {
    slider.style.background = `linear-gradient(to right, #ffba81 ${valor * 100}%, #ddd ${valor * 100}%)`;
}

// inicializa os sliders na cor correta
window.onload = function() {
    ajustarCorVolume(volumeMusica, volumeMusica.value);
    ajustarCorVolume(volumeNarracao, volumeNarracao.value);
    ajustarCorVolume(volumeJogo, volumeJogo.value);
};

function tocarSomClick() {
    somClick.currentTime = 0; // volta pro começo
    somClick.play();
}

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        tocarSomClick();
    });
});