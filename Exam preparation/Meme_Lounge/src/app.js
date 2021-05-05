import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {allMemePage} from "./views/allMeme.js";
import {homePage} from "./views/home.js";
import {registerPage} from "./views/register.js";
import {loginPage} from "./views/login.js";
import {profilePage} from "./views/profile.js";
import {editPage} from "./views/edit.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {setNav} from "./views/navBar.js";

const main = document.querySelector('main');

if (sessionStorage.getItem('userId')) {
    page('/', decorateContext, allMemePage);
} else {
    page('/', decorateContext, homePage);
}
page('/all-meme', decorateContext, allMemePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/profile', decorateContext, profilePage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);

setNavBar();
page();

function decorateContext(ctx, next){
    ctx.render = (context) => render(context, main);
    ctx.setNavBar = setNavBar;
    next();
}

function setNavBar() {
    const email = sessionStorage.getItem('email');
    setNav(email);
}
