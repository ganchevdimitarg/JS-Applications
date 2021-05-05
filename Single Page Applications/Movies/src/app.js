import {setupHome, showHome} from './home.js';
import {setupDetails} from './details.js';
import {setupLogin, showLogin} from './login.js';
import {setupRegister, showRegister} from './register.js';
import {setupCreate, showCreate} from './create.js';
import {setupEdit} from './edit.js';

const main = document.querySelector('main');

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate
}
setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);

setupSection('form-sign-up', setupRegister);

setupNavigation();

showHome();

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

function setupNavigation() {
    const email = sessionStorage.getItem('email');

    if (email != null) {
        document.getElementById('welcome-email').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(m => m.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(m => m.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(m => m.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(m => m.style.display = 'block');
    }

    document.querySelector('nav').addEventListener('click', (event) => {
        const view = links[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    });

    document.getElementById('createLink').addEventListener('click', (event) => {
        event.preventDefault();
        showCreate();
    });

    document.getElementById('logout').addEventListener('click', logout);
}

async function logout() {
    const token = sessionStorage.getItem('authToken');
    const resp = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {'X-Authorization': token}
    });

    if (resp.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');

        [...document.querySelectorAll('nav .user')].forEach(m => m.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(m => m.style.display = 'block');

        showHome();
    } else {
        const error = resp.json();
        alert(error.message);
    }
}
