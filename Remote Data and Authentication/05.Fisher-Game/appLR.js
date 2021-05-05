function attachEvents() {
    document.querySelector('#register').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');
        if (password !== rePass) {
            return alert('Password don not match!')
        } else if (email === '' || password === '') {
            return alert('All fields are required!');
        }

        register(email, password);
    });
    document.getElementById('login').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');

        login(email, password);
    });
}

attachEvents();

async function register(email, password) {
    const resp = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (resp.ok) {
        const data = await resp.json();
        sessionStorage.setItem('authToken', data.accessToken);
    } else {
        alert(':( Try again');
    }
}

async function login(email, password) {
    const resp = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (resp.ok) {
        const data = await resp.json();
        sessionStorage.setItem('authToken', data.accessToken);
    } else {
        alert(`:( Try again: ${resp.statusText}`);
    }
}