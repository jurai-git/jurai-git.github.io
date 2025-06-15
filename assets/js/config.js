export const CONFIG = {
    domain: 'jurai-git.github.io',
    cookies: { 
        access: 'access_token'
    },
    apiBaseUrl: 'https://jurai-server.onrender.com',
    endpoints: {
        registerLawyer: '/advogado',
        loginLawyer: '/advogado/auth',
        registerPetitioner: '/requerente',
        registerPetition: '/requerente/${}/demanda',
    }
};