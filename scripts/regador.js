import { areaPlantacao } from "./plantio.js";

const regador = document.getElementById('botao-regador');
export let regadorAtivo = false; // controla se o regador está ativo 

function desativarRegador() {
    regadorAtivo = false;
    document.body.style.cursor = 'auto';
}

regador.addEventListener('click', () => {
    if (regadorAtivo) {
        desativarRegador();
    } else {
        regadorAtivo = true;
        document.body.style.cursor = 'url("/assets/images/cursor/regador.png"), auto';
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

document.addEventListener('click', (event) => {
    if (!regadorAtivo) {
        return;
    }

    const elementoClicado = event.target;

    if (elementoClicado.classList.contains('area-plantacao') && elementoClicado.dataset.planta) {
        regarPlanta(elementoClicado);
        desativarRegador();

    } else {
        if (!elementoClicado.closest('#botao-regador')) {
            desativarRegador(); 
        }
    }
});