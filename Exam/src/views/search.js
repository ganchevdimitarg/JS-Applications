import {html} from "../../node_modules/lit-html/lit-html.js";
import {search} from "../api/data.js";


const searchTemp = (data, onSearch) => html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form id="search-form">
            <p class="field search">
                <input id="search-input" type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input @click=${onSearch} class="btn submit" type="submit" value="Search">
            </p>
        </form>
        <div class="search-container">
            ${data.length != 0 ? data.map(createItemCard) :
                    html`<h3 class="no-articles">No matching articles</h3>`}
        </div>
    </section>`;

const createItemCard = (data) => html`
    <a class="article-preview" href="/details/${data._id}">
        <article>
            <h3>Topic: <span>${data.title}</span></h3>
            <p>Category: <span>${data.category}</span></p>
        </article>
    </a>
`;

export async function createSearchPage(ctx) {
    ctx.render(searchTemp( [], onSearch));

    async function onSearch(event) {
        event.preventDefault()
        const query = document.getElementById('search-input').value;
        const data = await search(query);
        console.log(data)
        ctx.render(searchTemp(data || [], onSearch));
    }

}