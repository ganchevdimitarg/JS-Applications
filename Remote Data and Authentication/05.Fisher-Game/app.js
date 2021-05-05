function attachEvents() {
    document.querySelector('.load').addEventListener('click', getCatches);
    if (sessionStorage.getItem('authToken') !== null) {
        const addCatches = document.querySelector('.add');
        addCatches.disabled = false;
        addCatches.addEventListener('click', addCatch);
    }
}

attachEvents();


async function getCatches() {
    const option = {
        method: 'GET',
        headers: {}
    }

    const resp = await fetch('http://localhost:3030/data/catches', option);
    const data = await resp.json();

    const catches = document.getElementById('catches');

    removeContent([catches]);

    Object.entries(data).forEach(d => {
        const element = e('div', '', ['class=catch'], [
            e('lable', 'Angler'),
            e('input', '', ['type=text', 'class=angler', `value=${d[1].angler}`]),
            e('hr'),
            e('lable', 'Weight'),
            e('input', '', ['type=text', 'class=weight', `value=${d[1].weight}`]),
            e('hr'),
            e('lable', 'Species'),
            e('input', '', ['type=text', 'class=species', `value=${d[1].species}`]),
            e('hr'),
            e('lable', 'Location'),
            e('input', '', ['type=text', 'class=location', `value=${d[1].location}`]),
            e('hr'),
            e('lable', 'Bait'),
            e('input', '', ['type=text', 'class=bait', `value=${d[1].bait}`]),
            e('hr'),
            e('lable', 'Capture Time'),
            e('input', '', ['type=text', 'class=captureTime', `value=${d[1].captureTime}`]),
            e('hr'),
            e('button', 'Update', ['disabled=true', 'class=update'],[], {click: ()=>{updateCatch(d[1]._id)}}),
            e('button', 'Delete', ['disabled=true', 'class=delete'], [], {click: ()=>{deleteCatch(d[1]._id)}}),
        ]);
        catches.appendChild(element);
    });

    if (sessionStorage.getItem('authToken') !== null) {
        document.querySelectorAll('#catches .update').forEach(b => b.disabled = false);
        document.querySelectorAll('#catches .delete').forEach(b => b.disabled = false);
    }
}

async function addCatch(){
    const data = {};
    document.querySelectorAll('#addForm input').forEach(input => {
        data[input.className] = input.value;
    });
    await fetch(`http://localhost:3030/data/catches`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'X-Authorization' : `${sessionStorage.getItem('authToken')}`},
        body: JSON.stringify(data),
    });

}

async function updateCatch(id){
    const data = {};
        document.querySelectorAll('#catches input').forEach(input => {
            data[input.className] = input.value;
        });
        await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                'X-Authorization' : `${sessionStorage.getItem('authToken')}`},
            body: JSON.stringify(data),
        });

}

async function deleteCatch(id) {
    const req = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'DELETE',
        headers: {'X-Authorization': `${sessionStorage.getItem('authToken')}`},
    });

    getCatches();
}

/*
async function getCatches() {
    const option = {
        method: 'GET',
        headers: {}
    }

    const token = sessionStorage.getItem('authToken');

    if (token !== null) {
        option.headers['X-Authorization'] = token;
    }

    const resp = await fetch('http://localhost:3030/data/catches', option);
    const data = await resp.json();

    console.log(data);
}
*/
function e(type, text, attr, children, events) {
    const element = document.createElement(type);

    if (text) {
        if (type === 'input') {
            element.value = text;
        } else {
            const content = document.createTextNode(text);
            element.appendChild(content);
        }
    }
    if (attr) {
        attr.forEach(a => {
            const [name, value] = a.split('=');
            if (name === 'class') {
                element.classList.add(value);
            } else if (value === undefined) {
                element[name] = true;
            } else {
                element.setAttribute(name, value);
            }

        });
    }
    if (children) {
        children.forEach(c => {
            element.appendChild(c);
        });
    }
    if (events) {
        Object.entries(events).forEach(ev => {
            const [event, fun] = ev;
            element.addEventListener(`${event}`, fun)
        })
    }
    return element;
}

function removeContent(textContent, value) {
    if (textContent) {
        textContent.forEach(element => element.innerHTML = '');
    }
    if (value) {
        value.forEach(element => element.value = '');
    }
}

