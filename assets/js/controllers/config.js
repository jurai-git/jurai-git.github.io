const SELECTORS = {
    tabsWrapper: '.tabs-wrapper',
    tabs: '.tab',
    tabContent: '.tab-content',
    downloadBtn: '.download-btn',
    registerMode: '#register-mode',
    loginMode: '#login-mode',
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
        number: '0000000-45.2024.8.26.0000',
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
        number: '0000000-45.2024.8.26.0001',
        class: 4,
        subject: 4,
        distributionDate: '20/02/2024',
        status: 'concluded',
        statusText: 'Concluído',
        probability: 60,
        estimatedTime: 'Finalizado',
        nextSteps: [
            'Arquivamento definitivo'
        ]
    },
    {
        number: '0000000-45.2024.8.26.0002',
        class: 3,
        subject: 3,
        distributionDate: '05/03/2024',
        status: 'suspended',
        statusText: 'Suspenso',
        probability: 30,
        estimatedTime: '24-30 meses',
        nextSteps: [
            'Aguardar término da suspensão',
            'Verificar precedentes vinculantes'
        ]
    }
];

const CLASS_SUBJECT_MAP = {
    class: {
        1: 'Ação Civil Pública',
        2: 'Procedimento Comum',
        3: 'Mandado de Segurança',
        4: 'Execução Fiscal',
    },
    subject: {
        1: 'Dano Moral',
        2: 'Contratos Bancários',
        3: 'Obrigações',
        4: 'Responsabilidade Civil',
    }
}

export { CLASSES, SELECTORS, MOCK_DATA, CLASS_SUBJECT_MAP }