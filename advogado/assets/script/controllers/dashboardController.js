import ApiService from '../../../../assets/js/services/apiService.js';

async function fetchDemandas(requerenteId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/advogado/requerente/${requerenteId}/demandas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ApiService.getAccessToken()}`
            }
        })

        const resJson = await response.json();
        
        if (response.ok) {
            return resJson.demanda_list || [];
        } else {
            console.error('Erro no servidor:', resJson);
            return [];
        }

    } catch (error) {
        console.error('Erro na requisição de demandas:', error);
        return [];
    }
}

async function fetchRequerentes() {
    try {
        const response = await fetch('http://127.0.0.1:5000/advogado/requerentes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ApiService.getAccessToken()}`
            }
        })

        const resJson = await response.json();
        const requerentes = resJson.requerentes_list;

        for (const requerente of requerentes) {
            try {
                requerente.demandas = await fetchDemandas(requerente.id_requerente);
            } catch (err) {
                console.error(`Erro ao buscar demandas do requerente ${requerente.id_requerente}:`, err);
                requerente.demandas = [];
            }
        }

        renderRequerentes(requerentes);

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar requerentes. Veja o console.');
    }
}

function renderRequerentes(requerentes) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    requerentes.forEach(requerente => {
        const tr = document.createElement('tr');

        const nomeTd = document.createElement('td');
        nomeTd.textContent = requerente.nome;
        tr.appendChild(nomeTd);

        const estadoTd = document.createElement('td');
        estadoTd.textContent = requerente.demandas[0]?.status || '---';
        tr.appendChild(estadoTd);

        tableBody.appendChild(tr);
    });

    document.getElementById('petitioners-length').textContent = requerentes.length;
    document.getElementById('petitions-length').textContent = requerentes.reduce((acc, curr) => acc + curr.demandas.length, 0);
}

window.addEventListener('DOMContentLoaded', fetchRequerentes);