import { verificarMoedas } from "./popup-e-alerta.js";
import { inicializarTooltip } from "./cedulas.js";

const qtdeMoedasSpan  = document.querySelector('.qtde-moedas');
const moedasDisplay = document.querySelector('.moedas'); 


// quantidade inicial de moedas do usuário
export let moedasUsuario = 300;

// inicializa os displays ao carregar a página
window.addEventListener('DOMContentLoaded', carregarDoLocalStorage);
inicializarTooltip(moedasDisplay);

// função para salvar as informações no localStorage
export function salvarNoLocalStorage() {
    localStorage.setItem('saldo', moedasUsuario);
    localStorage.setItem('inventario', JSON.stringify(vetorInventario));
}

// estrutura para representar as sementes
export class Semente {
    constructor(id, qtdeInventario) {
        this.id = id;
        this.qtdeInventario = qtdeInventario;
    }
}

  // inicializa o inventário
export const vetorInventario = [
    new Semente("trigo", 0),
    new Semente("tomate", 0),
    new Semente("alface", 0),
    new Semente("abobora", 0),
    new Semente("cenoura", 0),
    new Semente("beterraba", 0),
];

// carrega os dados do localStorage ao iniciar
function carregarDoLocalStorage() {
    let saldoSalvo = localStorage.getItem('saldo');
    if (saldoSalvo) {
        moedasUsuario = parseInt(saldoSalvo);
    }

    const inventarioSalvo = localStorage.getItem('inventario');
    if (inventarioSalvo) {
        vetorInventario.length = 0;  // limpa o inventário atual
        vetorInventario.push(...JSON.parse(inventarioSalvo));  // preenche com os dados salvos
    }

// atualiza os displays
atualizarMoedas();
atualizarInventario();
}

// atualiza o display das moedas
export function atualizarMoedas() {
    qtdeMoedasSpan.textContent = `R$ ${moedasUsuario}`;
    verificarMoedas(); // verifica a qtde de moedas para dar a recompensa
}

export function atualizarInventario() {
    vetorInventario.forEach((semente) => {
        // seleciona o item baseado no data-id
        // encontra no DOM o elemento <span> que tem o mesmo data-id da semente
        const itemHTML = document.querySelector(`.item [data-id="${semente.id}"]`);
        
        // se o item for encontrado no DOM, atualiza a quantidade
        if (itemHTML) {
            itemHTML.textContent = semente.qtdeInventario;
        }
    });
    }

export function getMoedasUsuario() { return moedasUsuario }

export function setMoedasUsuario(novoValor) {
    moedasUsuario = novoValor;
    salvarNoLocalStorage();
    atualizarMoedas();
}