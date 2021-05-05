function solution() {
    getArticle();
}

solution();

async function getArticle() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const resp = await fetch(url);
    const data = await resp.json();

    const accordion = document.getElementById('main');
    accordion.textContent = '';

    let index = 1;
    data.forEach(a => {
        const element = e('div', '', ['class=accordion'], [
            e('div', '', ['class=head'], [
                e('span', a.title),
                e('button', 'More', ['class=button', `id=${a._id}`], [])
            ]),
            e('div', '', ['class=extra'], [
                e('p',  '', [`id=${index}`])
            ])
        ])
        index++;
        accordion.appendChild(element);
    });

    document.getElementById('main').addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON'){
            const accordion = ev.target.parentNode.parentNode;

            let div = accordion.querySelector('.extra');
            let isVisible = div.style.display === 'block';
            div.style.display = isVisible ? 'none' : 'block';

            getDetails(ev.target.id, div.querySelector('p').getAttribute('id'));

            ev.target.textContent = !isVisible ? 'Less' : 'More';
        }
    });
}

async function getDetails(id, paragraphId) {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();

    document.getElementById(paragraphId).textContent = data.content;
}

function e(type, text, attr, children) {
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
    return element;
}