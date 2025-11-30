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