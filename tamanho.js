const botoes = document.querySelectorAll('.btn');
const atualizar = document.querySelector('.btn-atualizar');
const photoCamisa = document.querySelector('.photo-camisa')

const produtoFinal = {
    quantidade: '',
    golaCamisa: '',
    corCamisa: '',
    tamanhoCamisa: '', 
    valorTotal: '',
}

let pedidos = []

const styleClothes = (e) => {
    const quantidadeInput = document.querySelector('.inputQntd');
    produtoFinal.quantidade = parseInt(quantidadeInput.value);
    
    if (e.target.value == "cor") {
        produtoFinal.corCamisa = e.target.innerHTML;
    } else if (e.target.value == "tamanho") {
        produtoFinal.tamanhoCamisa = e.target.innerHTML;
    } else if (e.target.value == "gola") {
        produtoFinal.golaCamisa = e.target.innerHTML;
    }

}

const atualizarTela = () => {
    gerarValorTotal();
    alterarPhoto();
    let pQuantidade = document.querySelector('.quantidade');
    let pGola = document.querySelector('.gola-camisa');
    let pCor = document.querySelector('.cor-camisa');
    let pTamanho = document.querySelector('.tamanho-camisa');
    let pValor = document.querySelector('.valor-total')

    pQuantidade.innerHTML = `Quantidade: ${produtoFinal.quantidade}`;
    pGola.innerHTML = `Tipo de Gola: ${produtoFinal.golaCamisa}`;
    pCor.innerHTML = `Cor da Camias: ${produtoFinal.corCamisa}`;
    pTamanho.innerHTML = `Tamanho da Camisa: ${produtoFinal.tamanhoCamisa}`;
    pValor.innerHTML = `Valor Total: ${produtoFinal.valorTotal}`;

    pedidos.push(produtoFinal);
    renderButton()
}

const gerarValorTotal = () => {
    produtoFinal.valorTotal = (produtoFinal.quantidade * 20)

    // Se for acima de 100 produtos = Desconto de 5% 
    // Se for acima de 500 produtos = Desconto de 10% 
    // Se for acima de 1000 Produtos = desconto de 15%
    // Se a cor da camisa for Preta, cobrar 2,50 a mais por cada unidade.

    if (produtoFinal.quantidade >= 1000) {
        produtoFinal.valorTotal *= 0.85;
    } else if (produtoFinal.quantidade >= 500) {
        produtoFinal.valorTotal *= 0.90;
    } else if (produtoFinal.quantidade >= 100) {
        produtoFinal.valorTotal *= 0.95;
    }

    if (produtoFinal.corCamisa == "Preta") {
        produtoFinal.valorTotal += (produtoFinal.quantidade * 2.50);
    }
}

const alterarPhoto = () => {
    if (produtoFinal.corCamisa == "Preta") {
        photoCamisa.src = "image/camisa-preta.jpg";
    } else {
        photoCamisa.src = "image/camisa-branca.jpg";
    }
}

const renderButton = () => {
    if (pedidos.length >= 1) {
        renderCarrinho();
    }
}

const renderCarrinho = () => {
    let body = document.querySelector('.pedidos');
    const divCarrinho = document.createElement('div');
    divCarrinho.classList.add('divCarrinho')
    body.appendChild(divCarrinho)

    for (let [key, value] of Object.entries(produtoFinal)) {
        let pedido = document.createElement('p')
        pedido.innerHTML = ` ${key} : ${value}`
        divCarrinho.appendChild(pedido)
    }
}



for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', styleClothes)
}
atualizar.addEventListener('click', atualizarTela)