import { atualizarMoedas, atualizarInventario, salvarNoLocalStorage, vetorInventario, getMoedasUsuario, setMoedasUsuario } from "./inventario-e-moeda.js";
import { exibirAlerta } from "./popup-e-alerta.js";

// adiciona evento de clique em cada item da loja
document.querySelectorAll('.item-loja img').forEach(item => {
    item.addEventListener('click', () => {
    const id = item.getAttribute('data-planta');

    document.getElementById(`confirmar-compra-${id}`).style.display = 'flex';
     // console.log(`Clicou no item ${id}`);

    item.style.display = 'none';
    });
});

// adiciona evento de clique nos botões "confirmar" e "negar"
document.querySelectorAll('.confirmar-compra').forEach(container => {
    const confirmar = container.querySelector('.confirmar');
    const negar = container.querySelector('.negar');

    confirmar.addEventListener('click', () => {
    const id = confirmar.getAttribute('data-semente');
    const preco = parseInt(confirmar.getAttribute('data-preco'));

    if (getMoedasUsuario() >= preco) {
        comprarItem(id, preco);
    }

    container.style.display = 'none';

    // reativa a imagem correspondente (ícone da planta)
    const imagem = document.querySelector(`.item-loja img[data-planta="${id}"]`);
    if (imagem) {
        imagem.style.display = 'block';
    }

    // console.log(`Clicou em confirmar compra do item ${id}`);
    });

    negar.addEventListener('click', () => {
    const id = confirmar.getAttribute('data-semente');
    container.style.display = 'none';

      // reativa a imagem correspondente
    const imagem = document.querySelector(`.item-loja img[data-planta="${id}"]`);
    if (imagem) {
        imagem.style.display = 'block';
    }

      // console.log(`Clicou em negar compra do item ${id}`);
    });
});

// função para comprar um item
export function comprarItem(id, preco) {
    const semente = vetorInventario.find((s) => s.id === id);

    if (semente) {
        if (getMoedasUsuario() >= preco) {
        setMoedasUsuario(getMoedasUsuario() - preco); // subtrai o valor da compra
        semente.qtdeInventario++; // incrementa a quantidade no inventário
        atualizarMoedas();
        atualizarInventario();
        salvarNoLocalStorage();
        //console.log(`Compra realizada: ${id}`);
        // console.log(`Moedas restantes: ${moedasUsuario}`);
        // console.log(`Quantidade: ${semente.qtdeInventario}`);
        } else {
        exibirAlerta('VALOR INSUFICIENTE PARA COMPRAR!');
        // console.log("Valor insuficiente para comprar.");
        }
    } else {
      // console.log("Item não encontrado no inventário.");
    }
}