import {html} from "../../node_modules/lit-html/lit-html.js";
import {getAllListings} from "../api/data.js";


const listinsTemp = (data) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${data ? data.map(createListingCard) : html`<p class="no-cars">No cars in database.</p>`}
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

export async function createListingsPage(ctx) {
    const data = await getAllListings();
    ctx.render(listinsTemp(data));
}