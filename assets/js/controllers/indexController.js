import { CLASSES, SELECTORS, MOCK_DATA, CLASS_SUBJECT_MAP } from "./config.js";


class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll(SELECTORS.sections);
        this.scrollContainer = document.querySelector(SELECTORS.scrollContainer);
        this.navigationLinks = document.querySelectorAll(SELECTORS.navigationLinks);

        this.initializeNavigation();
    }

    initializeNavigation() {
        if (!this.scrollContainer) {
            console.warn('Scroll container not found');
            return;
        }

        this.navigationLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
    }

    handleNavClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        if (!targetId) return;

        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        this.scrollToSection(targetSection);
    }

    scrollToSection(section) {
        this.scrollContainer.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}


class TabManager {
    constructor() {
        this.tabsWrappers = document.querySelectorAll(SELECTORS.tabsWrapper);

        this.initializeTabs();
        this.initializeDownloadButtons();
        this.setInitialTabBasedOnOS();
    }

    initializeTabs() {
        this.tabsWrappers.forEach(wrapper => {
            const tabs = wrapper.querySelectorAll(SELECTORS.tabs);
            tabs.forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(tab));
            });
        });
    }

    switchTab(selectedTab) {
        const wrapper = selectedTab.closest(SELECTORS.tabsWrapper);
        if (!wrapper) return;

        wrapper.querySelectorAll(SELECTORS.tabs)
            .forEach(tab => tab.classList.remove(CLASSES.active));
        wrapper.querySelectorAll(SELECTORS.tabContent)
            .forEach(content => content.classList.remove(CLASSES.active));

        selectedTab.classList.add(CLASSES.active);
        const targetContent = wrapper.querySelector(`#${selectedTab.dataset.tab}`);
        if (targetContent) {
            targetContent.classList.add(CLASSES.active);
        }
    }

    initializeDownloadButtons() {
        document.querySelectorAll(SELECTORS.downloadBtn).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDownload(btn.dataset.os);
            });
        });
    }

    handleDownload(os) {
        alert(`Downloading for ${os}`);
    }

    getOperatingSystem() {
        const { userAgent, platform } = window.navigator;

        if (platform.includes('Win')) return 'Windows';
        if (platform.includes('Mac')) return 'MacOS';
        if (platform.includes('Linux')) return 'Linux';
        if (/Android/.test(userAgent)) return 'Mobile';
        if (/iPhone|iPad|iPod/.test(userAgent)) return 'Mobile';

        return 'unknown';
    }

    setInitialTabBasedOnOS() {
        const downloadWrapper = document.querySelector('.download-tabs');
        if (downloadWrapper) {
            const os = this.getOperatingSystem().toLowerCase();
            const matchingTab = downloadWrapper.querySelector(`[data-tab="${os}"]`);
            if (matchingTab) {
                this.switchTab(matchingTab);
            }
        }

        this.tabsWrappers.forEach(wrapper => {
            if (!wrapper.classList.contains('download-tabs')) {
                const firstTab = wrapper.querySelector(SELECTORS.tabs);
                if (firstTab) {
                    this.switchTab(firstTab);
                }
            }
        });
    }
}

class QuickSearchManager {
    constructor() {
        this.quickConsult = document.getElementById('quick-consult');

        this.initializeRegex();
        this.initializeSearch();
    }

    initializeRegex() {
        this.input = document.getElementById('process-number');
        this.input.addEventListener('input', () => {
            let value = this.formatProcessNumber(this.input.value);
            this.input.value = value.slice(0, 25);
        });
    }

