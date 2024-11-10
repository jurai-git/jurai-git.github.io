import { CONFIG } from './config.js';

function callApi(event) {
    event.preventDefault();

    const baseUrl = CONFIG.apiBaseUrl;
    const urlMap = CONFIG.endpoints;

    const form = event.target;
    const formId = form.id;
    const endpoint = urlMap[formId];

    if (!endpoint) {
        console.error('Form ID not found in URL map.');
        return;
    }

    const url = `${baseUrl}${endpoint}`;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(`Formulário: ${formId}`);
    console.log(`URL correspondente: ${url}`);
    console.log(`Dados do formulário:`, JSON.stringify(data));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP status: ${res.status}`);
        }
        return res.json();
    })
    .catch(error => {
        console.error('Error in API call: ', error);
    });
}

function getAccessToken() {
    const cookieName = CONFIG.cookies.access;
    const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
    
    return match ? match[2] : null;
}