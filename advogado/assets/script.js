function initGraphics(){
    const ctx = document.getElementById('winRate').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                label: 'Casos Ganhos',
                data: [4, 6, 5, 6, 4, 3],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.4)',
                fill: true,
                tension: 0.1
            }, {
                label: 'Casos Perdidos',
                data: [2, 1, 2, 2, 2, 1],
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.4)',
                fill: true,
                tension: 0.1
            },
            {
                label: 'Casos em Andamento',
                data: [0, 0, 1, 3, 6, 7],
                borderColor: 'rgba(127, 166, 204)',
                backgroundColor: 'rgba(127, 166, 204, 0.4)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function addressAutocomplete() {
    const url = 'http://127.0.0.1:5000/cep/';
    const value = document.getElementById('cep').value;

    if (value.length !== 8)
        return

    fetch(url + value)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        document.getElementById('street').value = data.logradouro || '';
        document.getElementById('neighborhood').value = data.bairro || '';
        document.getElementById('city').value = data.localidade || '';
        document.getElementById('state').value = data.uf || '';
    })
    .catch(err => console.error('Fetch error:', err));
}

function getNews(){
    const main = document.querySelector('main');

    const newsSection = document.createElement('section');
    newsSection.id = 'news';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const cardTitle = document.createElement('h2');
    cardTitle.innerText = 'Notícias'

    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container';

    cardDiv.appendChild(cardTitle)
    cardDiv.appendChild(newsContainer)
    newsSection.appendChild(cardDiv);
    main.appendChild(newsSection)
    
    fetch('http://127.0.0.1:5000/news')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';

                const title = document.createElement('h3');
                title.innerText = item.title || 'No Title';

                const image = document.createElement('img');
                image.src = item.image || '#';
                image.alt = item.title || 'No Image';

                const link = document.createElement('a');
                link.href = 'https://www.tjsp.jus.br' + item.link || '#';
                link.target = '_blank';
                
                link.appendChild(image);
                link.appendChild(title);
                newsItem.appendChild(link);

                newsContainer.appendChild(newsItem);
            });
        } else {
            newsSection.innerText = 'Nenhuma notícia encontrada.';
        }
    })
    .catch(error => {
        console.error('Erro ao carregar notícias:', error);
        newsSection.innerText = 'Erro ao carregar notícias.';
    });
}

function confirmExit(page='../index.html'){
    const response = confirm('Deseja sair da conta?');

    if (response == true)
        window.location.href = page;
}

function changePlan(n){
    
    switch(n){
        case 1:
            
            document.getElementById("free-plan").classList.add("plan-choosed");
            document.getElementById("premium-plan").classList.remove("plan-choosed");
            document.getElementById("advanced-plan").classList.remove("plan-choosed");
            break;
        case 2:
            
            document.getElementById("free-plan").classList.remove("plan-choosed");
            document.getElementById("premium-plan").classList.add("plan-choosed");
            document.getElementById("advanced-plan").classList.remove("plan-choosed");
            break;
        case 3:
            
            document.getElementById("free-plan").classList.remove("plan-choosed");
            document.getElementById("premium-plan").classList.remove("plan-choosed");
            document.getElementById("advanced-plan").classList.add("plan-choosed");
            break;

    }
}