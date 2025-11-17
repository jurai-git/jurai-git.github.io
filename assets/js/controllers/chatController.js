import ChatService from '../services/chatService.js';

// ========== STATE MANAGEMENT ==========
const state = {
    currentDemandaId: null,
    useRAG: true,
    isLoading: false,
    requerentes: []
};

// ========== DOM ELEMENTS ==========
const elements = {
    demandaSelect: document.getElementById('demandaSelect'),
    ragToggle: document.getElementById('ragToggle'),
    modeIndicator: document.getElementById('modeIndicator'),
    chatWindow: document.getElementById('chatWindow'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    chatActions: document.getElementById('chatActions'),
    loadHistoryBtn: document.getElementById('loadHistoryBtn'),
    clearChatBtn: document.getElementById('clearChatBtn'),
    clearLocalBtn: document.getElementById('clearLocalBtn')
};

// ========== INITIALIZATION ==========
async function init() {
    await loadDemandas();
    setupEventListeners();
}

// ========== LOAD DEMANDAS ==========
async function loadDemandas() {
    try {
        state.requerentes = await ChatService.fetchRequerentesComDemandas();
        populateDemandaSelect();
    } catch (error) {
        console.error('Erro ao carregar demandas:', error);
        showError('Erro ao carregar demandas. Tente novamente.');
    }
}

function populateDemandaSelect() {
    elements.demandaSelect.innerHTML = '<option value="">Chat Geral (sem demanda)</option>';
    
    state.requerentes.forEach(req => {
        if (req.demandas && req.demandas.length > 0) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = req.nome;
            
            req.demandas.forEach(dem => {
                const option = document.createElement('option');
                option.value = dem.id;
                option.textContent = `${dem.identificacao || dem.classe} - ${dem.status}`;
                optgroup.appendChild(option);
            });
            
            elements.demandaSelect.appendChild(optgroup);
        }
    });
}

function setupEventListeners() {
    elements.demandaSelect.addEventListener('change', handleDemandaChange);
    
    elements.ragToggle.addEventListener('change', handleRagToggle);
    
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    elements.messageInput.addEventListener('input', () => {
        elements.messageInput.style.height = 'auto';
        elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
    });
    
    elements.loadHistoryBtn.addEventListener('click', loadHistory);
    elements.clearChatBtn.addEventListener('click', clearServerChat);
    elements.clearLocalBtn.addEventListener('click', clearLocalChat);
}

function handleDemandaChange(e) {
    const demandaId = e.target.value;
    
    if (demandaId) {
        state.currentDemandaId = parseInt(demandaId);
        elements.ragToggle.disabled = false;
        elements.chatActions.style.display = 'flex';
        updateModeIndicator();
    } else {
        state.currentDemandaId = null;
        state.useRAG = false;
        elements.ragToggle.disabled = true;
        elements.ragToggle.checked = false;
        elements.chatActions.style.display = 'none';
        updateModeIndicator();
    }
    
    clearLocalChat();
}

function handleRagToggle(e) {
    state.useRAG = e.target.checked;
    updateModeIndicator();
}

function updateModeIndicator() {
    const indicator = elements.modeIndicator;
    indicator.classList.remove('mode-general', 'mode-demanda', 'mode-rag-active');
    
    if (!state.currentDemandaId) {
        indicator.textContent = 'Modo: Chat Geral';
        indicator.classList.add('mode-general');
    } else if (state.useRAG) {
        indicator.textContent = 'Modo: Demanda com RAG';
        indicator.classList.add('mode-rag-active');
    } else {
        indicator.textContent = 'Modo: Demanda sem RAG';
        indicator.classList.add('mode-demanda');
    }
}

async function sendMessage() {
    const text = elements.messageInput.value.trim();
    if (!text || state.isLoading) return;
    
    if (elements.chatWindow.classList.contains('empty')) {
        elements.chatWindow.innerHTML = '';
        elements.chatWindow.classList.remove('empty');
    }
    
    addMessage(text, 'user');
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    
    const loadingEl = showLoading();
    state.isLoading = true;
    elements.sendBtn.disabled = true;
    
    try {
        let response;
        
        if (state.currentDemandaId) {
            response = await ChatService.sendDemandaMessage(
                text, 
                state.currentDemandaId, 
                state.useRAG
            );
        } else {
            response = await ChatService.sendGeneralMessage(text);
        }
        
        removeLoading(loadingEl);
        addMessage(response.response, 'ai');
        
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        removeLoading(loadingEl);
        showError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
        state.isLoading = false;
        elements.sendBtn.disabled = false;
    }
}

async function loadHistory() {
    if (!state.currentDemandaId) {
        alert('Selecione uma demanda primeiro.');
        return;
    }
    
    try {
        const messages = await ChatService.loadDemandaHistory(state.currentDemandaId);
        
        if (messages.length === 0) {
            alert('Nenhum histórico encontrado para esta demanda.');
            return;
        }
        
        clearLocalChat();
        elements.chatWindow.classList.remove('empty');
        
        messages.forEach(msg => {
            addMessage(msg.contents, msg.isAI ? 'ai' : 'user', false);
        });
        
        console.log(`Carregadas ${messages.length} mensagens do histórico`);
        
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        showError('Erro ao carregar histórico.');
    }
}

async function clearServerChat() {
    if (!state.currentDemandaId) {
        alert('Selecione uma demanda primeiro.');
        return;
    }
    
    if (!confirm('Tem certeza que deseja deletar TODO o histórico desta demanda no servidor? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        await ChatService.deleteDemandaChat(state.currentDemandaId);
        clearLocalChat();
        alert('Histórico deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar chat:', error);
        showError('Erro ao deletar histórico.');
    }
}

function clearLocalChat() {
    elements.chatWindow.innerHTML = '';
    elements.chatWindow.classList.add('empty');
    elements.chatWindow.innerHTML = `
        <div class="welcome-screen">
            <img src="../assets/img/jurai-name.png" alt="JurAI">
            <p>Digite uma mensagem para começar.</p>
        </div>
    `;
}

function addMessage(text, sender, scroll = true) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = text;
    elements.chatWindow.appendChild(msgDiv);
    
    if (scroll) {
        elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
    }
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading-indicator');
    loadingDiv.textContent = 'Pensando...';
    loadingDiv.id = 'loading-indicator';
    elements.chatWindow.appendChild(loadingDiv);
    elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
    return loadingDiv;
}

function removeLoading(loadingEl) {
    if (loadingEl && loadingEl.parentNode) {
        loadingEl.remove();
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    elements.chatWindow.appendChild(errorDiv);
    elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

init();