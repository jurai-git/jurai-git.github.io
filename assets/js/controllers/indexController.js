import { CLASSES, SELECTORS } from "./config.js";


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
        this.tabs = document.querySelectorAll(SELECTORS.tabs);
        this.tabContents = document.querySelectorAll(SELECTORS.tabContent);

        this.initializeTabs();
        this.initializeDownloadButtons();
        this.setInitialTabBasedOnOS();
    }

    initializeTabs() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
    }

    switchTab(selectedTab) {
        this.tabs.forEach(tab => tab.classList.remove(CLASSES.active));
        this.tabContents.forEach(content => content.classList.remove(CLASSES.active));

        selectedTab.classList.add(CLASSES.active);
        const targetContent = document.getElementById(selectedTab.dataset.tab);
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
        const os = this.getOperatingSystem().toLowerCase();
        const matchingTab = Array.from(this.tabs)
            .find(tab => tab.dataset.tab.toLowerCase() === os);

        if (matchingTab) {
            this.switchTab(matchingTab);
        }
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
    const planSelector = new PlanSelector();

    window.changePlan = (planNumber) => planSelector.selectPlan(planNumber);
});