import {html, render} from './node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

const listTemp = (data) => html`
    <ul>
        ${data.map(t => html`
            <li>${t}</li>`)}
    </ul>
`;

function getTowns(ev) {
    ev.preventDefault();
    const result = listTemp(document.getElementById('towns').value.split(',').map(x => x.trim()));

    render(result, document.getElementById('root'));

    ev.reset();
}
