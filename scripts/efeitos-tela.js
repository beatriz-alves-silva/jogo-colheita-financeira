const inventario = document.querySelector('.inventario');
const botaoInventario = document.getElementById('botao-inventario');

const telaLoja = document.querySelector('.tela-loja');
const botaoLoja = document.getElementById('botao-loja');
const botaoVoltarMain = document.querySelector('.botao-voltar-main');

const telaPause = document.querySelector('.telaPause');
const botaoPause = document.getElementById('botao-pause');
const overlay = document.querySelector('.overlay');
const botaoVoltarJogo = document.getElementById('voltar-jogo');

botaoInventario.addEventListener('click', () => {
    const isVisible = inventario.style.display === 'block';
    inventario.style.display = isVisible ? 'none' : 'block';

    // se o inventário foi aberto, inicia um temporizador para fechá-lo
    if (!isVisible) {
        setTimeout(() => {
            inventario.style.display = 'none';
            //console.log("Inventário fechado automaticamente.");
        }, 15000); // 8 segundos -> verificar se é um bom tempo!
    }
});

botaoPause.addEventListener('click', () => {
    const isVisible = telaPause.style.display === 'block';
    telaPause.style.display = isVisible ? 'none' : 'block';
     // mostra o overlay e aplica a opacidade
    overlay.style.display = isVisible ? 'none' : 'block';
   // console.log("Pause visivel?", !isVisible);
});

botaoVoltarJogo.addEventListener('click', () =>{
    const isVisible = telaPause.style.display === 'block';
    telaPause.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
})

botaoLoja.addEventListener('click', () => {
    const isVisible = telaLoja.style.display === 'block';
    telaLoja.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';

    // se a loja foi aberta, inicia o temporizador para fechá-la
    if (!isVisible) {
        setTimeout(() => {
            telaLoja.style.display = 'none';
            overlay.style.display = 'none';
            //console.log("Loja fechada automaticamente.");
        }, 20000); // 20 segundos -> verificar se é um bom tempo!
    }
});

// evento para fechar a loja manualmente ao clicar no botão de voltar
botaoVoltarMain.addEventListener('click', () => {
    telaLoja.style.display = 'none';
    overlay.style.display = 'none';
});

function navigateTo(url) {
    // adiciona a classe 'fade-out' ao body para ativar a animação
    document.body.classList.add('fade-out');

    // aguarda o tempo da animação (1 segundo) antes de redirecionar
    setTimeout(() => {
        window.location.href = url;
    }, 1000); // 1000ms = 1 segundo
}
