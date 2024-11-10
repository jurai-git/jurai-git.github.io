export const CONFIG = {
    domain: 'jurai-git.github.io',
    cookies: { 
        access: 'access_token'
    },
    apiBaseUrl: 'https://cors-anywhere.herokuapp.com/https://jurai-server-production.up.railway.app',
    endpoints: {
        registerLawyer: '/advogado/new',
        loginLawyer: '/advogado/get',
        registerPetitioner: '/requerente/new',
        registerPetition: '/demanda/new'
    }
};