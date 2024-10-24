document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', callApi)
})

function callApi(event) {
    event.preventDefault();

    const urlMap = {
        registerLawyer: 'https://jurai-server-production.up.railway.app/advogado/new',
        loginLawyer: 'https://jurai-server-production.up.railway.app/advogado/get',
        registerPetitioner: 'https://jurai-server-production.up.railway.app/requerente/new',
        registerPetition: 'https://jurai-server-production.up.railway.app/demanda/new',
    };

    const formId = event.target.closest('form').id;
    const url = urlMap[formId];

    console.log(`Formulário: ${formId}`);
    console.log(`URL correspondente: ${url}`);

    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));
}