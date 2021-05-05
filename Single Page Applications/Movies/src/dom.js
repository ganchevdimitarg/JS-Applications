export function e(type, text, attr, children, events) {
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
                element.className = value;
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