    initializeSearch() {
        const processNumberForm = document.querySelector('#process-number-form form');
        const classAndSubjectForm = document.querySelector('#class-and-subject form');

        processNumberForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchAndRender(e);
        });

        classAndSubjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchAndRender(e);
        });
    }

    formatProcessNumber(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{7})/, '$1-');
        value = value.replace(/^(\d{7}-\d{2})/, '$1.');
        value = value.replace(/^(\d{7}-\d{2}\.\d{4})/, '$1.');
        value = value.replace(/^(\d{7}-\d{2}\.\d{4}\.\d{1})/, '$1.');
        value = value.replace(/^(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2})/, '$1.');
        return value;
    }

    searchAndRender(e) {
        const searchResults = this.searchByFormData(e.currentTarget);
        this.renderSearchResults(searchResults);
    }

    searchByFormData(form) {
        const formData = new FormData(form);

        const processNumberValue = formData.get('process-number');
        const classValue = formData.get('class');
        const subjectValue = formData.get('subject');

        if (processNumberValue) {
            return this.searchByNumber(processNumberValue);
        }
        else if (classValue || subjectValue) {
            return this.searchByClassAndSubject(classValue, subjectValue);
        }
    }

    searchByNumber(processNumberValue) {
        return MOCK_DATA.find(item => item.number === processNumberValue);
    }

    searchByClassAndSubject(classValue, subjectValue) {
        return MOCK_DATA.filter(item => item.class == classValue || item.subject == subjectValue);
    }

    renderSearchResults(results) {
        this.modal = this.quickConsult.querySelector('dialog');

        let nextSteps = '';
        for (let item of results.nextSteps) {
            nextSteps += `<li>${item}</li>`;
        }

        this.modal.innerHTML = `
            <div class="dialog-header">
                <button type="button" class="close-button" title="Fechar">&times;</button>
                <h2>Análise do Processo</h2>
            </div>

            <hr>

            <div class="info-section">
                <h3>Informações do Processo</h3>
                <div class="info-item">
                    <span class="info-label">Número:</span>
                    <span class="info-value">${results.number}</span>
                </div>

                <div class="info-item">
                    <span class="info-label">Classe:</span>
                    <span class="info-value">${CLASS_SUBJECT_MAP.class[results.class]}</span>
                </div>

                <div class="info-item">
                    <span class="info-label">Assunto:</span>
                    <span class="info-value">${CLASS_SUBJECT_MAP.subject[results.subject]}</span>
                </div>

                <div class="info-item">
                    <span class="info-label">Data de Distribuição:</span>
                    <span class="info-value">${results.distributionDate}</span>
                </div>

                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span class="info-value">${results.statusText}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>Resultado da Análise</h3>
                <div class="progress-section">
                    <div class="circular-progress">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" />
                            <circle class="progress" cx="50" cy="50" r="45"
                                style="stroke-dasharray: calc(85 * 2 * 3.14159 * 45 / 100) 1000" />
                        </svg>
                        <div class="progress-text">${results.probability}</div>
                    </div>

                    <div class="progress-details">
                        <span class="progress-label">Probabilidade de Êxito</span>
                        <span class="progress-description">Análise baseada em Inteligência Artificial</span>
                    </div>
                </div>

                <div class="info-item">
                    <span class="info-label">Tempo estimado:</span>
                    <span class="info-value">${results.estimatedTime}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>Próximos passos recomendados</h3>
                <ul class="next-steps">
                    ${nextSteps}
                </ul>
            </div>

            <div class="report">
                <button class="report-button">Baixar Relatório Completo</button>
            </div>
        `
        this.modal.querySelector('.close-button').addEventListener('click', this.toggleModal.bind(this));

        this.toggleModal();
        this.updateProgress(results.probability)
    }

    toggleModal() {
        if (this.modal.open)
            this.modal.close();
        else
            this.modal.showModal();
    }

    updateProgress(value) {
        const circle = this.modal.querySelector('.progress');
        const text = this.modal.querySelector('.progress-text');
        const circumference = 2 * Math.PI * 45;
        const offset = (circumference * value) / 100;

        let color = getComputedStyle(document.documentElement).getPropertyValue('--danger-color');
        if (value >= 70) {
            color = getComputedStyle(document.documentElement).getPropertyValue('--success-color');
        } else if (value >= 40) {
            color = getComputedStyle(document.documentElement).getPropertyValue('--warning-color');
        }

        circle.style.stroke = color;
        circle.style.strokeDasharray = `${offset} ${circumference}`;
        text.textContent = `${value}%`;

        circle.style.animation = 'none';
        circle.offsetHeight;
        circle.style.animation = null;
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
        Object.values(this.plans).forEach(plan => {
            if (plan) plan.classList.remove(CLASSES.planChoosed);
        });

        switch (planNumber) {
            case 1:
                this.plans.free?.classList.add(CLASSES.planChoosed);
                break;
            case 2:
                this.plans.premium?.classList.add(CLASSES.planChoosed);
                break;
            case 3:
                this.plans.advanced?.classList.add(CLASSES.planChoosed);
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navigationManager = new NavigationManager();
    const tabManager = new TabManager();
    const quickSearchManager = new QuickSearchManager();
    const planSelector = new PlanSelector();

    window.changePlan = (planNumber) => planSelector.selectPlan(planNumber);
});