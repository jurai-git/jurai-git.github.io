import ApiService from '../../../../assets/js/services/apiService.js';

async function fetchRequerentes() {
    try {
        const response = await fetch('https://jurai-server.onrender.com/advogado/requerentes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ApiService.getAccessToken()}`
            }
        })

        const resJson = await response.json();

        if (response.ok) {
            console.log('Requerentes:', resJson.requerentes_list);
            renderRequerentes(resJson.requerentes_list);
        } else {
            alert(`Erro: ${resJson.message}`);
            console.error(resJson);
        }

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
        estadoTd.textContent = requerente.estado_processo || '---';
        tr.appendChild(estadoTd);

        tableBody.appendChild(tr);
    });
}

window.addEventListener('DOMContentLoaded', fetchRequerentes);