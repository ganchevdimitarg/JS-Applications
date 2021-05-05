import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {logout} from "./api/data.js";
import {createHomePage} from "./views/home.js";
import {createRegisterPage} from "./views/register.js";
import {createLoginPage} from "./views/login.js";
import {createCreatePage} from "./views/create.js";
import {createDetailsPage} from "./views/details.js";
import {createMyTeamsPage} from "./views/myTeams.js";
import {createEditPage} from "./views/edit.js";
import {createBrowsePage} from "./views/browse.js";

const main = document.querySelector('main');

document.getElementById('logout').addEventListener('click', async () => {
    await logout();
    setNavBar();
    page.redirect('/');
});

page('/',decorateContext, createHomePage);
page('/register',decorateContext, createRegisterPage);
page('/login',decorateContext, createLoginPage);
page('/browsе',decorateContext, createBrowsePage);
page('/my-teams',decorateContext, createMyTeamsPage);
page('/create',decorateContext, createCreatePage);
page('/details/:id',decorateContext, createDetailsPage);
page('/edit/:id',decorateContext, createEditPage);

setNavBar();
page();

function decorateContext(ctx, next){
    ctx.render = (context) => render(context, main);
    ctx.setNavBar = setNavBar;
    next();
}


function setNavBar() {
    const token = sessionStorage.getItem('authToken');

    if (token !== null){
        document.querySelectorAll('.guest').forEach(g => g.style.display = 'none');
        document.querySelectorAll('.user').forEach(u => u.style.display = 'block');
    } else {
        document.querySelectorAll('.guest').forEach(g => g.style.display = 'block');
        document.querySelectorAll('.user').forEach(u => u.style.display = 'none');
    }
}