import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns} from "./towns.js";

const searchTemp = (towns, match) => html`
    <article>
        <div id="towns">
            <ul>
                ${towns.map(t => townTemp(t, match))}
            </ul>
        </div>
        <input type="text" id="searchText" .value=${match}>
        <button @click=${search}>Search</button>
        <div id="result">${counter(towns, match)}</div>
    </article>
`;

const townTemp = (name, match) => html`
    <li class=${(match && name.toLowerCase().includes(match.toLowerCase())) ? 'active' : ''}>${name}</li>
`;

const body = document.body;
update();

function update(match = '') {
    render(searchTemp(towns, match), body);
}

function search() {
    update(document.getElementById('searchText').value);
}

function counter(towns, match){
    const matches = towns.filter(t => match && t.toLowerCase().includes(match.toLowerCase())).length;
    if (matches){
        return `${matches} matches found`
    }else {
        return '';
    }
}
