import { areaPlantacao } from "./plantio.js";

const regador = document.getElementById('botaoRegador');
export let regadorAtivo = false; // controla se o regador está ativo 

// função que ativa/desativa o regador ao clicar no botão
regador.addEventListener('click', () => {
console.log("Botão regador selecionado.");
   regadorAtivo = !regadorAtivo; // alterna o estado do regador

    console.log(regadorAtivo);

    if (regadorAtivo) {
        // altera o cursor para o ícone de regador
        document.body.style.cursor = 'url("/assets/images/cursor/regador.png"), auto';

        /*setTimeout(() => {
            regadorAtivo = false;
            document.body.style.cursor = 'auto'; // volta o cursor ao padrão
            //console.log("Regador desativado automaticamente.");
        }, 10000);*/

    } else {
        // volta o cursor para o padrão
        document.body.style.cursor = 'auto';
    }
});

function regarPlanta(area) {
    if (area.dataset.erva === 'true') {
        //alert('Não é possível regar aqui! Há erva daninha.');
        return;
}

    if (area.dataset.planta && area.dataset.regado === 'false') {
        //console.log(`Regando planta na área ${area.dataset.id}`);
        area.dataset.regado = 'true';
    } else {
        //console.log('Não há planta para regar aqui ou já foi regada.');
    }
}

// Espera o DOM estar carregado antes de adicionar os eventos
document.addEventListener("DOMContentLoaded", () => {
    areaPlantacao.forEach((area) => {
        area.addEventListener('click', () => {
            if (regadorAtivo) {
                regarPlanta(area);
            }
        });
    });
});