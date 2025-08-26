class QLearning {
    constructor(alpha = 0.1, gamma = 0.9, epsilon = 0.1) {
        this.qTable = {};
        this.alpha = alpha;   // taxa de aprendizado
        this.gamma = gamma;   // fator de desconto
        this.epsilon = epsilon; // taxa de exploração
        this.carregarQTable();
    }

    // garante que um estado exista na Q-Table antes de ser usado
    initEstado(estado) {
        if (!(estado in this.qTable)) {
            // estados "piores" (números maiores) começam com Q-Value menor
            this.qTable[estado] = Math.max(10, 60 - parseInt(estado));
        }
    }

    escolherRecompensa(estado) {
        this.initEstado(estado);
        // epsilon -> dá uma recompensa aleatória para explorar
        if (Math.random() < this.epsilon) {
            return Math.floor(Math.random() * 50) + 10; // retorna um valor aleatório entre 10 e 60
        }
        // retorna o valor que a IA já aprendeu para aquele estado
        return Math.round(this.qTable[estado]);
    }

    aprender(estado, recompensaReal, proximoEstado) {
        this.initEstado(estado);
        this.initEstado(proximoEstado);

        const qValorAtual = this.qTable[estado];
        const qValorFuturo = this.qTable[proximoEstado];
        
        // fórmula clássica de Q-Learning
        const novoValor = qValorAtual + this.alpha * (recompensaReal + this.gamma * qValorFuturo - qValorAtual);
        
        // atualiza a Q-Table
        this.qTable[estado] = Math.max(10, Math.min(70, novoValor));
        this.salvarQTable();
    }

    salvarQTable() {
        localStorage.setItem('qTableNova', JSON.stringify(this.qTable));
    }

    carregarQTable() {
        const dados = localStorage.getItem('qTableNova');
        if (dados) {
            this.qTable = JSON.parse(dados);
        }
    }
}

function calcularRecompensaReal(estado) {
    const valor = parseInt(estado);
    if (valor <= 5) return 70; // estado ideal (muito bem cuidado)
    if (valor <= 10) return 60; // bom
    if (valor <= 20) return 45; // ok
    if (valor <= 30) return 30; // ruim
    return 15; // péssimo (muito mal cuidado)
}

const agente = new QLearning();

export function identificarEstado(area) {
    const tempoSemRegar = parseInt(area.dataset.tempoSemRegar) || 0;
    const tempoComErva = parseInt(area.dataset.tempoComErva) || 0;
    return `${tempoSemRegar + tempoComErva}`;
}

export function calcularRecompensa(area) {
    const estado = identificarEstado(area);
    const recompensa = agente.escolherRecompensa(estado);
    console.log(`Estado: ${estado}, Recompensa Escolhida: ${recompensa}`);
    return recompensa;
}

export function atualizarQTable(area, proximoEstado) {
    const estadoAtual = identificarEstado(area);
    const recompensaReal = calcularRecompensaReal(estadoAtual);

    agente.aprender(estadoAtual, recompensaReal, proximoEstado);
    
    console.log(`IA Aprendeu -> Estado: ${estadoAtual}, Recompensa Real: ${recompensaReal}`);
    console.log("Q-Table atual:", agente.qTable);
}

export function limparQTable() {
    localStorage.removeItem('qTableNova');
    console.log("Q-Table limpa.");
}