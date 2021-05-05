import {html} from "../../node_modules/lit-html/lit-html.js";
import {getAllMeme} from "../api/data.js";

const allMemeTemp = (data) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${data ? data.map(cardTemp) :
            html`<p class="no-memes">No memes in database.</p>` }
        </div>
    </section>
`;

const cardTemp = (data) => html `
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${data.title}</p>
                <img class="meme-image" alt="meme-img" src="${data.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${data._id}">Details</a>
            </div>
        </div>
    </div>
`;

export async function allMemePage(ctx) {
    const data = await getAllMeme();
    ctx.render(allMemeTemp(data));
}