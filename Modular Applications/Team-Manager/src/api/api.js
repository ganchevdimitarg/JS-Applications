export const settings = {
    host: ''
}

async function request(url, opt) {
    try {
        const resp = await fetch(url, opt);

        if (resp.ok === false) {
            const error = await resp.json();
            throw new Error(error.message);
        }

        try {
            const data = await resp.json();
            return data;
        } catch (e) {
            return resp;
        }
    } catch (e) {
        console.log(e.message);
        throw e;
    }
}

function getOptions(method = 'GET', body) {
    const options = {
        method,
        headers: {}
    };

    const token = sessionStorage.getItem('authToken')
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, data) {
    return await request(url, getOptions('POST', data));
}

export async function put(url, data) {
    return await request(url, getOptions('PUT', data));
}

export async function del(url) {
    return await request(url, getOptions('DELETE'));
}

export async function register(email, username, password) {
    const user = await post(settings.host + '/users/register', {email, username, password});

    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('authToken', user.accessToken);
    sessionStorage.setItem('userId', user._id);

    return user;
}

export async function login(email, password) {
    const user = await post(settings.host + '/users/login', {email, password});

    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('authToken', user.accessToken);
    sessionStorage.setItem('userId', user._id);

    return user;
}

export async function logout() {
    const user = await get(settings.host + '/users/logout');

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return user;
}
