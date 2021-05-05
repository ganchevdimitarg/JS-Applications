function app() {
    const form =  document.getElementById('form');
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        postStudent(form);
    });
    getStudents();
}

app();

async function getStudents() {
    const resp = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await resp.json();

    removeContent([document.querySelector('#results tbody')]);

    Object.values(data).forEach(student => {
        const row = e('tr', '', [], [
            e('th', `${student.firstName}`),
            e('th', `${student.lastName}`),
            e('th', `${student.facultyNumber}`),
            e('th', `${student.grade}`),
        ]);
        document.querySelector('#results tbody').appendChild(row);
    });
}

async function postStudent(form) {
    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade){
        return alert('All fields are required!');

    }

   await fetch('http://localhost:3030/jsonstore/collections/students',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        }),
    });

    getStudents();
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