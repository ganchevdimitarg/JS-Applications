import {html} from "../../node_modules/lit-html/lit-html.js";
import {deleteListing, getListingById} from "../api/data.js";

const detailsTemp = (data, userId, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${data.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${data.brand}</li>
                <li><span>Model:</span>${data.model}</li>
                <li><span>Year:</span>${data.year}</li>
                <li><span>Price:</span>${data.price}</li>
            </ul>

            <p class="description-para">${data.description}</p>

            <div class="listings-buttons">
                ${userId ? html`
                    <a href="/edit/${data._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>` : ''}
            </div>
        </div>
    </section>`;

export async function createDetailsPage(ctx) {
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const data = await getListingById(id);
    ctx.render(detailsTemp(data, (userId == data._ownerId), onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            await deleteListing(id);
            ctx.page.redirect('/listings')
        }
    }
}
