// =========================================
// 1. SISTEMA DE BUSCA
// =========================================
const barraDePesquisa = document.getElementById('input-busca');
const todosOsProdutos = document.querySelectorAll('.card-produto');

if (barraDePesquisa) {
    barraDePesquisa.addEventListener('input', function () {
        const oQueFoiDigitado = barraDePesquisa.value.toLowerCase().trim();

        todosOsProdutos.forEach(produto => {
            const titulo = produto.querySelector('.titulo-produto');
            if (!titulo) return;
            const texto = titulo.textContent.toLowerCase();

            if (texto.includes(oQueFoiDigitado)) {
                produto.style.display = '';
            } else {
                produto.style.display = 'none';
            }
        });
    });
}

// =========================================
// 2. SISTEMA DE FILTRO (por categoria)
// =========================================
function filtrarProdutos(categoriaDesejada) {
    if (barraDePesquisa) barraDePesquisa.value = '';

    todosOsProdutos.forEach(produto => {
        const categorias = produto.getAttribute('data-categoria') || '';

        if (categoriaDesejada === 'todos') {
            produto.style.display = '';
        } else {
            produto.style.display = categorias.includes(categoriaDesejada) ? '' : 'none';
        }
    });

    // Scroll suave até a vitrine, se existir
    const vitrine = document.getElementById('vitrine');
    if (vitrine) {
        vitrine.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// =========================================
// 3. SISTEMA DE MUDANÇA DE COR
// =========================================
function mudarCor(elemento, novaImagem, novoNome) {
    const card = elemento.closest('.card-produto');
    if (!card) return;

    const img = card.querySelector('.img-container img');
    if (img) img.src = novaImagem;

    const titulo = card.querySelector('.titulo-produto');
    if (titulo) titulo.innerText = novoNome;

    const linkZap = card.querySelector('.btn-comprar, .btn-whatsapp');
    if (linkZap && linkZap.href && linkZap.href.includes('wa.me')) {
        const textoZap = encodeURIComponent(`Tenho interesse no ${novoNome}!`);
        linkZap.href = `https://wa.me/5548984023936?text=${textoZap}`;
    }
}

// =========================================
// 4. CARROSSEL (hero slider)
// =========================================
let slideIndex = 0;
let slides = document.getElementsByClassName('mySlides');
let dots   = document.getElementsByClassName('dot');
let sliderTimer = null;

function mostrarSlide(idx) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        slides[i].classList.remove('fade');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[idx].style.display = 'block';
    // Força reflow para a animação reiniciar
    void slides[idx].offsetWidth;
    slides[idx].classList.add('fade');

    if (dots[idx]) dots[idx].classList.add('active');
}

function avancarSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    mostrarSlide(slideIndex);
    sliderTimer = setTimeout(avancarSlide, 5000);
}

// Clique nos dots
Array.from(dots).forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearTimeout(sliderTimer);
        slideIndex = i;
        mostrarSlide(slideIndex);
        sliderTimer = setTimeout(avancarSlide, 5000);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if (slides.length > 0) {
        mostrarSlide(0);
        sliderTimer = setTimeout(avancarSlide, 4500);
    }
});

// =========================================
// 5. SCROLL REVEAL (IntersectionObserver)
// =========================================
document.addEventListener('DOMContentLoaded', function () {
    const elementos = document.querySelectorAll('.reveal');
    if (!elementos.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    elementos.forEach(el => observer.observe(el));
});

// =========================================
// 6. PARALLAX SUAVE NO HERO
// =========================================
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('hero');
    if (!hero) return;

    // Só ativa em telas maiores (performance mobile)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroImg = hero.querySelector('.hero-image-box img');
                if (heroImg && scrollY < hero.offsetHeight) {
                    heroImg.style.transform = `translateY(${scrollY * 0.18}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

// =========================================
// 7. APPLE HERO INTERACTIVE (SCROLL FRAME SWAP & COLOR SELECTOR)
// =========================================
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('apple-hero-track');
    if (!track) return;

    const frames = track.querySelectorAll('.apple-product-frame');
    if (!frames.length) return;

    let ticking = false;

    function updateHeroFrame() {
        const rect = track.getBoundingClientRect();
        const totalScrollable = track.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const scrolled = -rect.top;
        let progress = scrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        const frameCount = frames.length;
        const targetIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        frames.forEach((frame, idx) => {
            if (idx === targetIndex) {
                frame.classList.add('active-frame');
            } else {
                frame.classList.remove('active-frame');
            }
        });
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateHeroFrame();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateHeroFrame();
});

function selecionarCorAppleHero(button, imgSrc, colorName) {
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(sw => sw.classList.remove('selected'));
    button.classList.add('selected');

    const activeFrame = document.querySelector('.apple-product-frame.active-frame') || document.querySelector('.apple-product-frame');
    if (activeFrame) {
        activeFrame.style.opacity = '0';
        setTimeout(() => {
            activeFrame.src = imgSrc;
            activeFrame.alt = `iPhone 18 Pro Max ${colorName}`;
            activeFrame.style.opacity = '1';
        }, 200);
    }
}

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