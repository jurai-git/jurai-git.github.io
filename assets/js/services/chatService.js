import { CONFIG } from '../config.js';
import ApiService from './apiService.js';

/**
 * Serviço para gerenciar chat com IA e RAG por demanda
 */
export default class ChatService {
    static baseUrl = CONFIG.apiBaseUrl || 'http://127.0.0.1:5000';

    /**
     * Envia mensagem para o chat geral (sem demanda específica)
     * @param {string} message - Mensagem do usuário
     * @returns {Promise<{response: string}>}
     */
    static async sendGeneralMessage(message) {
        try {
            const response = await fetch(`${this.baseUrl}/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                },
                body: JSON.stringify({ query: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            
            if (!data.response) {
                throw new Error('Resposta da API sem campo "response"');
            }

            return { response: data.response };
        } catch (error) {
            console.error('Erro ao enviar mensagem geral:', error);
            throw error;
        }
    }

    /**
     * Envia mensagem para o chat de uma demanda específica (com RAG)
     * @param {string} message - Mensagem do usuário
     * @param {number} demandaId - ID da demanda
     * @param {boolean} useRAG - Se deve usar RAG ou não
     * @returns {Promise<{response: string}>}
     */
    static async sendDemandaMessage(message, demandaId, useRAG = true) {
        try {
            const response = await fetch(`${this.baseUrl}/demanda/${demandaId}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                },
                body: JSON.stringify({ 
                    query: message,
                    rag: useRAG 
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            
            if (!data.response) {
                throw new Error('Resposta da API sem campo "response"');
            }

            return { response: data.response };
        } catch (error) {
            console.error('Erro ao enviar mensagem da demanda:', error);
            throw error;
        }
    }

    /**
     * Carrega histórico de mensagens de uma demanda
     * @param {number} demandaId - ID da demanda
     * @returns {Promise<Array<{contents: string, message_type: string, isAI: boolean}>>}
     */
    static async loadDemandaHistory(demandaId) {
        try {
            const response = await fetch(`${this.baseUrl}/demanda/${demandaId}/chat`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            
            if (!data.chat || !data.chat.messages) {
                return [];
            }

            // Filtra mensagens tipo "rag" (não exibe para o usuário)
            const messages = data.chat.messages
                .filter(msg => msg.message_type !== 'rag')
                .map(msg => ({
                    contents: msg.contents,
                    message_type: msg.message_type,
                    isAI: msg.role === 'model'
                }));

            return messages;
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            return [];
        }
    }

    /**
     * Deleta todo o histórico de chat de uma demanda
     * @param {number} demandaId - ID da demanda
     * @returns {Promise<boolean>}
     */
    static async deleteDemandaChat(demandaId) {
        try {
            const response = await fetch(`${this.baseUrl}/demanda/${demandaId}/chat`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar chat:', error);
            throw error;
        }
    }

    /**
     * Busca todos os requerentes com suas demandas
     * @returns {Promise<Array>}
     */
    static async fetchRequerentesComDemandas() {
        try {
            const response = await fetch(`${this.baseUrl}/advogado/requerentes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const requerentes = data.requerentes_list || [];

            // Carrega demandas de cada requerente
            for (const req of requerentes) {
                req.demandas = await this.fetchDemandas(req.id_requerente);
            }

            return requerentes;
        } catch (error) {
            console.error('Erro ao buscar requerentes:', error);
            return [];
        }
    }

    /**
     * Busca demandas de um requerente específico
     * @param {number} requerenteId - ID do requerente
     * @returns {Promise<Array>}
     */
    static async fetchDemandas(requerenteId) {
        try {
            const response = await fetch(`${this.baseUrl}/advogado/requerente/${requerenteId}/demandas`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ApiService.getAccessToken()}`
                }
            });

            if (!response.ok) {
                return [];
            }

            const data = await response.json();
            return data.demanda_list || [];
        } catch (error) {
            console.error('Erro ao buscar demandas:', error);
            return [];
        }
    }
}