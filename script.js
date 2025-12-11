// 1. Seleciona a caixa de texto
        const barraDePesquisa = document.getElementById('input-busca');
        
        // 2. Seleciona todos os cards de produtos
        const todosOsProdutos = document.querySelectorAll('.card-produto');

        // 3. Ouve cada letra que você digita
        barraDePesquisa.addEventListener('input', function() {
            const oQueFoiDigitado = barraDePesquisa.value.toLowerCase(); // Transforma em minúsculo

            todosOsProdutos.forEach(produto => {
                // Pega o título dentro do card
                const tituloDoProduto = produto.querySelector('.titulo-produto').textContent.toLowerCase();

                // Verifica se o título tem o texto digitado
                if (tituloDoProduto.includes(oQueFoiDigitado)) {
                    produto.style.display = "block"; // Mostra
                } else {
                    produto.style.display = "none";  // Esconde
                }
            });
        });

        function mudarCor(elemento, novaImagem, novoNome) {
    // 1. Acha o card onde você clicou
    const card = elemento.closest('.card-produto');
    
    // 2. Troca a foto
    const img = card.querySelector('.img-container img');
    img.src = novaImagem;
    
    // 3. Troca o título
    const titulo = card.querySelector('.titulo-produto');
    titulo.innerText = novoNome;
    
    // 4. Troca o link do WhatsApp para já ir com a cor certa
    const linkZap = card.querySelector('.btn-whatsapp');
    const textoZap = encodeURIComponent(`Tenho interesse no ${novoNome}!`);
    linkZap.href = `https://wa.me/5548984023936?text=${textoZap}`;
}
