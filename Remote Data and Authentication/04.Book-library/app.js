function app() {
    const form = document.querySelector('body form');
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        postBook(form)

        saveBtn.addEventListener('click', () => updateBooks(id));

    });
    document.getElementById('loadBooks').addEventListener('click', getBooks);
}

app();

async function getBooks() {
    const resp = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await resp.json();

    removeContent([document.querySelector('tbody')]);

    Object.entries(data).forEach(book => {
        const [bookId, bookInfo] = book;
        const row = e('tr', '', [], [
            e('th', `${bookInfo.title}`),
            e('th', `${bookInfo.author}`),
            e('button', 'Edit', [], [], {click: () => update(bookId, bookInfo.title, bookInfo.author)}),
            e('button', 'Delete', [], [], {click: () => deleteBook(bookId)}),
        ]);
        document.querySelector('tbody').appendChild(row);
    });
}

async function postBook(form) {
    const formData = new FormData(form);

    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        return alert('All fields are required!');
    }

    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title,
            author,
        }),
    });

    removeContent([], document.querySelectorAll('form input'));
}

function update(id, title, author) {
    document.querySelector('form h3').textContent = 'Edit FORM';
    const saveBtn = document.querySelector('form button');
    saveBtn.textContent = 'Save';
    document.querySelector('form input[name="title"]').value = title;
    document.querySelector('form input[name="author"]').value = author;

    saveBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        updateBooks(id)
    });

}

async function updateBooks(id) {

    const title = document.querySelector('form input[name="title"]').value;
    const author = document.querySelector('form input[name="author"]').value;

    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            author,
            title,
        }),
    });
}

async function deleteBook(id) {
    const req = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'DELETE',
    });
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