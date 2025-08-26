import { areaPlantacao } from "./plantio.js";
import { exibirAlerta } from "./popup-e-alerta.js";

export let herbicidaAtivo = false;
const herbicida = document.getElementById('botao-herbicida');
const ervaDaninhaGif = '/assets/images/erva-daninha.gif';
const tempoMin = 50000;
const tempoMax = 150000;
const areaPlantacaoArray = Array.from(areaPlantacao);

function desativarHerbicida() {
    herbicidaAtivo = false;
    document.body.style.cursor = 'auto';
}

herbicida.addEventListener('click', () => {
    if (herbicidaAtivo) {
        desativarHerbicida();
    } else {
        herbicidaAtivo = true;
        document.body.style.cursor = 'url("/assets/images/cursor/herbicida.png"), auto';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    areaPlantacao.forEach(area => {
        area.addEventListener('click', () => {
            if (herbicidaAtivo && area.dataset.erva === 'true') {
                const tempoCorrido = Math.floor(Date.now() / 1000);
                area.style.backgroundImage = '';
                area.style.backgroundColor = "";
                area.dataset.erva = "false";
                area.dataset.tempoComErva = (tempoCorrido - parseInt(area.dataset.tempoComErva)).toString();

                desativarHerbicida();
            }
        });
    });
});


function encontrarPiorArea() {
    let piorArea = null;
    let maiorFator = -Infinity;

    areaPlantacao.forEach(area => {
        if (area.dataset.erva !== 'true' && !area.dataset.planta) {
            const fatorCrescimentoErva = parseInt(area.dataset.fatorCrescimentoErva) || 0;

            // verifica se o fator de crescimento da erva é maior que o valor atual
            if (fatorCrescimentoErva > maiorFator) {
                maiorFator = fatorCrescimentoErva;
                piorArea = area;
            }
        }
    });
    return piorArea;
}

function gerarErvaDaninha() {
    const areaEscolhida = encontrarPiorArea();
    if (!areaEscolhida) return;

    areaEscolhida.dataset.erva = 'true';
    areaEscolhida.style.backgroundImage = `url(${ervaDaninhaGif})`;
    areaEscolhida.style.backgroundRepeat = 'no-repeat';
    areaEscolhida.style.backgroundSize = '80px 80px';
    areaEscolhida.style.backgroundPosition = 'center';
    areaEscolhida.style.backgroundColor = "rgba(62, 137, 72, 0.76)";
    areaEscolhida.dataset.tempoComErva = Math.floor(Date.now() / 1000);

    exibirAlerta(`ERVA DANINHA NA ÁREA ${areaEscolhida.dataset.id}!`, 'erva');
    afetarVizinhos(areaEscolhida);

    // registra o evento de remoção da erva daninha
    areaPlantacao.forEach(area => {
        area.addEventListener('click', () => {
            if (herbicidaAtivo && area.dataset.erva) {
                const tempoCorrido = Math.floor(Date.now() / 1000);
                delete area.dataset.erva;
                area.style.backgroundImage = ''; // remove a erva daninha
                area.style.backgroundColor = "";
                area.dataset.erva = "false";
                area.dataset.tempoComErva = (tempoCorrido - parseInt(area.dataset.tempoComErva)).toString();
            }
        });
    });
}

function afetarVizinhos(area) {
    const id = parseInt(area.dataset.id); // ID da área atual
    const numColunas = 5; // número de colunas no grid (5 colunas)
    const vizinhos = areaPlantacaoArray.filter(a => {
        const vizinhoId = parseInt(a.dataset.id); // ID da área vizinha
        const difId = Math.abs(vizinhoId - id); // diferença de IDs

        // verifica se a área é vizinha (horizontal ou vertical)
        return (
            (difId === 1 && Math.floor((vizinhoId - 1) / numColunas) === Math.floor((id - 1) / numColunas)) || // horizontal
            difId === 5 // vertical
        );
    });

    vizinhos.forEach(vizinho => {
        if (vizinho.dataset.erva !== 'true' && !vizinho.dataset.planta) {
            // incrementa o fator de crescimento de erva na área vizinha
            vizinho.dataset.fatorCrescimentoErva = (parseInt(vizinho.dataset.fatorCrescimentoErva) || 0) + 4;
        }
    });
}

// define os intervalos para a erva daninha crescer
setInterval(gerarErvaDaninha, Math.random() * (tempoMax - tempoMin) + tempoMin);
setTimeout(gerarErvaDaninha, Math.random() * (tempoMax - tempoMin) + tempoMin);
