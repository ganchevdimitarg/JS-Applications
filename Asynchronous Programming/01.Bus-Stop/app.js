async function getInfo() {
    const id = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busesField = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${id.value}`;

    try {
        busesField.innerHTML = '';

        const response = await fetch(url);
        const data = await response.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(([k, v]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${k} arrives in ${v}`
            busesField.appendChild(li);
        });
    }catch (e) {
        stopName.textContent = 'Error';
    }
    id.value = '';
}