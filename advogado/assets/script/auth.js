const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));

if (!accessToken) {
    window.location.href = '/login.html';
}
