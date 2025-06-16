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

function closeAllModals() {
    document.querySelectorAll('dialog').forEach(modal => modal.close());
    document.getElementById('fade').style.display = 'none';
}

function renderRequerentes(requerentes) {
    const tableBody = document.querySelector('table tbody');
    const modalsContainer = document.getElementById('modals-container');
    tableBody.innerHTML = '';
    modalsContainer.innerHTML = '';

    requerentes.forEach(requerente => {
        const tr = document.createElement('tr');

        const nomeTd = document.createElement('td');
        nomeTd.textContent = requerente.nome;
        tr.appendChild(nomeTd);

        const estadoTd = document.createElement('td');
        estadoTd.textContent = requerente.estado_processo || '---';
        tr.appendChild(estadoTd);

        const acoesTd = document.createElement('td');

        // Botão Ver Cliente
        const btnCliente = document.createElement('button');
        btnCliente.textContent = 'Ver Cliente';
        btnCliente.onclick = () => {
            const modal = document.getElementById(`modal-cliente-${requerente.id_requerente}`);
            modal.showModal();
            document.getElementById('fade').style.display = 'block';
        };

        // Botão Ver Processo (você pode personalizar isso depois)
        const btnProcesso = document.createElement('button');
        btnProcesso.textContent = 'Ver Processo';
        btnProcesso.onclick = () => {
            const modal = document.getElementById(`modal-processo-${requerente.id_requerente}`);
            if (modal) {
                modal.showModal();
                document.getElementById('fade').style.display = 'block';
            } else {
                alert('Processo não disponível, ou inexistente.');
            }
        };

        acoesTd.appendChild(btnCliente);
        acoesTd.appendChild(btnProcesso);
        tr.appendChild(acoesTd);

        tableBody.appendChild(tr);

        const modalCliente = document.createElement('dialog');
        modalCliente.id = `modal-cliente-${requerente.id_requerente}`;
        modalCliente.innerHTML = `
        <div class="details-content">
            <h2>Dados do Cliente: ${requerente.nome}</h2>

            <div class="client-information">
            <label>CPF/CNPJ</label>
            <input type="text" value="${requerente.cpf_cnpj}" disabled>

            <label>RG</label>
            <input type="text" value="${requerente.rg}" disabled>

            <label>Estado Civil</label>
            <input type="text" value="${requerente.estado_civil}" disabled>

            <label>Gênero</label>
            <input type="text" value="${requerente.genero}" disabled>

            <label>Profissão</label>
            <input type="text" value="${requerente.profissao}" disabled>

            <label>Email</label>
            <input type="text" value="${requerente.email}" disabled>

            <label>Endereço</label>
            <input type="text" value="${requerente.logradouro}, ${requerente.num_imovel}, ${requerente.bairro} - ${requerente.cidade}/${requerente.estado}" disabled>
            </div>

            <button class="btn-dialog" onclick="document.getElementById('${modalCliente.id}').close(); document.getElementById('fade').style.display = 'none';">Fechar</button>
        </div>
        `;
        modalsContainer.appendChild(modalCliente);

    });

    const linhasFaltando = 10 - requerentes.length;
    for (let i = 0; i < linhasFaltando; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
}

window.addEventListener('DOMContentLoaded', fetchRequerentes);
