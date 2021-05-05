import {html, render} from './node_modules/lit-html/lit-html.js';
import {styleMap} from "./node_modules/lit-html/directives/style-map.js";
import {cats} from "./catSeeder.js";

const catCardTemp = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
            <div class="status" style=${styleMap(cat.info ? {} : {display: 'none'})} id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const main = document.getElementById('allCats');
cats.forEach(c => c.info = false);
update();

function update() {
    const allCats = html`
        <ul @click=${toggleInfo}>
            ${cats.map(catCardTemp)}
        </ul>
    `;

    render(allCats, main);
}

function toggleInfo(ev) {
    const catId = ev.target.parentNode.querySelector('.status').id;
    const cat = cats.find(c => c.id === catId);
    cat.info = !cat.info;
    update();
}