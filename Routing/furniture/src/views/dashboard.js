import {html} from "../../node_modules/lit-html/lit-html.js";
import {getFurniture} from "../api/data.js";
import {furnitureCard} from "./common/item.js";

const dashboardTemp = (data, search = '', onSubmit) => html `
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
            <form @click=${onSubmit}>
                <input type="text" id="search-input" name="search" .value=${search}>
                <button  id="search-btn">Search</button>
            </form>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(furnitureCard)}
    </div>
`;

export async function dashboardPage(ctx){
    const searchParam = ctx.querystring.split('=')[1] || '';

    const resp = await getFurniture(searchParam);

    function onSubmit() {
        const input = encodeURIComponent(document.getElementById('search-input').value);

        ctx.page.redirect('/?search=' + input);
    }

    ctx.render(dashboardTemp(resp,searchParam,onSubmit));
}