import { areaPlantacao } from "./plantio.js";
import { exibirAlerta } from "./popup-e-alerta.js";

export let herbicidaAtivo = false;
const herbicida = document.getElementById('botaoHerbicida');
const ervaDaninhaGif = '/assets/images/erva-daninha.gif';
const tempoMin = 50000; // tempo mínimo para gerar erva daninha
const tempoMax = 150000;

// converter NodeList para um Array
const areaPlantacaoArray = Array.from(areaPlantacao);

// função que ativa/desativa o herbicida ao clicar no botão
herbicida.addEventListener('click', () => {
    herbicidaAtivo = !herbicidaAtivo; // alterna o estado do herbicida
    if (herbicidaAtivo) {

        // altera o cursor para o ícone de herbicida
        document.body.style.cursor = 'url("/assets/images/cursor/herbicida.png"), auto';
        /*setTimeout(() => {
            herbicidaAtivo = false;
            document.body.style.cursor = 'auto'; // volta o cursor ao padrão
        }, 10000);*/
    } else {
        // volta o cursor para o padrão
        document.body.style.cursor = 'auto';
    }
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

    exibirAlerta(`ERVA DANINHA NA ÁREA ${areaEscolhida.dataset.id}!`);
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
