function initGraphics() {
  const ctx = document.getElementById("winRate").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro"],
      datasets: [
        {
          label: "Casos Ganhos",
          data: [4, 6, 5, 6, 4, 3],
          borderColor: "#4caf50",
          backgroundColor: "rgba(76, 175, 80, 0.4)",
          fill: true,
          tension: 0.1,
        },
        {
          label: "Casos Perdidos",
          data: [2, 1, 2, 2, 2, 1],
          borderColor: "#f44336",
          backgroundColor: "rgba(244, 67, 54, 0.4)",
          fill: true,
          tension: 0.1,
        },
        {
          label: "Casos em Andamento",
          data: [0, 0, 1, 3, 6, 7],
          borderColor: "rgba(127, 166, 204)",
          backgroundColor: "rgba(127, 166, 204, 0.4)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function addressAutocomplete() {
  const url = "http://127.0.0.1:5000/cep/";
  const value = document.getElementById("cep").value;

  if (value.length !== 8) return;

  fetch(url + value)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById("street").value = data.logradouro || "";
      document.getElementById("neighborhood").value = data.bairro || "";
      document.getElementById("city").value = data.localidade || "";
      document.getElementById("state").value = data.uf || "";
    })
    .catch((err) => console.error("Fetch error:", err));
}

function getNews() {
  const main = document.querySelector("main");

  const newsSection = document.createElement("section");
  newsSection.id = "news";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const cardTitle = document.createElement("h2");
  cardTitle.innerText = "Notícias";

  const newsContainer = document.createElement("div");
  newsContainer.className = "news-container";

  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(newsContainer);
  newsSection.appendChild(cardDiv);
  main.appendChild(newsSection);

  fetch("http://127.0.0.1:5000/news")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          const newsItem = document.createElement("div");
          newsItem.className = "news-item";

          const title = document.createElement("h3");
          title.innerText = item.title || "No Title";

          const image = document.createElement("img");
          image.src = item.image || "#";
          image.alt = item.title || "No Image";

          const link = document.createElement("a");
          link.href = "https://www.tjsp.jus.br" + item.link || "#";
          link.target = "_blank";

          link.appendChild(image);
          link.appendChild(title);
          newsItem.appendChild(link);

          newsContainer.appendChild(newsItem);
        });
      } else {
        newsSection.innerText = "Nenhuma notícia encontrada.";
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar notícias:", error);
      newsSection.innerText = "Erro ao carregar notícias.";
    });
}

function confirmExit(page = "../index.html") {
  const response = confirm("Deseja sair da conta?");

  if (response == true) window.location.href = page;
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

var currentTab = 0;

var colorVisited = "#";
var colorNotVisited = "#";

if(localStorage.getItem("theme") === "dark"){
  var colorVisited = "white";
  var colorNotVisited = "#737373";
}
else{
  var colorVisited = "#161616";
  var colorNotVisited = "#7a7a7a";
}

function changeStep(i) {
  currentTab = i;
  switch (i) {
    case 0:
      document.getElementById("step-personal").style.display = "flex";
      document.getElementById("step-general").style.display = "none";
      document.getElementById("step-adress").style.display = "none";
      document.getElementById("btn-previous").style.display = "none";
      document.getElementById("btn-next").textContent = "Próximo";
      document.getElementById("btn-personal-info").style.color = colorVisited;
      document.getElementById("btn-general-info").style.color = colorNotVisited;
      document.getElementById("btn-adress-info").style.color = colorNotVisited;
      break;
    case 1:
      document.getElementById("step-personal").style.display = "none";
      document.getElementById("step-general").style.display = "flex";
      document.getElementById("step-adress").style.display = "none";
      document.getElementById("btn-previous").style.display = "block";
      document.getElementById("btn-next").textContent = "Próximo";
      document.getElementById("btn-personal-info").style.color = colorNotVisited;
      document.getElementById("btn-general-info").style.color = colorVisited;
      document.getElementById("btn-adress-info").style.color = colorNotVisited;
      break;
    case 2:
      document.getElementById("step-personal").style.display = "none";
      document.getElementById("step-general").style.display = "none";
      document.getElementById("step-adress").style.display = "flex";
      document.getElementById("btn-previous").style.display = "block";
      document.getElementById("btn-next").textContent = "Enviar";
      document.getElementById("btn-personal-info").style.color = colorNotVisited;
      document.getElementById("btn-general-info").style.color = colorNotVisited;
      document.getElementById("btn-adress-info").style.color = colorVisited;
      break;
  }
}

function closeModal() {
  document.querySelector("dialog").close();
  document.getElementById("fade").style.display = "none";
  changeStep(0);
}

function nextStep(n) {
  var x = document.getElementsByClassName("client-information");
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  changeStep(currentTab);
}

document.getElementById("btn-exit").addEventListener("click", function () {
  currentTab = 0;
});

function changeConfig(n) {
  switch (n) {
    case "information":
      document.getElementById("account-general-information").style.display =
        "flex";
      document.getElementById("account-config").style.display = "none";
      document.getElementById("account-theme").style.display = "none";
      document.getElementById(
        "list-general-information"
      ).style.backgroundColor = "var(--color-config-li-background)";
      document.getElementById("list-config").style.background = "none";
      document.getElementById("list-theme").style.background = "none";
      break;
    case "config":
      document.getElementById("account-general-information").style.display =
        "none";
      document.getElementById("account-config").style.display = "flex";
      document.getElementById("account-theme").style.display = "none";
      document.getElementById("list-general-information").style.background =
        "none";
      document.getElementById("list-config").style.backgroundColor =
        "var(--color-config-li-background)";
      document.getElementById("list-theme").style.background = "none";
      break;
    case "theme":
      document.getElementById("account-general-information").style.display =
        "none";
      document.getElementById("account-config").style.display = "none";
      document.getElementById("account-theme").style.display = "flex";
      document.getElementById("list-general-information").style.background =
        "none";
      document.getElementById("list-config").style.background = "none";
      document.getElementById("list-theme").style.backgroundColor = "var(--color-config-li-background)";
      break;
  }
}
