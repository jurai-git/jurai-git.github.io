import { CONFIG } from '../config.js';

export default class ApiService {
    static request(event, bearer_token=true) {
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
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
    
        if (bearer_token) {
            options.headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
        }
    
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

    static getAccessToken() {
        const cookieName = CONFIG.cookies.access;
        const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
        
        return match ? match[2] : null;
    }
}
