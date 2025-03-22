import { vetorInventario, atualizarMoedas, atualizarInventario, salvarNoLocalStorage, getMoedasUsuario, setMoedasUsuario } from "./inventario-e-moeda.js";
import { calcularRecompensa, atualizarQTable, identificarEstado } from "./q-learning.js";
import { regadorAtivo } from "./regador.js";
import { exibirAlerta } from "./popup-e-alerta.js";

export const areaPlantacao = document.querySelectorAll('.area-plantio'); // areas de plantação
let CursorSelecionado = null; // icone do cursor
let plantaSelecionada = null; // tipo de planta selecionada
let cursorAtivo = false;
const body = document.body;
const planta = document.querySelectorAll('.item img'); // icones do inventário

function desativarCursor() {
    cursorAtivo = false;
    // desativa o cursor (volta ao padrão)
    document.body.style.cursor = 'auto';
}

// adiciona evento de clique no inventário
planta.forEach((item) => {
    item.addEventListener('click', () => {
        const plantaId = item.getAttribute('data-planta');
        
        // encontre o item no inventário
        const semente = vetorInventario.find((s) => s.id === plantaId);
        
        // verifica se a quantidade no inventário é maior que 0
        if (semente && semente.qtdeInventario > 0) {
            plantaSelecionada = plantaId;
            const cursor = item.getAttribute('data-cursor');

            // console.log(`Selecionando semente de ${plantaSelecionada}`);
            
            // altera o cursor e armazena o ícone selecionado
            body.classList.add('cursor-planting');


            // adiciona um pequeno delay para garantir a mudança
            setTimeout(() => {
                body.style.cursor = `url('${cursor}'), auto`;
            }, 50);

            CursorSelecionado = cursor;
        } else {
            exibirAlerta('NÃO HÁ SEMENTE PARA PLANTAR');
            //console.log(`Não há sementes de ${plantaId} no inventário para selecionar.`);
        }
    });
});

function plantarItem(area) {
    if (area.dataset.planta && area.dataset.planta !== '') {
        //alert('Este local já possui uma planta!');
        return;
    }

    if (area.dataset.erva === 'true') {
        //alert('Não é possível plantar aqui! Há erva daninha.');
        return;
    }

    if (plantaSelecionada) {
        // console.log(`Plantando ${plantaSelecionada} na área: ${area.dataset.id}`);
        usarItem(plantaSelecionada);
        const tempoInicial = Math.floor(Date.now() / 1000); // tempo atual em segundos

        area.dataset.tempoSemRegar =  tempoInicial;

        // define estágios de crescimento da planta selecionada
        const growthStages = estagiosPlanta(plantaSelecionada);
        area.dataset.growthStage = 0;
        area.dataset.growthStages = JSON.stringify(growthStages);
        area.dataset.planta = plantaSelecionada;
        area.style.backgroundImage = `url(${growthStages[0]})`;
        area.dataset.regado = false;

        // remove o cursor 
        body.classList.remove('cursor-planting');
        body.style.cursor = 'default';
        CursorSelecionado = null;
        plantaSelecionada = null;

        crescimentoPlanta(area);
    } else {
        exibirAlerta('SELECIONE UMA SEMENTE PARA PLANTAR');
        // console.log("Sem semente selecionada para plantar!");
    }
}

function crescimentoPlanta(area) {
        const growthStages = JSON.parse(area.dataset.growthStages); 
        let currentStage = parseInt(area.dataset.growthStage); // obtém o estágio atual
    
        // configura um intervalo para alternar os estágios de crescimento
        const growthInterval = setInterval(() => {
            currentStage++;
            if (currentStage < growthStages.length - 1) {
                // atualiza a imagem do fundo
                area.style.backgroundImage = `url(${growthStages[currentStage]})`;
                area.style.backgroundRepeat = 'no-repeat';
                area.style.backgroundSize = '80px 80px';
                area.style.backgroundPosition = 'center';
                area.dataset.growthStage = currentStage; // atualiza o estágio
            } else {
                clearInterval(growthInterval); // para o intervalo quando a planta atinge o estágio final
                area.dataset.readyToHarvest = 'true'; // planta está pronta para colheita
                area.style.backgroundImage = `url(${growthStages[growthStages.length - 1]})`; // usa a imagem do nível 5
                //console.log(`Planta na área ${area.dataset.id} está completamente crescida!`);
                //console.log(`Area pronta para colheita? ${area.dataset.readyToHarvest}`);
            }
        }, 10000); // tempo entre os estágios
}
  // função para usar (plantar) um item
function usarItem(id) {
    const semente = vetorInventario.find((s) => s.id === id);
    //console.log("Inventário atual:", semente);

    if (semente) {
        if (semente.qtdeInventario > 0) {
            semente.qtdeInventario--; // decrementa a quantidade no inventário
            atualizarInventario();
            salvarNoLocalStorage();
            //console.log(`Plantando ${id}`);
        } 
    } else {
        //console.log("Item não encontrado no inventário.");
    }
}

