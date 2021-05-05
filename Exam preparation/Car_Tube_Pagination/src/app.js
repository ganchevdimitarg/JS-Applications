import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {logout} from "./api/data.js";
import {createHomePage} from "./views/home.js";
import {createLoginPage} from "./views/login.js";
import {createRegisterPage} from "./views/register.js";
import {createListingsPage} from "./views/listings.js";
import {createCreatePage} from "./views/create.js";
import {createEditPage} from "./views/edit.js";
import {createDetailsPage} from "./views/details.js";
import {createMyListingsPage} from "./views/myListings.js";
import {createSearchPage} from "./views/search.js";


const main = document.getElementById('site-content');

document.getElementById('logout').addEventListener('click', async () => {
    await logout();
    setNavBar();
    page.redirect('/');
});

page('/', decorateContext, createHomePage);
page('/login', decorateContext, createLoginPage);
page('/register', decorateContext, createRegisterPage);
page('/create', decorateContext, createCreatePage);
page('/edit/:id', decorateContext, createEditPage);
page('/my-listings', decorateContext, createMyListingsPage);
page('/details/:id', decorateContext, createDetailsPage);
page('/search', decorateContext, createSearchPage);
page('/listings', decorateContext, createListingsPage);
page('/search', decorateContext, createSearchPage);

setNavBar();

page();


function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, main);
    ctx.setNavBar = setNavBar;
    next();
}

function setNavBar() {
    const username = sessionStorage.getItem('username') || '';
    if (username !== ''){
        document.getElementById('user').textContent = `Welcome ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}
