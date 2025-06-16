import ApiService from '../../../../assets/js/services/apiService.js';

document.getElementById('registerPetitioner').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        const normalizedKey = key.replace(/-/g, '_');
        data[normalizedKey] = value;
    });
    
    const genderInput = form.querySelector('input[name="gender"]:checked');
    if (genderInput) {
        const genderMap = {
            'male': 'M',
            'female': 'F',
            'other': 'N'
        };
        data.gender = genderMap[genderInput.id] || null;
    }

    data.idoso = form.querySelector('#idoso')?.checked || false;

    try {
        const response = await fetch('https://jurai-server.onrender.com/requerente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ApiService.getAccessToken()}`,
            },
            body: JSON.stringify(data),
        });

        const resJson = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            console.log(resJson);
        } else {
            alert(`Erro: ${resJson.message}`);
            console.error(resJson);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar dados. Veja o console.');
    }
});