function harvestPlant(area) {
    if (area.dataset.readyToHarvest === 'true') {
        const plantaId =  area.dataset.planta; //
        const semente = vetorInventario.find(s => s.id === plantaId); // encontra a planta com base no nome

        if (semente) {
            // const recompensa = Math.floor(semente.valorVenda * 1.5); // recompensa sem IA

            if(area.dataset.tempoSemRegar > 1800){
                area.dataset.tempoSemRegar = '-1'; // significa que a planta não foi regada
                //console.log(`Tempo sem regar: ${area.dataset.tempoSemRegar} segundos`);
            } else{
                //console.log(`Tempo sem regar: ${area.dataset.tempoSemRegar} segundos`);
            }

                //moedasUsuario += recompensa; // adiciona as moedas
                atualizarMoedas(); // atualiza o display
                salvarNoLocalStorage(); // salva o estado

                // limpa a área de plantação
                area.style.backgroundImage = '';
                area.dataset.growthStage = '';
                area.dataset.readyToHarvest = 'false';
                area.dataset.planta = ''; // remove o ID da planta

                desativarCursor(); // desativa o cursor
                //console.log(`Colheu ${plantaId} e ganhou ${recompensa} moedas!`);
                // console.log(`Moedas totais: ${moedasUsuario}`);
            }
        } else {
            exibirAlerta('A planta ainda não está pronta para ser colhida!');
            //alert('A planta ainda não está pronta para ser colhida!');
        }
}

// função para obter os estágios de crescimento de acordo com a planta
function estagiosPlanta(planta) {
    const estagiosPlantaData = {
        trigo: [
            '/assets/images/trigo/nivel1.png',
            '/assets/images/trigo/nivel2.png',
            '/assets/images/trigo/nivel3.png',
            '/assets/images/trigo/nivel4.png',
            '/assets/images/trigo/nivel5.gif'
        ],
        alface: [
            '/assets/images/alface/nivel1.png',
            '/assets/images/alface/nivel2.png',
            '/assets/images/alface/nivel3.png',
            '/assets/images/alface/nivel4.png',
            '/assets/images/alface/nivel5.gif'
        ],
        cenoura: [
            '/assets/images/cenoura/nivel1.png',
            '/assets/images/cenoura/nivel2.png',
            '/assets/images/cenoura/nivel3.png',
            '/assets/images/cenoura/nivel4.png',
            '/assets/images/cenoura/nivel5.gif'
        ],
        tomate: [
            '/assets/images/tomate/nivel1.png',
            '/assets/images/tomate/nivel2.png',
            '/assets/images/tomate/nivel3.png',
            '/assets/images/tomate/nivel4.png',
            '/assets/images/tomate/nivel5.gif'
        ],
        abobora: [
            '/assets/images/abobora/nivel1.png',
            '/assets/images/abobora/nivel2.png',
            '/assets/images/abobora/nivel3.png',
            '/assets/images/abobora/nivel4.png',
            '/assets/images/abobora/nivel5.gif'
        ],
        beterraba: [
            '/assets/images/beterraba/nivel1.png',
            '/assets/images/beterraba/nivel2.png',
            '/assets/images/beterraba/nivel3.png',
            '/assets/images/beterraba/nivel4.png',
            '/assets/images/beterraba/nivel4.png'
        ],
    };

    return estagiosPlantaData[planta] || [];
}
// adiciona eventos nas áreas de plantação
areaPlantacao.forEach((area) => {
    // evento para quando o mouse entra na área
    area.addEventListener('mouseenter', () => {
        // verifica se a planta está pronta para colheita
        if (area.dataset.readyToHarvest === 'true') {
            // muda o cursor para o ícone de colheita
            document.body.style.cursor = 'url("/assets/images/cursor/colheita.png"), 32 32, auto';
            cursorAtivo = true;
        } else {
              // restaura o cursor ao padrão caso a planta não esteja pronta para colheita
            if (regadorAtivo) {
                // altera o cursor para o ícone de regador
                document.body.style.cursor = 'url("/assets/images/cursor/regador.png"), auto';

                }
              // document.body.style.cursor = 'auto'; // restaura o cursor - NÃO DEIXA O CURSOR DE PLANTAS
        }
    });

      // evento de clique para realizar a ação de colheita ou plantio
    area.addEventListener('click', () => {
        const primeiraRega = Math.floor(Date.now() / 1000); // tempo atual em segundos

        if (area.dataset.readyToHarvest === 'true') {
            let recompensa = calcularRecompensa(area);
            let proximoEstado = identificarEstado(area);
                setMoedasUsuario(getMoedasUsuario() + recompensa); // adiciona as moedas primeiro
                atualizarMoedas(); 
                atualizarQTable(area, recompensa, proximoEstado);
                salvarNoLocalStorage();
                harvestPlant(area); // por último
                console.log(`Colheita realizada! Recompensa: ${recompensa}`);
                return;
            } 
        
        else if (area.dataset.erva === 'true') {
            return;
        } else if(regadorAtivo && area.dataset.planta){
            //console.log(`Regando a area ${area.dataset.id} com planta ${area.dataset.planta}`);
            area.style.backgroundColor = "rgba(184, 108, 75, 0.49)";
            area.dataset.plantaRegada = 'true';
            
            area.dataset.tempoSemRegar = (primeiraRega - parseInt(area.dataset.tempoSemRegar)).toString();
    
            // remove o efeito após alguns segundos (opcional)
            setTimeout(() => {
                area.style.backgroundColor = ""; // Volta ao normal
                area.dataset.plantaRegada = 'false';
                }, 40000); // mudar esse tempo para o tempo que a planta vai demorar para crescer em media
        }
        else if(regadorAtivo){
            //console.log(`Regando a area ${area.dataset.id} sem planta`);
            area.style.backgroundColor = "rgba(184, 108, 75, 0.49)";

            // remove o efeito após alguns segundos (opcional)
            setTimeout(() => {
            area.style.backgroundColor = ""; // volta ao normal
            }, 10000);
        } 
        else {
            plantarItem(area); // planta, se possível
        }
    });
});