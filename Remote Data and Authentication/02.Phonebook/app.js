function attachEvents() {
   document.getElementById('btnLoad').addEventListener('click', getPhonebook);
   document.getElementById('btnCreate').addEventListener('click', createRecord);
}

attachEvents();

async function getPhonebook() {
    const resp = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await resp.json();

    const phonebook = document.getElementById('phonebook');
    removeContent([phonebook]);

    Object.values(data).forEach(p => {
        phonebook.appendChild(e('li', `${p.person}: ${p.phone}`, [], [
           e('button', 'Delete', [], [], {click: () => deleteRecord(p._id)})
       ]));
    });
}

async function deleteRecord(id) {
    const req = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`,{
        method: 'DELETE',
    });

    getPhonebook();
}

async function createRecord(){
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    const record = {
        person: person.value,
        phone: phone.value,
    };

    const req = await fetch('http://localhost:3030/jsonstore/phonebook',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(record),
    });

    // person.value = '';
    // phone.value = '';

    removeContent([], [person, phone]);

    getPhonebook();
}

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
    if (events){
        Object.entries(events).forEach(ev => {
            const [event, fun] = ev;
            element.addEventListener(`${event}`, fun)
        })
    }
    return element;
}

function removeContent(textContent, value){
    if (textContent){
        textContent.forEach(element => element.innerHTML = '');
    }
    if (value){
        value.forEach(element => element.value = '');
    }
}