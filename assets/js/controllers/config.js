const SELECTORS = {
    tabsWrapper: '.tabs-wrapper',
    tabs: '.tab',
    tabContent: '.tab-content',
    downloadBtn: '.download-btn',
    registerMode: '#register-mode',
    loginMode: '#login-mode',
    scrollContainer: '.scroll-container',
    navigationLinks: 'nav ul li a',
    sections: 'section, footer',
    plans: {
        free: '#free-plan',
        premium: '#premium-plan',
        advanced: '#advanced-plan'
    }
};

const CLASSES = {
    active: 'active',
    planChoosed: 'plan-choosed'
};

const MOCK_DATA = [
    {
        number: '0000123-45.2024.8.26.0000',
        class: 2,
        subject: 1,
        distributionDate: '15/01/2024',
        status: 'active',
        statusText: 'Em andamento',
        probability: 75,
        estimatedTime: '12-18 meses',
        nextSteps: [
            'Apresentação de contestação',
            'Produção de prova pericial',
            'Preparação para audiência'
        ]
    },
    {
        number: '0000456-78.2024.8.26.0000',
        class: 4,
        subject: 4,
        distributionDate: '20/02/2024',
        status: 'concluded',
        statusText: 'Concluído',
        probability: 90,
        estimatedTime: 'Finalizado',
        nextSteps: [
            'Arquivamento definitivo'
        ]
    },
    {
        number: '0000789-10.2024.8.26.0000',
        class: 3,
        subject: 3,
        distributionDate: '05/03/2024',
        status: 'suspended',
        statusText: 'Suspenso',
        probability: 60,
        estimatedTime: '24-30 meses',
        nextSteps: [
            'Aguardar término da suspensão',
            'Verificar precedentes vinculantes'
        ]
    }
];

export { CLASSES, SELECTORS, MOCK_DATA }