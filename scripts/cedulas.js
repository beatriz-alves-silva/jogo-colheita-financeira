import { getMoedasUsuario } from "./inventario-e-moeda.js";

const imagensCedulas = {
    200: '/assets/images/cedulas/200.jpg',
    100: '/assets/images/cedulas/100.jpg',
    50:  '/assets/images/cedulas/50.jpg',
    20:  '/assets/images/cedulas/20.jpg',
    10:  '/assets/images/cedulas/10.jpg',
    5:   '/assets/images/cedulas/5.jpg',
    2:   '/assets/images/cedulas/2.jpg',
    1:   '/assets/images/cedulas/1.png'
};

function calcularCedulas(valorTotal) {
    const notas = [200, 100, 50, 20, 10, 5, 2, 1];
    const resultado = {};
    let valorRestante = valorTotal;

    for (const nota of notas) {
        if (valorRestante >= nota) {
            const quantidade = Math.floor(valorRestante / nota);
            resultado[nota] = quantidade;
            valorRestante %= nota;
        }
    }
    return resultado;
}

export function inicializarTooltip(elementoDisplayMoedas) {
    const popupCedulas = document.getElementById('popup-cedulas');

    if (!popupCedulas) {
        console.error("Elemento com id 'popup-cedulas' não encontrado no HTML.");
        return;
    }

        const LARGURA_NOTA = 140;
        const DESLOCAMENTO_ESQUERDA = 28; // quanto cada nota avança pra direita 
        const DESLOCAMENTO_CIMA = 4;
    
    function mostrarPopup() {
        const dinheiroDoJogador = getMoedasUsuario();
        const distribuicao = calcularCedulas(dinheiroDoJogador);
        popupCedulas.innerHTML = '';

        for (const nota of Object.keys(distribuicao)) {
            const quantidade = distribuicao[nota];
            const caminhoDaImagem = imagensCedulas[nota];
            
            // a largura total será a largura de uma nota mais o deslocamento das outras
            const larguraTotalDaPilha = LARGURA_NOTA + ((quantidade - 1) * DESLOCAMENTO_ESQUERDA);

            let pilhaHTML = `<div class="cedula-stack" style="width: ${larguraTotalDaPilha}px;">`;
            
            for (let i = 0; i < quantidade; i++) {
                const topOffset = i * DESLOCAMENTO_CIMA;
                const leftOffset = i * DESLOCAMENTO_ESQUERDA;

                const zIndex = quantidade - i;

                pilhaHTML += `<img src="${caminhoDaImagem}" alt="Nota de R$ ${nota}" style="bottom: ${topOffset}px; left: ${leftOffset}px; z-index: ${zIndex};">`;
            }
            
            pilhaHTML += '</div>';
            popupCedulas.innerHTML += pilhaHTML;
        }

        if (Object.keys(distribuicao).length === 0) {
            popupCedulas.innerHTML = '<span>Você não possui dinheiro.</span>';
        }

        popupCedulas.style.display = 'flex'; 
    }

    function esconderPopup() {
        popupCedulas.style.display = 'none';
    }

    elementoDisplayMoedas.addEventListener('mouseenter', mostrarPopup);
    elementoDisplayMoedas.addEventListener('mouseleave', esconderPopup);
}