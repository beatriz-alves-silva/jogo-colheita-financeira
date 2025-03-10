import { verificarMoedas } from "./popup-e-alerta.js";

const moedasDisplay = document.querySelector('.qtdeMoedas');
const inventarioDisplay = document.getElementById('qtde-inventario');
const inventarioItems = document.querySelectorAll('.inventario__item');

// quantidade inicial de moedas do usuário
export let moedasUsuario = 300;

// inicializa os displays ao carregar a página
window.addEventListener('DOMContentLoaded', carregarDoLocalStorage);

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
    moedasDisplay.textContent = `R$ ${moedasUsuario}`;
    verificarMoedas();
}

export function atualizarInventario() {
    vetorInventario.forEach((semente) => {
        // seleciona o item baseado no data-id
        const itemHTML = document.querySelector(`.inventario__item [data-id="${semente.id}"]`);
        
        // se o item for encontrado no DOM, atualiza a quantidade
        if (itemHTML) {
            itemHTML.textContent = semente.qtdeInventario;  // atualiza a quantidade
        }
    });
    }

export function getMoedasUsuario() {
    return moedasUsuario;
}

export function setMoedasUsuario(novoValor) {
    moedasUsuario = novoValor;
    salvarNoLocalStorage();
    atualizarMoedas();
}