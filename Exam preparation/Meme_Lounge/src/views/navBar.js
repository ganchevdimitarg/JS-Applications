import page from "../../node_modules/page/page.mjs";
import {html, render} from "../../node_modules/lit-html/lit-html.js";
import * as api from "../api/data.js";

const navTemp = (email, onLogout) => html`
    <a href="/all-meme">All Memes</a>
    ${email ? html`
        <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${email}</span>
                <a href="/profile">My Profile</a>
                <a id="logout" @click=${onLogout} href="javascript:void(0)">Logout</a>
            </div>
        </div>` : html`
        <div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <a class="active" href="/">Home Page</a>
        </div>`}
`;

export function setNav(email) {
    const nav = document.querySelector('nav');
    render(navTemp(email, onLogout), nav);

    async function onLogout() {
        await api.logout();
        render(navTemp(), nav);
        page.redirect('/');
    }
}