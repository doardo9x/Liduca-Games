document.addEventListener('DOMContentLoaded', function() {
    const categoriaContainer = document.getElementById('genero-botoes');
    const jogoContainer = document.getElementById('jogos');

    // Botão para todas as categorias
    const allButton = document.createElement('button');
    allButton.textContent = 'Todos';
    allButton.className = 'botao-todos';
    allButton.onclick = carregarTodosJogos;
    categoriaContainer.appendChild(allButton);

    // Carregar gêneros e criar botões
    fetch('http://localhost:3000/generos')
        .then(response => response.json())
        .then(generos => {
            generos.forEach(genero => {
                const btn = document.createElement('button');
                btn.textContent = genero.nome_genero;
                btn.onclick = () => filtrarJogos(genero.id_genero); 
                categoriaContainer.appendChild(btn);
            });
        });

    function carregarTodosJogos() {
        fetch('http://localhost:3000/jogos')
            .then(response => response.json())
            .then(jogos => mostrarJogos(jogos))
            .catch(error => console.error('Erro ao buscar os jogos:', error));
    }

    function filtrarJogos(id_genero) {
        fetch(`http://localhost:3000/jogos?id_genero=${id_genero}`)
            .then(response => response.json())
            .then(jogos => mostrarJogos(jogos))
            .catch(error => console.error('Erro ao filtrar os jogos:', error));
    }

    function mostrarJogos(jogos) {
        const container = document.getElementById('jogos');
        container.innerHTML = '';
        jogos.forEach(jogo => {
            const div = document.createElement('div');
            div.className = 'jogo';
            div.innerHTML = `
                <h3>${jogo.nome}</h3>
                <img src="img/${jogo.id_jogo}.jpg" alt="${jogo.nome}" class="jogo-imagem">
                <p>${jogo.lancamento}</p>
            `;
            container.appendChild(div);
        });
    }

    // Carrega todos os jogos inicialmente
    carregarTodosJogos();
});
