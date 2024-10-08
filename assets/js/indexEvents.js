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

function changePlan(n) {
    switch (n) {
      case 1:
        document.getElementById("free-plan").classList.add("plan-choosed");
        document.getElementById("premium-plan").classList.remove("plan-choosed");
        document.getElementById("advanced-plan").classList.remove("plan-choosed");
        break;
      case 2:
        document.getElementById("free-plan").classList.remove("plan-choosed");
        document.getElementById("premium-plan").classList.add("plan-choosed");
        document.getElementById("advanced-plan").classList.remove("plan-choosed");
        break;
      case 3:
        document.getElementById("free-plan").classList.remove("plan-choosed");
        document.getElementById("premium-plan").classList.remove("plan-choosed");
        document.getElementById("advanced-plan").classList.add("plan-choosed");
        break;
    }
  }