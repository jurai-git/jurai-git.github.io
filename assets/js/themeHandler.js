const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const sessionPrefersDark = sessionStorage.getItem("prefersDark");
const darkSelect = document.getElementById("select-theme");
var selectElements = darkSelect.getElementsByTagName('option');
var selectValue;

var jurLogo = document.getElementById("jurai-logo");


if (sessionPrefersDark == null) { // o usuario ainda nn setou nenhuma preferencia, ent usamos o padrao do sistema
    if (prefersDarkScheme.matches) {
        changeScheme(true);
    } else {
        changeScheme(false);
    }
} else { // ele ja setou uma preferencia, entao usamos ela
    changeScheme(sessionPrefersDark === "true");
}

darkSelect.addEventListener('change', () => {
    if(darkSelect.value != "Dark")
        selectValue=false;
    else
        selectValue=true;
    changeScheme(selectValue);
});


function changeScheme(isDark) {
    if(!isDark) {
        document.documentElement.classList.add("light"); // adicionar classe pro elemento >:root
        sessionStorage.setItem("prefersDark", false); // armazenar na session
        darkSelect.value = selectElements[0].value;
        jurLogo.src = "/assets/img/jurai-dark.png";

    } else {
        document.documentElement.classList.remove("light");
        sessionStorage.setItem("prefersDark", true);
        darkSelect.value = selectElements[1].value;
        jurLogo.src = "/assets/img/jurai-light.png";
    }
}

function themeCardClick(n){
    changeScheme(!(n === "Light"));
}