import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMyListing} from "../api/data.js";


const myListinsTemp = (data) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            ${data.length != 0 ? data.map(createListingCard) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
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

export async function createMyListingsPage(ctx) {
    const data = await getMyListing();
    ctx.render(myListinsTemp(data));
}