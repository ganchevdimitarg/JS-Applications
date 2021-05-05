import {html, render} from "./node_modules/lit-html/lit-html.js";

const selectTemp = (data) => html`
    <select id="menu">
        ${data.map(d => html`
            <option value=${d._id}>
                ${d.text}
            </option>
        `)}
    </select>
`;

const endpoint = 'http://localhost:3030/jsonstore/advanced/dropdown';
const main = document.querySelector('div');
const input = document.getElementById('itemText');
init();

async function init() {
    document.querySelector('form').addEventListener('submit', (ev) => addItem(ev, list));

    const resp = await fetch(endpoint);
    const data = await resp.json();
    const list = Object.values(data);

    update(list);
}

function update(list) {
    const result = selectTemp(list);
    render(result, main);
}


async function addItem(ev, list) {
    ev.preventDefault();

    const item = {
        text: input.value
    }

    const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    });

    const result = await resp.json();
    list.push(result);

    update(list);
}