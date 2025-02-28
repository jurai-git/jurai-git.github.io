const ThemeService = (function() {
    const THEMES = {
      LIGHT: 'light',
      DARK: 'dark'
    };
    
    const THEME_STORAGE_KEY = 'site-theme-preference';
    
    let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || THEMES.LIGHT;
    let subscribers = [];
    
    function notifySubscribers() {
      subscribers.forEach(callback => callback(currentTheme));
    }
    
    return {
      initialize() {
        this.applyTheme(currentTheme);
        
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        systemPrefersDark.addEventListener('change', (e) => {
          if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            this.applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
          }
        });
        
        return this;
      },
      
      getCurrentTheme() {
        return currentTheme;
      },
      
      applyTheme(theme) {
        if (!Object.values(THEMES).includes(theme)) {
          console.error(`Invalid theme: ${theme}. Just LIGHT or DARK.`);
          return;
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        currentTheme = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        notifySubscribers();
      },
      
      toggleTheme() {
        const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        this.applyTheme(newTheme);
        return newTheme;
      },
      
      subscribe(callback) {
        subscribers.push(callback);
        return () => {
          subscribers = subscribers.filter(cb => cb !== callback);
        };
      },
      
      THEMES
    };
  })();
  
  export default ThemeService;