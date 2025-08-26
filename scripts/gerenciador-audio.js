const configuracoesAudio = {
    musica: 0.2,
    narracao: 1.0,
    jogo: 0.5
};

function salvarConfiguracoes() {
    localStorage.setItem('configuracoesAudio', JSON.stringify(configuracoesAudio));
}

function carregarConfiguracoes() {
    const salvas = localStorage.getItem('configuracoesAudio');
    if (salvas) {
        Object.assign(configuracoesAudio, JSON.parse(salvas));
    }
}

export function setVolume(tipo, valor) {
    valor = parseFloat(valor);
    if (configuracoesAudio.hasOwnProperty(tipo)) {
        configuracoesAudio[tipo] = valor;

        if (tipo === 'musica') {
            const musicaFundo = document.getElementById("musica-fundo");
            if (musicaFundo) musicaFundo.volume = valor;
        } else if (tipo === 'narracao') {
            document.querySelectorAll(".narracao").forEach(el => el.volume = valor);
        } else if (tipo === 'jogo') {
            document.querySelectorAll(".som-jogo").forEach(el => el.volume = valor);
        }
        
        salvarConfiguracoes();
    }
}

export function getVolume(tipo) {
    return configuracoesAudio[tipo];
}

export function inicializarAudio() {
    carregarConfiguracoes();
    setVolume('musica', configuracoesAudio.musica);
    setVolume('narracao', configuracoesAudio.narracao);
    setVolume('jogo', configuracoesAudio.jogo);
}

function ajustarCorVolume(slider, valor) {
    slider.style.background = `linear-gradient(to right, #b86f50 ${valor * 100}%, #ddd ${valor * 100}%)`;
}

export function vincularControlesVolume(volumeMusicaSlider, volumeNarracaoSlider, volumeJogoSlider) {
    volumeMusicaSlider.value = getVolume('musica');
    volumeNarracaoSlider.value = getVolume('narracao');
    volumeJogoSlider.value = getVolume('jogo');

    ajustarCorVolume(volumeMusicaSlider, volumeMusicaSlider.value);
    ajustarCorVolume(volumeNarracaoSlider, volumeNarracaoSlider.value);
    ajustarCorVolume(volumeJogoSlider, volumeJogoSlider.value);

    volumeMusicaSlider.addEventListener("input", (e) => {
        setVolume('musica', e.target.value);
        ajustarCorVolume(e.target, e.target.value);
    });

    volumeNarracaoSlider.addEventListener("input", (e) => {
        setVolume('narracao', e.target.value);
        ajustarCorVolume(e.target, e.target.value);
    });

    volumeJogoSlider.addEventListener("input", (e) => {
        setVolume('jogo', e.target.value);
        ajustarCorVolume(e.target, e.target.value);
    });
}