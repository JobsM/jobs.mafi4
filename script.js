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
        const categoriasDoProduto = produto.getAttribute('data-categoria');

        if (categoriaDesejada === 'todos') {
            produto.style.display = "block";
        } else {
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

// =========================================
// 4. CARROSSEL ANIMADO (SLIDESHOW) - CORRIGIDO
// =========================================
let slideIndex = 0;
mostrarSlides();

function mostrarSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Esconde todos os slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // Aumenta o índice (passa pro próximo)
    slideIndex++;
    
    // Se passar do último, volta pro primeiro
    if (slideIndex > slides.length) {slideIndex = 1}    

    // Remove a cor da bolinha ativa anterior
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Mostra o slide atual e acende a bolinha
    slides[slideIndex-1].style.display = "block";  
    
    // Garante que as bolinhas correspondam aos slides
    if (dots[slideIndex-1]) {
        dots[slideIndex-1].className += " active";
    }

    // Roda a função de novo daqui a 4 segundos
    setTimeout(mostrarSlides, 4000); 
}

// Mostrar primeiro slide ao carregar
document.addEventListener('DOMContentLoaded', function() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length > 0) {
        slides[0].style.display = "block";
        if (dots.length > 0) {
            dots[0].className += " active";
        }
    }
});