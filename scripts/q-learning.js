let QTable = carregarQTable();

// parametros do q-learning 
const alpha = 0.1; // taxa de aprendizado
const gamma = 0.9; // fator de desconto

export function identificarEstado(area){
    const tempoSemRegar = parseInt(area.dataset.tempoSemRegar) || 0;
    const tempoComErva = parseInt(area.dataset.tempoComErva) || 0;
    //return `${tempoSemRegar}-${tempoComErva}`; // nesse caso seria por exemplo 1 - 0
    area.dataset.fatorCrescimentoErva = tempoComErva + tempoSemRegar;
    return tempoSemRegar + tempoComErva;
}

export function calcularRecompensa(area){
    const estado = identificarEstado(area);
    const recompensaBase = 50; // recompensa base
    const penalidade = estado * 0.5; // até o momento parece um valor justo, mas verificar
    let recompensa = recompensaBase - penalidade;

    const agente = area.dataset.id;
    if(QTable[agente] && QTable[agente][estado]){
        const qValor = QTable[agente][estado].QValor;
        recompensa = Math.round((recompensa + qValor) / 2);
    }
    return Math.max(Math.round(recompensa), 10);
}

export function atualizarQTable(area, recompensa, proximoEstado){
    const estado = identificarEstado(area);
    const agente = area.dataset.id;

    // inicializa a Q-Table se não existir
    if(!QTable[agente]){
    QTable[agente] = {};
    }
    if(!QTable[agente][estado]){
        QTable[agente][estado] = {totalRecompensa: 0, colheitas: 0, QValor: 0};
    }

    recompensa = Math.round(recompensa);

    const qAnterior = QTable[agente][estado].QValor;
    const qMaxProximoEstado = maxQProximoEstado(agente, proximoEstado);
    // fórmula de atualização do Q-Learning: 
    // Q(s,a) = Q(s,a) + α [R + γ * maxQ(s',a') - Q(s,a)]
    const qNovo = Math.round(qAnterior + alpha * (recompensa + gamma * qMaxProximoEstado - qAnterior));

    QTable[agente][estado].QValor = qNovo;
    QTable[agente][estado].totalRecompensa += recompensa;
    QTable[agente][estado].colheitas++;

    console.log(`Q-Table Atualizada - Agente ${agente}, Estado ${estado}:`, QTable[agente][estado]);
    salvarQTable();
    console.log(JSON.stringify(QTable, null, 2)); // imprime a a qtable
}

function maxQProximoEstado(agente, proximoEstado) {
    return QTable[agente] && QTable[agente][proximoEstado]
        ? QTable[agente][proximoEstado].QValor
        : 0;
}

// função para salvar a Q-Table no localStorage
function salvarQTable() {
    localStorage.setItem('QTable', JSON.stringify(QTable));
}

// função para carregar a Q-Table do localStorage ou inicializar se não existir
function carregarQTable() {
    const dados = localStorage.getItem('QTable');
    return dados ? JSON.parse(dados) : {};
}

function limparQTable() {
    localStorage.removeItem('QTable'); // 
    QTable = {};
} 

limparQTable();