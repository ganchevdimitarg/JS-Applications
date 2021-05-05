function lockedProfile() {
    getInfo()
}

async function getInfo() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const resp = await fetch(url);
    const data = await resp.json();

    const main = document.getElementById('main');
    let index = 0;
    Object.values(data).forEach(p => {
        const element = e('div', undefined, ['class=profile'], [
            e('img', undefined, ['src=./iconProfile2.png', 'class=userIcon']),
            e('label', 'Lock'),
            e('input', undefined, ['type=radio', `name=user${index + 1}Locked`, 'value=lock', 'checked']),
            e('label', 'Unlock'),
            e('input', undefined, ['type=radio', `name=user${index + 1}Locked`, 'value=unlock']),
            e('br'),
            e('hr'),
            e('label', 'Username'),
            e('input', `${p.username}`, ['type=text', `name=user${index + 1}Locked`, 'disabled', 'readOnly']),
            e('div', undefined, [`id=user${index + 1}HiddenFields`], [
                e('hr'),
                e('label', 'Email:'),
                e('input', `${p.email}`, ['type=email', `name=user${index + 1}Email`, 'disabled', 'readOnly']),
                e('label', 'Age:'),
                e('input', `${p.age}`, ['type=email', `name=user${index + 1}Age`, 'disabled', 'readOnly']),
            ]),
            e('button', 'Show more')
        ]);
        index++;
        main.appendChild(element);
    });

    document.getElementById('main').addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON'){
            const profile = ev.target.parentNode;
            const isLock = profile.querySelector('input[type=radio]:checked').value === 'lock';

            if (isLock){
                return;
            }

            let div = profile.querySelector('div');
            let isVisible = div.style.display === 'block';
            div.style.display = isVisible ? 'none' : 'block';

            ev.target.textContent = !isVisible ? 'Hide it' : 'Show more'
        }
    });
}

function e(type, text, attr, children, onClick) {
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
    if (onClick){
        const [event, func] = onClick.split(', ');
        element.addEventListener(event, func);
    }
    return element;
}