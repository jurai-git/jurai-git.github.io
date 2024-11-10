export default class CookieService {
    static getCookie(cookieName) {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(`${cookieName}=`));
        
        return new Promise((resolve, reject) => {
            if (cookie) {
                const value = cookie.split('=')[1];
                resolve({ value });
            } else {
                reject(new Error('Cookie not found'));
            }
        });
    }

    static setCookie(cookieName, value, expirationDate) {
        const cookieOptions = [
            `${cookieName}=${value}`,
            `expires=${expirationDate.toUTCString()}`,
            'path=/',
            'secure',
            'samesite=strict'
        ];

        return new Promise((resolve) => {
            document.cookie = cookieOptions.join('; ');
            resolve({ success: true });
        });
    }

    static removeCookie(cookieName) {
        return new Promise((resolve) => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
            resolve({ success: true });
        });
    }
}