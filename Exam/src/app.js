import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {logout} from "./api/data.js";
import {createHomePage} from "./views/home.js";
import {createLoginPage} from "./views/login.js";
import {createRegisterPage} from "./views/register.js";
import {createAllItemPage} from "./views/allItem.js";
import {createCreatePage} from "./views/create.js";
import {createEditPage} from "./views/edit.js";
import {createDetailsPage} from "./views/details.js";
import {createSearchPage} from "./views/search.js";


const main = document.getElementById('main-content');

document.getElementById('logout').addEventListener('click', async () => {
    await logout();
    setNavBar();
    page.redirect('/');
});

page('/', decorateContext, createHomePage);
page('/login', decorateContext, createLoginPage);
page('/register', decorateContext, createRegisterPage);
page('/catalogue', decorateContext, createAllItemPage);
page('/create', decorateContext, createCreatePage);
page('/edit/:id', decorateContext, createEditPage);
page('/details/:id', decorateContext, createDetailsPage);
page('/search', decorateContext, createSearchPage);

setNavBar();

page();

function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, main);
    ctx.setNavBar = setNavBar;
    next();
}

function setNavBar() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('user').style.display = 'none';
    }
}
