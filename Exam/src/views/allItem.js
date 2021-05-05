import {html} from "../../node_modules/lit-html/lit-html.js";
import {getAllItem} from "../api/data.js";


const allItemTemp = (data) => html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${data.length !== 0 ? data.map(createItemCard) : html `<h3 class="no-articles">No articles yet</h3>`}
    </section>
`;

const createItemCard = (data) => html`
    <a class="article-preview" href="/details/${data._id}">
        <article>
            <h3>Topic: <span>${data.title}</span></h3>
            <p>Category: <span>${data.category}</span></p>
        </article>
    </a>
`;

export async function createAllItemPage(ctx) {
    const data = await getAllItem();
    ctx.render(allItemTemp(data));
}
