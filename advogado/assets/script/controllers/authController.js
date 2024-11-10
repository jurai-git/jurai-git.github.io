import CookieService from '/assets/js/services/cookieService.js';

class AuthController {
    static async init() {
        try {
            const accessToken = await CookieService.getCookie('access_token');

            if (!accessToken.value) {
                console.warn('Cookie not found');
                window.location.href = '/login.html';
            }
            document.getElementById('logout')?.addEventListener('click', this.handleLogout)

        } catch (error) {
            window.location.href = '/login.html';
            console.error('Error checking authentication. ', error);
        }
    }

    static async handleLogout() {
        const response = confirm('Deseja sair da conta?');

        if (response == true) {
            try {
                await CookieService.removeCookie('access_token');
                window.location.href = '/index.html';
            } catch (error) {
                const error_message = `Error when logging out: ${error}`

                console.error(error_message);
                alert('Erro ao sair da conta.\n', error_message)
            }
        }
    }
}

AuthController.init();
