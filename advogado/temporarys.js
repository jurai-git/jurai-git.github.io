var clientInputs = document.getElementById("client-documents-form").querySelectorAll('input')
document.querySelector("input[name=edit-information-client-state]").addEventListener('change', () => {
  var isChecked = !document.querySelector("input[name=edit-information-client-state]").checked
  clientInputs.forEach(input => {
    if (input !== document.querySelector("input[name=edit-information-client-state]")) {
      input.disabled = isChecked
    }
    if (isChecked) {
      document.getElementById("edit-information-client-icon").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA30lEQVR4nO3UMUoDURDG8UVbBaOtjWBlo21qxajgmbyEBJKdSQghTc4REhRnNglpcwU9wj/MYpHCZvelEJKveUzz43sP5mVZYmTCaW5cZ7tIv+BOjB91UGOUhKnzoM6NOMMSdOjOuaqF9ZwXdabtJY3xmOMSNb7fV5zUxvIV5zG3lzTUuY3rV8bUed7G4lRnKsZ99WZftNSZDT64iLlfcKbGJDdeD9hev5kUPP5TzGj+tQG58VQZi4jTEccCSmqW/UacdXw/YnwmNYt0F1yWmLMumxrN2ljkDY4CTUK2sgGXEDNsaaQnHQAAAABJRU5ErkJggg"
    }
    else {
      document.getElementById("edit-information-client-icon").src = "/assets/icons/not-include-in-plan-choosed.png"
    }
  })
})

var processInputs = document.getElementById("process-information-form").querySelectorAll('input')
document.querySelector("input[name=edit-information-process-state]").addEventListener('change', () => {
  var isChecked = !document.querySelector("input[name=edit-information-process-state]").checked
  processInputs.forEach(input => {
    if (input !== document.querySelector("input[name=edit-information-process-state]")) {
      input.disabled = isChecked
    }
    if (isChecked) {
      document.getElementById("edit-information-process-icon").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA30lEQVR4nO3UMUoDURDG8UVbBaOtjWBlo21qxajgmbyEBJKdSQghTc4REhRnNglpcwU9wj/MYpHCZvelEJKveUzz43sP5mVZYmTCaW5cZ7tIv+BOjB91UGOUhKnzoM6NOMMSdOjOuaqF9ZwXdabtJY3xmOMSNb7fV5zUxvIV5zG3lzTUuY3rV8bUed7G4lRnKsZ99WZftNSZDT64iLlfcKbGJDdeD9hev5kUPP5TzGj+tQG58VQZi4jTEccCSmqW/UacdXw/YnwmNYt0F1yWmLMumxrN2ljkDY4CTUK2sgGXEDNsaaQnHQAAAABJRU5ErkJggg"
    }
    else {
      document.getElementById("edit-information-process-icon").src = "/assets/icons/not-include-in-plan-choosed.png"
    }
  })
})


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

var currentTab2 = 0;
function changeStep2(i) {
  currentTab2 = i;
  switch (i) {
    case 0:
      document.getElementById("step-process").style.display = "flex";
      document.getElementById("step-ementa").style.display = "none";
      document.getElementById("btn-previous-2").style.display = "none";
      document.getElementById("btn-next").textContent = "Próximo";
      document.getElementById("btn-geral-info").style.color = colorVisited;
      document.getElementById("btn-resumo-info").style.color = colorNotVisited;
      break;
    case 1:
      document.getElementById("step-process").style.display = "none";
      document.getElementById("step-ementa").style.display = "flex";
      document.getElementById("btn-previous-2").style.display = "block";
      document.getElementById("btn-next-2").textContent = "Enviar";
      document.getElementById("btn-geral-info").style.color = colorNotVisited;
      document.getElementById("btn-resumo-info").style.color = colorVisited;
      break;
  }
}

function closeModal2() {
  document.getElementById("process-modal").close();
  document.getElementById("fade").style.display = "none";
  changeStep2(0);
}

function nextStep2(n) {
  console.log(n);
  var x = document.getElementsByClassName("process-information");
  x[currentTab2].style.display = "none";
  currentTab2 = currentTab2 + n;
  if (x[currentTab2] === undefined) {
    document.getElementById("process-information-form").submit();
  }
  changeStep2(currentTab2);
}