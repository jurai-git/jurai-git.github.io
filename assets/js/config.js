export const CONFIG = {
    domain: 'jurai-git.github.io',
    cookies: { 
        access: 'access_token',
        id: 'id'
    },
    apiBaseUrl: 'http://127.0.0.1:5000',
    endpoints: {
        registerLawyer: '/advogado',
        loginLawyer: '/advogado/auth',
        registerPetitioner: '/requerente',
        registerPetition: '/requerente/${}/demanda',
        getPetitioners: '/advogado/requerentes',
        getDemands: '/advogado/requerente/${}/demandas',
        registerDemand: '/requerente/${}/demanda',

        login: '/login',
        logout: '/logout',
        
        requerentes: '/advogado/requerentes',
        requerenteDemandas: (requerenteId) => `/advogado/requerente/${requerenteId}/demandas`,
        
        generalChat: '/ai/chat',
        demandaChat: (demandaId) => `/demanda/${demandaId}/chat`,
        analyzeDemanda: '/ai/probability',
        
        advogadoFoto: (advogadoId) => `/advogado/${advogadoId}/pfp`,
        news: '/news'
    }
};