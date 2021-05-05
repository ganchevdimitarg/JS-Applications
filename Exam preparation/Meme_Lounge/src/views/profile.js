import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMyMeme} from "../api/data.js";

const profileTemp = (username,email, userMemes, counter, gender) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
            <div class="user-content">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
                <p>My memes count: ${counter.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        ${counter.length !== 0 ? html`
            <div class="user-meme-listings">
                ${userMemes.map(cardTemp)}` : html`
            <p class="no-memes">No memes in database.</p>
            </div>`}
    </section>
`;

const cardTemp = (userMemes) => html`
    <div class="user-meme">
        <p class="user-meme-title">${userMemes.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${userMemes.imageUrl}>
        <a class="button" href="/details/${userMemes._id}">Details</a>
    </div>
`;

export async function profilePage(ctx) {
    const userMemes = await getMyMeme();
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const gender = sessionStorage.getItem('gender');
    ctx.render(profileTemp(username,email, userMemes, userMemes, gender));
}