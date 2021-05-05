import {html} from "../../node_modules/lit-html/lit-html.js";
import {searchListing} from "../api/data.js";


const searchTemp = (onSearch, data, length = 0) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input type="text" id="search-input" name="search" placeholder="Enter desired production year">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">
            ${length !== 0 ? data.map(createListingCard) : html`<p class="no-cars"> No results.</p>`}
        </div>
    </section>`;

const createListingCard = (data) => html`
    <div class="listing">
        <div class="preview">
            <img src=${data.imageUrl}>
        </div>
        <h2>${data.brand} ${data.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${data.year}</h3>
                <h3>Price: ${data.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${data._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`;

export async function createSearchPage(ctx) {
    ctx.render(searchTemp(onSubmit));

    async function onSubmit() {
        const input = encodeURIComponent(document.getElementById('search-input').value);
        const data = await searchListing(input);
        ctx.render(searchTemp(onSubmit, data, data.length));
    }
}