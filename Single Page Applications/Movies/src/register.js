import {showHome} from "./home.js";

let main;
let section;

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget

    const form = document.querySelector('#form-sign-up form');
    form.addEventListener('submit',  onSubmit);
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (email === '' || password === ''){
        alert('All fields are required!')
    } else if (password !== rePass){
        alert('Password don\'t match!');
    }

    const resp = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (resp.ok) {
        event.target.reset();
        const data = await resp.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        document.getElementById('welcome-email').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(m => m.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(m => m.style.display = 'none');

        showHome();
    } else {
        const error = resp.json();
        alert(error.message);
    }
}

export async function showRegister(){
    main.innerHTML = '';
    main.appendChild(section);
}