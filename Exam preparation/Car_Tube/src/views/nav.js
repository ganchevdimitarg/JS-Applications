import page from "../../node_modules/page/page.mjs";
import {html, render} from "../../node_modules/lit-html/lit-html.js";
import {logout} from "../api/data.js";

const navTemp = (onLogout, username) => html`
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/listings">All Listings</a>
        <a href="/search">By Year</a>
        ${username == null ? html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="register">Register</a>
        </div>` : html `
        <div id="profile">
            <a>Welcome ${username}</a>
            <a href="/my-listings">My Listings</a>
            <a href="/create">Create Listing</a>
            <a @click=${onLogout} id="logout" href="javascript:void(0)">Logout</a>
        </div>`}
    </nav>`;

export function createNavBar(username) {
    const header = document.querySelector('header');
    render(navTemp(onLogout, username), header);

    async function onLogout(){
        await logout();
        render(navTemp(), header);
        page.redirect('/');
    }
}