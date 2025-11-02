import ApiService from '../../../../assets/js/services/apiService.js';

async function fetchRequerentes() {
    try {
        const response = await fetch('http://127.0.0.1:5000/advogado/requerentes', {
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
    const selectPetitioner = document.querySelector('#select-petitioner');

    const petitionersHtml = requerentes.map(e => {
        return `<option value="${e.id_requerente}">${e.nome ? e.nome : e.nome_social}</option>`;
    });

    selectPetitioner.innerHTML = petitionersHtml.join('');
}

window.addEventListener('DOMContentLoaded', () => {
    fetchRequerentes();

    document.getElementById('registerDemanda').addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = {};
       
        formData.forEach((value, key) => {
            const el = form.querySelector(`[name="${key}"]`);
            if (!el) return;

            if (el.type === 'number') {
                data[key] = value ? parseFloat(value) : null;
            } else if (el.type !== 'checkbox') {
                data[key] = value;
            }
        });

        form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            data[checkbox.name] = checkbox.checked;
        });

        const petitionerId = data.petitioner;
        delete data.petitioner;

        console.log("Payload:", data);
        console.log("petitioner:", petitionerId);

        try {
            const response = await fetch(`http://127.0.0.1:5000/requerente/${petitionerId}/demanda`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`,
                },
                body: JSON.stringify(data),
            });

            const resJson = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                console.log(resJson);
            } else {
                alert(`Erro: ${resJson.message}`);
                console.error(resJson);
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao enviar dados. Veja o console.');
        }
    });
});
