const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'v40.html');
const imgDir = path.join(__dirname, 'img');

let template = fs.readFileSync(templatePath, 'utf8');

function generateBikeHtml(filename, title, shortTitle, subtitle, descCurta, descLonga, imgPrefix) {
    let html = template;
    
    // Replace titles and breadcrumbs
    html = html.replace(/<title>.*?<\/title>/, `<title>${title} | JOBS MAFIA</title>`);
    html = html.replace(/<span>V40 Pro<\/span>/, `<span>${shortTitle}</span>`);
    html = html.replace(/<h1 class="produto-titulo">.*?<\/h1>/, `<h1 class="produto-titulo">${title}</h1>`);
    html = html.replace(/<p class="produto-subtitulo">.*?<\/p>/, `<p class="produto-subtitulo">${subtitle}</p>`);
    
    // Replace short description
    const descCurtaHtml = `<div class="descricao-curta">
                    <h3>✨ A Evolução da Mobilidade ✨</h3>
                    <p>${descCurta}</p>
                </div>`;
    html = html.replace(/<div class="descricao-curta">[\s\S]*?<\/div>/, descCurtaHtml);
    
    // Replace long description
    const detalhesTexto = `<div class="detalhes-texto">
                <h2>Conheça a ${shortTitle}</h2>
                <p>${descLonga}</p>
            </div>`;
    html = html.replace(/<div class="detalhes-texto">[\s\S]*?<\/div>/, detalhesTexto);
    
    // Replace WhatsApp links text
    const encodedTitle = encodeURIComponent(title);
    html = html.replace(/text=Ol%C3%A1%20Kerolen.*?gostaria%20de%20titar.*?%21|text=Ol%C3%A1%20Kerolen.*?(?=")/g, `text=Olá%20Kerolen,%20tenho%20interesse%20na%20${encodedTitle},%20gostaria%20de%20dúvidas/comprar!`);
    html = html.replace(/text=Ol%C3%A1%20Guilherme.*?gostaria%20de%20titar.*?%21|text=Ol%C3%A1%20Guilherme.*?(?=")/g, `text=Olá%20Guilherme,%20tenho%20interesse%20na%20${encodedTitle},%20gostaria%20de%20dúvidas/comprar!`);
    
    // Process images
    const allFiles = fs.readdirSync(imgDir);
    let images = [];
    if (Array.isArray(imgPrefix)) {
        images = imgPrefix.filter(f => fs.existsSync(path.join(imgDir, f)));
    } else {
        images = allFiles.filter(f => {
            if (!f.endsWith('.webp')) return false;
            if (f.includes('product')) return false;
            
            if (imgPrefix === 'x50action') {
                return f.includes('x50action') && !f.includes('pro');
            }
            return f.startsWith(imgPrefix) && !f.toLowerCase().includes('action');
        });
        if (images.length === 0) {
            images = allFiles.filter(f => f.startsWith(imgPrefix) && f.endsWith('.webp'));
        }
    }

    let mainSlides = '';
    let thumbSlides = '';
    
    images.forEach((img, i) => {
        mainSlides += `                        <div class="swiper-slide">
                            <div class="swiper-zoom-container">
                                <img src="./img/${img}" alt="${shortTitle} Imagem ${i+1}" />
                            </div>
                        </div>\n`;
        thumbSlides += `                        <div class="swiper-slide">
                            <img src="./img/${img}" />
                        </div>\n`;
    });

    // Replace Swiper wrappers
    html = html.replace(/<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<div class="swiper-button-next custom-swiper-btn">/, `<div class="swiper-wrapper">\n${mainSlides}                    </div>\n                    <div class="swiper-button-next custom-swiper-btn">`);
    
    html = html.replace(/<div thumbsSlider="" class="swiper mySwiper gallery-thumbs">\s*<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>/, `<div thumbsSlider="" class="swiper mySwiper gallery-thumbs">\n                    <div class="swiper-wrapper">\n${thumbSlides}                    </div>\n                </div>`);
    
    fs.writeFileSync(path.join(__dirname, filename), html, 'utf8');
    console.log(`Generated ${filename}`);
}

const bikes = [
    {
        filename: "t16.html",
        title: "Bicicleta Elétrica T16",
        shortTitle: "T16",
        subtitle: "Até 116km de autonomia ⚡️🤯",
        descCurta: "A T16 é perfeita para quem quer ir além. Com estrutura reforçada, excelente autonomia e desempenho forte, ela foi feita para encarar o dia a dia com conforto, segurança e estilo.",
        descLonga: "Desempenho que impressiona com velocidade máxima de até 45 km/h, enfrentando subidas de até 25°. Sua estrutura robusta suporta até 150 kg, com quadro em liga de alumínio 6061 e proteção IP54.",
        imgPrefix: "t16"
    },
    {
        filename: "y16.html",
        title: "Bicicleta Elétrica Y16",
        shortTitle: "Y16",
        subtitle: "Até 84km de autonomia ⚡️🤯",
        descCurta: "A Y16 é a escolha perfeita para quem busca mobilidade moderna, econômica e com alto desempenho. Com design robusto e tecnologia eficiente, ela entrega velocidade, autonomia e conforto em qualquer trajeto.",
        descLonga: "Desempenho ágil, com velocidade máxima de até 45 km/h. Condução estável e potente com autonomia inteligente de até 84 km no modo assistido e 48 km no modo elétrico.",
        imgPrefix: "y16"
    },
    {
        filename: "x50-action.html",
        title: "Bicicleta Elétrica X50 ACTION",
        shortTitle: "X50 ACTION",
        subtitle: "A revolução sobre duas rodas 🔥",
        descCurta: "Já pensou em unir estilo, potência e liberdade em uma só bike? A X50 Action chegou para transformar sua mobilidade.",
        descLonga: "Não precisa de CNH, rodando até 60km com suspensão dupla e pneus largos Kenda 20x4.0. Estabilidade e segurança em qualquer solo com um design retrô moderno.",
        imgPrefix: "x50action"
    },
    {
        filename: "v9-max.html",
        title: "Bike elétrica V9 Max 1000W",
        shortTitle: "V9 MAX",
        subtitle: "A fusão perfeita entre potência, conforto e segurança!",
        descCurta: "Com 1000W de potência real e autonomia de até 60km, você tem liberdade para explorar a cidade com desempenho e eficiência incomparáveis.",
        descLonga: "Equipada com freios hidráulicos, alarme integrado com controle remoto e trava de segurança na roda. Seu design robusto e moderno garante estabilidade e conforto.",
        imgPrefix: "v9max"
    },
    {
        filename: "v35.html",
        title: "Bicicleta Elétrica V35 1000W",
        shortTitle: "V35",
        subtitle: "Autonomia de até 120km com motor 1000W",
        descCurta: "A Inow V35 chegou para quem quer liberdade de verdade na mobilidade. Ideal para quem quer ir mais longe gastando muito menos.",
        descLonga: "A V35 pode atingir até 120 km de autonomia usando duas baterias 48V 15.6Ah. Câmbio Shimano de 7 velocidades, freios a disco, 5 níveis de pedal assistido e muito mais.",
        imgPrefix: "v35"
    },
    {
        filename: "v20-mini.html",
        title: "Bicicleta Elétrica V20 Mini 750W",
        shortTitle: "V20 Mini",
        subtitle: "Compacta, moderna e potente",
        descCurta: "A Inow V20 Mini é a bicicleta elétrica perfeita para quem busca mobilidade, estilo e praticidade no dia a dia com seu motor potente de 750W.",
        descLonga: "Com autonomia de até 50 km e velocidade de 32 km/h, apresenta pneus largos 16x4.0, suspensão dupla, freios hidráulicos e muito mais modernidade com display LCD e NFC.",
        imgPrefix: "v20mini"
    },
    {
        filename: "x30.html",
        title: "Bicicleta Elétrica X30 1000W",
        shortTitle: "X30",
        subtitle: "Moderna, potente e eficiente",
        descCurta: "A Bicicleta Elétrica X30 da Inow é a escolha perfeita para quem busca performance, conforto e autonomia de até 60km ideal para percursos urbanos.",
        descLonga: "Com motor elétrico de 1.000 W que garante forte torque nas subidas, e bateria removível 48 V 15.6 Ah. Autonomia de 60km, freios a disco e display digital.",
        imgPrefix: "x30"
    },
    {
        filename: "ouxi-v9.html",
        title: "Bicicleta Elétrica OUXI V9",
        shortTitle: "OUXI V9",
        subtitle: "Praticidade, conforto e economia",
        descCurta: "A OUXI V9 é a bicicleta elétrica ideal. Compacta, eficiente e extremamente confortável, pensada para o dia a dia urbano e deslocamentos rápidos.",
        descLonga: "Bateria de lítio removível de 1000w. Assento largo, banco traseiro, pneus largos aro 20, e freios a disco para sua maior segurança e visibilidade.",
        imgPrefix: ["ouxiV9.webp", "ouxiV9-flashlight.webp", "ouxiV9-seat.webp", "ouxiV9-show-ofc.webp", "ouxiV9-show-seat.webp", "ouxiV9-show.webp", "ouxiV9-wheel.webp"]
    }
];

bikes.forEach(b => {
    generateBikeHtml(b.filename, b.title, b.shortTitle, b.subtitle, b.descCurta, b.descLonga, b.imgPrefix);
});
