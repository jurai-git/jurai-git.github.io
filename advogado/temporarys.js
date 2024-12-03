var colorVisited = "#";
var colorNotVisited = "#";

if (localStorage.getItem("theme") === "dark") {
  var colorVisited = "white";
  var colorNotVisited = "#737373";
}
else {
  var colorVisited = "#161616";
  var colorNotVisited = "#7a7a7a";
}

var currentClientTab = 0;

function changeClientStep(i) {
  currentClientTab = i;
  switch (i) {
    case 0:
      document.getElementById("step-personal").style.display = "flex";
      document.getElementById("step-general").style.display = "none";
      document.getElementById("step-adress").style.display = "none";
      document.getElementById("btn-client-previous").style.display = "none";
      document.getElementById("btn-client-next").textContent = "Próximo";
      document.getElementById("btn-personal-info").style.color = colorVisited;
      document.getElementById("btn-general-info").style.color = colorNotVisited;
      document.getElementById("btn-adress-info").style.color = colorNotVisited;
      break;
    case 1:
      document.getElementById("step-personal").style.display = "none";
      document.getElementById("step-general").style.display = "flex";
      document.getElementById("step-adress").style.display = "none";
      document.getElementById("btn-client-previous").style.display = "block";
      document.getElementById("btn-client-next").textContent = "Próximo";
      document.getElementById("btn-personal-info").style.color = colorNotVisited;
      document.getElementById("btn-general-info").style.color = colorVisited;
      document.getElementById("btn-adress-info").style.color = colorNotVisited;
      break;
    case 2:
      document.getElementById("step-personal").style.display = "none";
      document.getElementById("step-general").style.display = "none";
      document.getElementById("step-adress").style.display = "flex";
      document.getElementById("btn-client-previous").style.display = "block";
      document.getElementById("btn-client-next").textContent = "Enviar";
      document.getElementById("btn-personal-info").style.color = colorNotVisited;
      document.getElementById("btn-general-info").style.color = colorNotVisited;
      document.getElementById("btn-adress-info").style.color = colorVisited;
      break;
  }
}

function closeClientModal() {
  document.getElementById("client-modal").close();
  document.getElementById("fade").style.display = "none";
  changeClientStep(0);
}

function nextClientStep(n) {
  console.log(n);
  var x = document.getElementsByClassName("client-information");
  x[currentClientTab].style.display = "none";
  currentClientTab = currentClientTab + n;
  if(x[currentClientTab]===undefined){
    document.getElementById("client-documents-form").submit();
  }
  changeClientStep(currentClientTab);
}

document.getElementById("btn-client-exit").addEventListener("click", function () {
  currentClientTab = 0;
});

var clientInputs = document.getElementById("client-documents-form").querySelectorAll('input')
document.querySelector("input[name=edit-information-client-state]").addEventListener('change', () => {
  var isChecked = !document.querySelector("input[name=edit-information-client-state]").checked
  clientInputs.forEach(input => {
    if (input !== document.querySelector("input[name=edit-information-client-state]")) {
      input.disabled = isChecked
    }
  })
  if (isChecked) {
    document.getElementById("edit-information-client-icon").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA30lEQVR4nO3UMUoDURDG8UVbBaOtjWBlo21qxajgmbyEBJKdSQghTc4REhRnNglpcwU9wj/MYpHCZvelEJKveUzz43sP5mVZYmTCaW5cZ7tIv+BOjB91UGOUhKnzoM6NOMMSdOjOuaqF9ZwXdabtJY3xmOMSNb7fV5zUxvIV5zG3lzTUuY3rV8bUed7G4lRnKsZ99WZftNSZDT64iLlfcKbGJDdeD9hev5kUPP5TzGj+tQG58VQZi4jTEccCSmqW/UacdXw/YnwmNYt0F1yWmLMumxrN2ljkDY4CTUK2sgGXEDNsaaQnHQAAAABJRU5ErkJggg"
  }
  else {
    document.getElementById("edit-information-client-icon").src = "/assets/icons/not-include-in-plan-choosed.png"
  }
})

var currentProcessTab = 0;
function changeProcessStep(i) {
  currentProcessTab = i;
  switch (i) {
    case 0:
      document.getElementById("step-process").style.display = "flex";
      document.getElementById("step-ementa").style.display = "none";
      document.getElementById("btn-process-previous").style.display = "none";
      document.getElementById("btn-process-next").textContent = "Próximo";
      document.getElementById("btn-geral-info").style.color = colorVisited;
      document.getElementById("btn-resumo-info").style.color = colorNotVisited;
      break;
    case 1:
      document.getElementById("step-process").style.display = "none";
      document.getElementById("step-ementa").style.display = "flex";
      document.getElementById("btn-process-previous").style.display = "block";
      document.getElementById("btn-process-next").textContent = "Enviar";
      document.getElementById("btn-geral-info").style.color = colorNotVisited;
      document.getElementById("btn-resumo-info").style.color = colorVisited;
      break;
  }
}

function closeProcessModal() {
  document.getElementById("process-modal").close();
  document.getElementById("fade").style.display = "none";
  changeProcessStep(0);
}

function nextProcessStep(n) {
  console.log(n);
  var x = document.getElementsByClassName("process-information");
  x[currentProcessTab].style.display = "none";
  currentProcessTab = currentProcessTab + n;
  if (x[currentProcessTab] === undefined) {
    document.getElementById("process-information-form").submit();
  }
  changeProcessStep(currentProcessTab);
}

document.getElementById("btn-process-exit").addEventListener("click", function () {
  currentClientTab = 0;
});

var processInputs = document.getElementById("process-information-form").querySelectorAll('input')
document.querySelector("input[name=edit-information-process-state]").addEventListener('change', () => {
  var isChecked = !document.querySelector("input[name=edit-information-process-state]").checked
  processInputs.forEach(input => {
    if (input !== document.querySelector("input[name=edit-information-process-state]")) {
      input.disabled = isChecked
    }
  })
  if (isChecked) {
    document.getElementById("edit-information-process-icon").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA30lEQVR4nO3UMUoDURDG8UVbBaOtjWBlo21qxajgmbyEBJKdSQghTc4REhRnNglpcwU9wj/MYpHCZvelEJKveUzz43sP5mVZYmTCaW5cZ7tIv+BOjB91UGOUhKnzoM6NOMMSdOjOuaqF9ZwXdabtJY3xmOMSNb7fV5zUxvIV5zG3lzTUuY3rV8bUed7G4lRnKsZ99WZftNSZDT64iLlfcKbGJDdeD9hev5kUPP5TzGj+tQG58VQZi4jTEccCSmqW/UacdXw/YnwmNYt0F1yWmLMumxrN2ljkDY4CTUK2sgGXEDNsaaQnHQAAAABJRU5ErkJggg"
    document.getElementById("ementaText").disabled = true
  }
  else {
    document.getElementById("edit-information-process-icon").src = "/assets/icons/not-include-in-plan-choosed.png"
    document.getElementById("ementaText").disabled = false
  }
})

