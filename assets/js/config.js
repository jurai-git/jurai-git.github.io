export const CONFIG = {
    domain: 'jurai-git.github.io',
    cookies: { 
        access: 'access_token'
    },
    apiBaseUrl: 'http://127.0.0.1:5001',
    endpoints: {
        registerLawyer: '/advogado',
        loginLawyer: '/advogado/auth',
        registerPetitioner: '/requerente',
        registerPetition: '/requerente/${}/demanda',
        getPetitioners: '/advogado/requerentes',
        getDemands: '/advogado/requerente/${}/demandas',
        registerDemand: '/requerente/${}/demanda'
    }
};