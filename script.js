// =========================================
// 1. SISTEMA DE BUSCA (DIGITAR)
// =========================================
const barraDePesquisa = document.getElementById('input-busca');
const todosOsProdutos = document.querySelectorAll('.card-produto');

if (barraDePesquisa) {
    barraDePesquisa.addEventListener('input', function() {
        const oQueFoiDigitado = barraDePesquisa.value.toLowerCase();

        todosOsProdutos.forEach(produto => {
            const titulo = produto.querySelector('.titulo-produto').textContent.toLowerCase();
            
            if (titulo.includes(oQueFoiDigitado)) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    });
}

// =========================================
// 2. SISTEMA DE FILTRO (CATEGORIAS E LANÇAMENTOS)
// =========================================
function filtrarProdutos(categoriaDesejada) {
    // Limpa a barra de pesquisa visualmente
    if (barraDePesquisa) barraDePesquisa.value = '';

    todosOsProdutos.forEach(produto => {
        // Pega as etiquetas que você colocou no HTML (ex: "iphone lancamento")
        const categoriasDoProduto = produto.getAttribute('data-categoria');

        if (categoriaDesejada === 'todos') {
            // Se clicou em "Ver Tudo", mostra tudo
            produto.style.display = "block";
        } else {
            // Verifica se o produto tem a categoria clicada
            // Ex: Se cliquei em 'mac', ele mostra tanto iMac quanto MacBook
            if (categoriasDoProduto && categoriasDoProduto.includes(categoriaDesejada)) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        }
    });

    // Rola a tela suavemente até a vitrine
    const vitrine = document.getElementById('vitrine');
    if (vitrine) {
        vitrine.scrollIntoView({ behavior: 'smooth' });
    }
}

// =========================================
// 3. SISTEMA DE MUDANÇA DE COR (IPHONE 17)
// =========================================
function mudarCor(elemento, novaImagem, novoNome) {
    // Acha o card onde você clicou
    const card = elemento.closest('.card-produto');
    
    // Troca a foto
    const img = card.querySelector('.img-container img');
    img.src = novaImagem;
    
    // Troca o título
    const titulo = card.querySelector('.titulo-produto');
    titulo.innerText = novoNome;
    
    // Troca o link do WhatsApp
    const linkZap = card.querySelector('.btn-whatsapp');
    const textoZap = encodeURIComponent(`Tenho interesse no ${novoNome}!`);
    linkZap.href = `https://wa.me/5548984023936?text=${textoZap}`;
}

