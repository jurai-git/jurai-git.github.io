const SELECTORS = {
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

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Downloading for ${btn.dataset.os}`);
    });
});

(() => {
    const getOS = () => {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;

        if (platform.includes('Win')) return 'Windows';
        if (platform.includes('Mac')) return 'MacOS';
        if (platform.includes('Linux')) return 'Linux';
        if (/Android/.test(userAgent)) return 'Mobile';
        if (/iPhone|iPad|iPod/.test(userAgent)) return 'Mobile';
        return 'unknown';
    };

    const os = getOS();
    const tabs = document.querySelectorAll('.tab');
    const tabsContent = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabsContent.forEach(content => content.classList.remove('active'));

    tabs.forEach(tab => {
        if (tab.dataset.tab.toLowerCase() === os.toLowerCase()) {
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab.toLowerCase()).classList.add('active');
        }
    });
})();

function changeLoginRegister(){
    if(document.getElementById("register-mode").style.display === "none"){
        document.getElementById("register-mode").style.display = "flex";
        document.getElementById("login-mode").style.display = "none";
    }
    else{
        document.getElementById("register-mode").style.display = "none";
        document.getElementById("login-mode").style.display = "flex";
    }
}

class PlanSelector {
    constructor() {
        this.plans = {
            free: document.querySelector(SELECTORS.plans.free),
            premium: document.querySelector(SELECTORS.plans.premium),
            advanced: document.querySelector(SELECTORS.plans.advanced)
        };
    }

    selectPlan(planNumber) {
        Object.values(this.plans).forEach(plan => 
            plan.classList.remove(CLASSES.planChoosed)
        );

        switch (planNumber) {
            case 1:
                this.plans.free.classList.add(CLASSES.planChoosed);
                break;
            case 2:
                this.plans.premium.classList.add(CLASSES.planChoosed);
                break;
            case 3:
                this.plans.advanced.classList.add(CLASSES.planChoosed);
                break;
        }
    }
}
const planSelector = new PlanSelector();

window.changePlan = (planNumber) => planSelector.selectPlan(planNumber);