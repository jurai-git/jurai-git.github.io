import ThemeService from '../services/themeService.js';

export function initThemeToggle(buttonSelector) {
    const themeToggleBtn = document.querySelector(buttonSelector);

    if (!themeToggleBtn) {
        console.error(`Button not found: ${buttonSelector}`);
        return;
    }

    ThemeService.initialize();

    function updateButtonText() {
        const currentTheme = ThemeService.getCurrentTheme();
        const nextTheme = currentTheme === ThemeService.THEMES.LIGHT
            ? ThemeService.THEMES.DARK
            : ThemeService.THEMES.LIGHT;

        themeToggleBtn.textContent = `Tema ${nextTheme === ThemeService.THEMES.DARK ? 'escuro' : 'claro'}`;
        themeToggleBtn.setAttribute('aria-label', `Change to ${nextTheme} theme`);
    }

    themeToggleBtn.addEventListener('click', () => {
        ThemeService.toggleTheme();
    });

    ThemeService.subscribe(() => {
        updateButtonText();
    });

    updateButtonText();
}