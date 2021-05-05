import {html} from "../../node_modules/lit-html/lit-html.js";
import {deleteMeme, getMemeById} from "../api/data.js";

const detailsTemp = (isOwner, meme, onDelete) => html `
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                
                ${isOwner ? html `
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${onDelete} class="button danger">Delete</button>` : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx){
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    const userId = sessionStorage.getItem('userId');

    ctx.render(detailsTemp((userId === meme._ownerId), meme, onDelete))

    async function onDelete(){
        const confirmed = confirm('Are you sure want to delete this meme?');

        if (confirmed) {
            await deleteMeme(memeId);
            ctx.page.redirect('/all-meme');
        }
    }
}