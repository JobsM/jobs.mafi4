// =========================================
// 1. SISTEMA DE BUSCA
// =========================================
const barraDePesquisa = document.getElementById('input-busca');
const todosOsProdutos = document.querySelectorAll('.card-produto');

if (barraDePesquisa) {
    barraDePesquisa.addEventListener('input', function() {
        const oQueFoiDigitado = barraDePesquisa.value.toLowerCase();

        todosOsProdutos.forEach(produto => {
            const titulo = produto.querySelector('.titulo-produto').textContent.toLowerCase();
            
            if (titulo.includes(oQueFoiDigitado)) {
                produto.style.display = "flex";
            } else {
                produto.style.display = "none";
            }
        });
    });
}

// =========================================
// 2. SISTEMA DE FILTRO (via menu dropdown)
// =========================================
function filtrarProdutos(categoriaDesejada) {
    if (barraDePesquisa) barraDePesquisa.value = '';

    todosOsProdutos.forEach(produto => {
        const categoriasDoProduto = produto.getAttribute('data-categoria');

        if (categoriaDesejada === 'todos') {
            produto.style.display = "flex";
        } else {
            if (categoriasDoProduto && categoriasDoProduto.includes(categoriaDesejada)) {
                produto.style.display = "flex";
            } else {
                produto.style.display = "none";
            }
        }
    });

    const vitrine = document.getElementById('vitrine');
    if (vitrine) {
        vitrine.scrollIntoView({ behavior: 'smooth' });
    }
}

// =========================================
// 3. SISTEMA DE MUDANÇA DE COR
// =========================================
function mudarCor(elemento, novaImagem, novoNome) {
    const card = elemento.closest('.card-produto');
    
    const img = card.querySelector('.img-container img');
    img.src = novaImagem;
    
    const titulo = card.querySelector('.titulo-produto');
    titulo.innerText = novoNome;
    
    const linkZap = card.querySelector('.btn-whatsapp');
    const textoZap = encodeURIComponent(`Tenho interesse no ${novoNome}!`);
    linkZap.href = `https://wa.me/5548984023936?text=${textoZap}`;
}

// =========================================
// 4. CARROSSEL
// =========================================
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");

function mostrarSlides() {
    if (slides.length === 0) return;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
    
    setTimeout(mostrarSlides, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[0].style.display = "block";
        if (dots[0]) dots[0].className += " active";
        
        slideIndex = 1;
        setTimeout(mostrarSlides, 5000);
    }
});

// =========================================
// SISTEMA DE LOGIN (COMENTADO - DESCOMENTE QUANDO FOR USAR)
// =========================================

// Configuração do Supabase (SUBSTITUIR PELAS SUAS CHAVES)
// const SUPABASE_URL = 'https://seu-projeto.supabase.co';
// const SUPABASE_KEY = 'sua-chave-anon-publica';
// const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// const loginModal = document.getElementById('loginModal');
// const signupModal = document.getElementById('signupModal');
// const btnLogin = document.getElementById('btnLogin');

// if (btnLogin) {
//     btnLogin.addEventListener('click', () => {
//         loginModal.style.display = 'block';
//     });
// }

// document.querySelectorAll('.close-modal').forEach(el => {
//     el.addEventListener('click', () => {
//         loginModal.style.display = 'none';
//     });
// });

// document.querySelectorAll('.close-modal2').forEach(el => {
//     el.addEventListener('click', () => {
//         signupModal.style.display = 'none';
//     });
// });

// window.addEventListener('click', (e) => {
//     if (e.target === loginModal) loginModal.style.display = 'none';
//     if (e.target === signupModal) signupModal.style.display = 'none';
// });

// async function loginWithGoogle() {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: { redirectTo: window.location.origin }
//     });
//     if (error) alert('Erro no login com Google: ' + error.message);
// }

// async function loginWithApple() {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'apple',
//         options: { redirectTo: window.location.origin }
//     });
//     if (error) alert('Erro no login com Apple: ' + error.message);
// }

// async function loginWithFacebook() {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'facebook',
//         options: { redirectTo: window.location.origin }
//     });
//     if (error) alert('Erro no login com Facebook: ' + error.message);
// }