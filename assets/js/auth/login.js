import callApi from '../formEvents.js';
import CookieService from '../service/cookieService.js';

const COOKIE_NAME = 'access_token';
const REDIRECT_URL = './advogado/dashboard.html';
const SESSION_DURATION = 1800 * 1000;

document.getElementById('loginLawyer').addEventListener('submit', handleSubmit);
document.getElementById('registerLawyer').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    
    const formId = event.target.id;
    const actionType = getActionType(formId);
    const formData = getFormData(event.target);
    
    if (!validateForm(actionType, formData)) {
        return;
    }
    
    try {
        const response = await callApi(event, false);
        handleSubmission(response, actionType);
    } catch (error) {
        handleError(error);
    }
}

function getActionType(formId) {
    return formId === 'loginLawyer' ? 'login' : 'register';
}

function getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
}

function validateForm(actionType, formData) {
    if (!formData) {
        alert("Erro: Dados do formulário inválidos");
        return false;
    }

    if (actionType === 'register') {
        if (!formData.password || !formData.confirm_password) {
            alert('Por favor, preencha todos os campos de senha');
            return false;
        }
        if (formData.password !== formData.confirm_password) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return false;
        }
    }
    return true;
}

function handleSubmission(response, actionType) {
    setCookie(actionType === 'register' ? response.access_token : response.advogado.access_token);
    showSuccessMessage(actionType, actionType === 'register' ? null : response.advogado.username);

    redirectToDashboard();
}

function setCookie(token) {
    const expirationDate = new Date();
    const rememberMe = document.getElementById('rememberMe')?.checked || false;
    
    if (rememberMe) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    } else {
        expirationDate.setTime(expirationDate.getTime() + SESSION_DURATION);
    }
    
    CookieService.setCookie(COOKIE_NAME, token, expirationDate);
}

function showSuccessMessage(actionType, username) {
    const message = actionType === 'login'
        ? `Login realizado com sucesso, ${username}!`
        : 'Cadastro realizado com sucesso!';
    alert(message);
}

function redirectToDashboard() {
    window.location.href = REDIRECT_URL;
}

function handleError(error) {
    alert(error.message);
}