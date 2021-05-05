import {html} from "../../node_modules/lit-html/lit-html.js";
import {deleteItem, getItemById} from "../api/data.js";

const detailsTemp = (data, isOwner, onDelete) => html`
    <section id="details-page" class="content details">
        <h1>${data.title}</h1>

        <div class="details-content">
            <strong>Published in category ${data.category}</strong>
            <p>${data.content}</p>

            <div class="buttons">
                ${isOwner ? html`
                <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${data._id}" class="btn edit">Edit</a>` : ''}
                <a href="/" class="btn edit">Back</a>
            </div>
        </div>
    </section>
`;

export async function createDetailsPage(ctx) {
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const data = await getItemById(id);
    ctx.render(detailsTemp(data, (userId == data._ownerId), onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            await deleteItem(id);
            ctx.page.redirect('/')
        }
    }
}
