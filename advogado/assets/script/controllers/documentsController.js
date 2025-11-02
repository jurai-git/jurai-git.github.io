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

function closeAllModals() {
    document.querySelectorAll('dialog').forEach(modal => modal.close());
    document.getElementById('fade').style.display = 'none';
}

function renderRequerentes(requerentes) {
    const tableBody = document.querySelector('table tbody');
    const modalsContainer = document.getElementById('modals-container');
    tableBody.innerHTML = '';
    modalsContainer.innerHTML = '';
    window.currentRequerentes = requerentes;

    requerentes.forEach(requerente => {
        const tr = document.createElement('tr');

        const nomeTd = document.createElement('td');
        nomeTd.textContent = requerente.nome;
        tr.appendChild(nomeTd);

        const acoesTd = document.createElement('td');

        const btnCliente = document.createElement('button');
        btnCliente.textContent = 'Ver Cliente';
        btnCliente.onclick = () => {
            const modal = document.getElementById(`modal-cliente-${requerente.id_requerente}`);
            modal.showModal();
            document.getElementById('fade').style.display = 'block';
        };

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
        modalCliente.className = 'modal-cliente';

        modalCliente.addEventListener('close', () => {
            document.getElementById('fade').style.display = 'none';
        });

        modalCliente.innerHTML = `
            <div class="modal-cliente-wrapper">
                <div class="modal-cliente-content">
                    <h2 class="cliente-content-title">Dados do Cliente: ${requerente.nome}</h2>
                    
                    <div class="client-fields-grid">
                        <div class="field">
                            <label>CPF/CNPJ</label>
                            <input type="text" value="${requerente.cpf_cnpj}" disabled>
                        </div>
                        
                        <div class="field">
                            <label>RG</label>
                            <input type="text" value="${requerente.rg}" disabled>
                        </div>
                        
                        <div class="field">
                            <label>Estado Civil</label>
                            <input type="text" value="${requerente.estado_civil}" disabled>
                        </div>
                        
                        <div class="field">
                            <label>Gênero</label>
                            <input type="text" value="${requerente.genero}" disabled>
                        </div>
                        
                        <div class="field field-full">
                            <label>Profissão</label>
                            <input type="text" value="${requerente.profissao}" disabled>
                        </div>
                        
                        <div class="field field-full">
                            <label>Email</label>
                            <input type="text" value="${requerente.email}" disabled>
                        </div>
                        
                        <div class="field field-full">
                            <label>Endereço</label>
                            <input type="text" value="${requerente.logradouro}, ${requerente.num_imovel}, ${requerente.bairro} - ${requerente.cidade}/${requerente.estado}" disabled>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-dialog" onclick="document.getElementById('${modalCliente.id}').close(); document.getElementById('fade').style.display = 'none';">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        `;
        modalsContainer.appendChild(modalCliente);

        renderDemandas(requerente);
    });

    const linhasFaltando = 10 - requerentes.length;
    for (let i = 0; i < linhasFaltando; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 2; j++) {
            const td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
}

function renderDemandas(requerente) {
    const modalsContainer = document.getElementById('modals-container');
    
    if (!requerente.demandas || requerente.demandas.length === 0) {
        return null;
    }

    const modalDemanda = document.createElement('dialog');
    modalDemanda.id = `modal-processo-${requerente.id_requerente}`;
    modalDemanda.className = 'modal-demandas';
    
    // Adiciona evento para fechar com ESC e limpar o fade
    modalDemanda.addEventListener('close', () => {
        document.getElementById('fade').style.display = 'none';
    });

    modalDemanda.innerHTML = `
        <div class="modal-demandas-wrapper">
            <div class="modal-demandas-sidebar">
                <h3 class="sidebar-title">
                    Demandas de ${requerente.nome.split(' ')[0]}
                </h3>
                <ul id="demandas-list-${requerente.id_requerente}" class="demandas-list">
                    ${requerente.demandas.map((demanda, index) => `
                        <li class="demanda-list-item">
                            <button 
                                class="demanda-item-btn ${index === 0 ? 'active' : ''}" 
                                onclick="window.showDemanda(${requerente.id_requerente}, ${index})"
                            >
                                <div class="demanda-title">
                                    ${demanda.identificacao || `Processo ${index + 1}`}
                                </div>
                                <div class="demanda-classe">
                                    ${demanda.classe}
                                </div>
                                <div class="demanda-status ${demanda.status === 'Concluído' ? 'status-concluido' : 'status-andamento'}">
                                    ${demanda.status}
                                </div>
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="modal-demandas-content">
                <div id="demanda-content-${requerente.id_requerente}">
                    ${renderDemandaContent(requerente.demandas[0], 0)}
                </div>

                <div class="modal-actions">
                    <button 
                        class="btn-dialog" 
                        onclick="document.getElementById('modal-processo-${requerente.id_requerente}').close(); document.getElementById('fade').style.display = 'none';"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `;

    modalsContainer.appendChild(modalDemanda);
    return modalDemanda;
}

function renderDemandaContent(demanda, index) {
    return `
        <h2 class="demanda-content-title">
            ${demanda.identificacao || `Processo ${index + 1}`}
        </h2>

        <div class="process-fields-grid">
            <div class="field">
                <label>Foro</label>
                <input type="text" value="${demanda.foro}" disabled>
            </div>

            <div class="field">
                <label>Status</label>
                <input type="text" value="${demanda.status}" disabled>
            </div>

            <div class="field">
                <label>Competência</label>
                <input type="text" value="${demanda.competencia}" disabled>
            </div>

            <div class="field">
                <label>Classe</label>
                <input type="text" value="${demanda.classe}" disabled>
            </div>

            <div class="field field-full">
                <label>Assunto Principal</label>
                <input type="text" value="${demanda.assunto_principal}" disabled>
            </div>

            <div class="field">
                <label>Valor da Ação</label>
                <input type="text" value="R$ ${demanda.valor_acao.toLocaleString('pt-BR', {minimumFractionDigits: 2})}" disabled>
            </div>
        </div>

        <div class="checkboxes-container">
            <label class="checkbox-label">
                <input type="checkbox" ${demanda.pedido_liminar ? 'checked' : ''} disabled>
                Pedido Liminar
            </label>
            <label class="checkbox-label">
                <input type="checkbox" ${demanda.segredo_justica ? 'checked' : ''} disabled>
                Segredo de Justiça
            </label>
            <label class="checkbox-label">
                <input type="checkbox" ${demanda.dispensa_legal ? 'checked' : ''} disabled>
                Dispensa Legal
            </label>
            <label class="checkbox-label">
                <input type="checkbox" ${demanda.justica_gratuita ? 'checked' : ''} disabled>
                Justiça Gratuita
            </label>
            <label class="checkbox-label">
                <input type="checkbox" ${demanda.guia_custas ? 'checked' : ''} disabled>
                Guia de Custas
            </label>
        </div>

        <div class="field">
            <label>Resumo</label>
            <textarea disabled class="resumo-textarea">${demanda.resumo}</textarea>
        </div>
    `;
}

function showDemanda(requerenteId, demandaIndex) {
    const requerente = window.currentRequerentes?.find(r => r.id_requerente === requerenteId);
    
    if (!requerente || !requerente.demandas[demandaIndex]) return;

    const contentDiv = document.getElementById(`demanda-content-${requerenteId}`);
    contentDiv.innerHTML = renderDemandaContent(requerente.demandas[demandaIndex], demandaIndex);

    const listContainer = document.getElementById(`demandas-list-${requerenteId}`);
    const buttons = listContainer.querySelectorAll('.demanda-item-btn');
    
    buttons.forEach((btn, idx) => {
        if (idx === demandaIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    .modal-demandas {
        border-radius: 8px;
        padding: 0;
        max-width: 90vw;
        width: 900px;
        max-height: 90vh;
        height: fit-content;
        background: transparent;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid var(--color-dialog-background-border);
    }

    .modal-demandas::backdrop {
        display: none;
    }

    .modal-demandas-wrapper {
        display: flex;
        height: 600px;
        max-height: 80vh;
        background-color: var(--color-dialog-background);
        border-radius: 8px;
        overflow: hidden;
    }

    .modal-demandas-sidebar {
        width: 250px;
        background-color: rgba(30, 30, 30, 0.95);
        border-right: 2px solid var(--color-dialog-background-border);
        overflow-y: auto;
        padding: 20px 10px;
    }

    .sidebar-title {
        margin: 0 0 15px 0;
        padding: 0 10px;
        font-size: 1.1rem;
        color: #cbd5e1;
    }

    .demandas-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .demanda-list-item {
        margin-bottom: 8px;
    }

    .demanda-item-btn {
        width: 100%;
        text-align: left;
        padding: 12px;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 6px;
        color: #cbd5e1;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .demanda-item-btn:hover {
        background: rgba(76, 107, 175, 0.2) !important;
        border-color: #4c87afff !important;
    }

    .demanda-item-btn.active {
        background: rgba(76, 107, 175, 0.2);
        border-color: #4c87afff;
    }

    .demanda-title {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .demanda-classe {
        font-size: 0.8rem;
        color: #94a3b8;
    }

    .demanda-status {
        font-size: 0.75rem;
        margin-top: 4px;
        padding: 2px 6px;
        border-radius: 3px;
        display: inline-block;
    }

    .status-concluido {
        background: rgba(86, 76, 175, 1);
    }

    .status-andamento {
        background: rgba(33, 150, 243, 0.3);
    }

    .modal-demandas-content {
        flex: 1;
        padding: 30px;
        overflow-y: auto;
        background-color: var(--color-dialog-background);
    }

    .demanda-content-title {
        margin: 0 0 20px 0;
        color: #cbd5e1;
        border-bottom: 2px solid #4c77afff;
        padding-bottom: 10px;
    }

    .process-fields-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 20px;
    }

    .process-fields-grid .field {
        display: flex;
        flex-direction: column;
    }

    .process-fields-grid .field-full {
        grid-column: 1 / -1;
    }

    .process-fields-grid label {
        color: #94a3b8;
        font-weight: 600;
        margin-bottom: 5px;
        font-size: 0.95rem;
    }

    .process-fields-grid input {
        width: 100%;
        padding: 8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 4px;
        color: #cbd5e1;
        font-size: 0.9rem;
    }

    .modal-cliente {
        border-radius: 8px;
        padding: 0;
        max-width: 90vw;
        width: 600px;
        max-height: 90vh;
        height: fit-content;
        background: transparent;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid var(--color-dialog-background-border);
    }

    .modal-cliente::backdrop {
        display: none;
    }

    .modal-cliente-wrapper {
        background-color: var(--color-dialog-background);
        border-radius: 8px;
        overflow: hidden;
        padding: 30px;
    }

    .cliente-content-title {
        margin: 0 0 25px 0;
        color: #cbd5e1;
        border-bottom: 2px solid #4c77afff;
        padding-bottom: 10px;
        font-size: 1.4rem;
    }

    .client-fields-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 20px;
    }

    .client-fields-grid .field {
        display: flex;
        flex-direction: column;
    }

    .client-fields-grid .field-full {
        grid-column: 1 / -1;
    }

    .client-fields-grid label {
        color: #94a3b8;
        font-weight: 600;
        margin-bottom: 5px;
        font-size: 0.95rem;
    }

    .client-fields-grid input {
        width: 100%;
        padding: 8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 4px;
        color: #cbd5e1;
        font-size: 0.9rem;
    }

    .checkboxes-container {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(255,255,255,0.02);
        border-radius: 6px;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        color: #cbd5e1;
        font-size: 0.9rem;
    }

    .checkbox-label input {
        margin-right: 8px;
    }

    .resumo-textarea {
        width: 100%;
        padding: 12px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 4px;
        color: #cbd5e1;
        min-height: 120px;
        resize: vertical;
        font-family: inherit;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .modal-actions {
        margin-top: 25px;
        text-align: center;
    }

    .modal-actions .btn-dialog {
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

// Expõe a função showDemanda globalmente
window.showDemanda = showDemanda;

window.addEventListener('DOMContentLoaded', fetchRequerentes);