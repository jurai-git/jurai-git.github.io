
const selectTheme = document.getElementById("select-theme");
const currentTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const currentLogo = localStorage.getItem('logo')

// Aplica o tema atual salvo
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

if(currentLogo){
  document.getElementById("jurai-logo").setAttribute('src', currentLogo);
}

selectTheme.value = currentTheme;

selectTheme.addEventListener('change', () => {
  let theme;
  let logo;
  if (selectTheme.value !== "dark") {
    theme = "light";
    logo = "../../assets/img/jurai-dark.png";
  } else {
    theme = "dark";
    logo = "../../assets/img/jurai-light.png";
  }
  
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById("jurai-logo").setAttribute("src", logo);
  localStorage.setItem('theme', theme); // Salva a preferência no localStorage
  localStorage.setItem('logo', logo);
});

function changeThemeByCard(n){
  let theme, logo;
  if(n === "dark"){
    theme = "dark";
    logo = "../../assets/img/jurai-light.png";
    selectTheme.value = n;
  }
  else{
    theme = "light";
    logo = "../../assets/img/jurai-dark.png";
    selectTheme.value = n;
  }
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById("jurai-logo").setAttribute("src", logo);
    localStorage.setItem('theme', theme); // Salva a preferência no localStorage
    localStorage.setItem('logo', logo);
}
