import {e} from './dom.js';
import {showHome} from "./home.js";
import {showEdit} from "./edit.js";

async function onDelete(event, id) {
    event.preventDefault();
    const confirmed = confirm('Are you suer?');

    if (confirmed) {
        const resp = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'DELETE',
            headers: {'X-Authorization': sessionStorage.getItem('authToken')}
        });

        if (resp.ok) {
            alert('Movie is deleted');
            showHome();
        } else {
            const error = resp.json();
            alert(error.message);
        }
    }
}

function onEdit(event, id) {
    event.preventDefault();
    showEdit(id);
}

function createMovieCard(movie, likes, onwLikes) {
    const userId = sessionStorage.getItem('userId');

    const controls = e('div', '', ['class=controls'], [
        e('h3', 'Movie Description', ['class=my-3']),
        e('p', `${movie.description}`)
    ]);

    if (userId != null) {
        if (userId === movie._ownerId) {
            controls.appendChild(e('a', 'Delete', ['class=btn btn-danger', 'href=#'], [], {click: (ev) => onDelete(ev, movie._id)}));
            controls.appendChild(e('a', 'Edit', ['class=btn btn-warning', 'href=#'], [], {click: (ev) => onEdit(ev, movie._id)}));
        } else if (onwLikes.length === 0) {
            controls.appendChild(e('a', 'Like', ['class=btn btn-primary', 'href=#'], [], {click: onLike}));
        }
    }

    const likesSpan = e('span', `${likes} like${likes === 1 ? '' : 's'}`, ['class=enrolled-span'])
    controls.appendChild(likesSpan);

    return e('div', '', ['class=container'], [
        e('div', '', ['class=row bg-light text-dark'], [
            e('h1', `Movie title: ${movie.title}`),
            e('div', '', ['class=col-md-8'], [
                e('img', '', ['class=img-thumbnail', `src=${movie.img}`,
                    'alt=Movie'])
            ]),
            e('div', '', ['class=col-md-4 text-center'], [controls])
        ])
    ]);

    async function onLike(event) {
        const resp = await fetch('http://localhost:3030/data/likes ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({movieId: movie._id})
        });

        if (resp.ok) {
            event.target.remove();
            likes++;
            likesSpan.textContent = `${likes} like${likes === 1 ? '' : 's'}`;
        }

    }
}

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget
}

async function getLikesByMovieId(id) {
    const resp = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const data = await resp.json();
    console.log(data);
    return data;
}

async function getOwnLikesByMovieId(id) {
    const userId = sessionStorage.getItem('userId');
    const resp = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
    const data = await resp.json();

    return data;
}

async function getMovieById(id) {
    const resp = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await resp.json();

    return data;
}

export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);

    const [movie, likes, onwLikes] = await Promise.all([
        getMovieById(id),
        getLikesByMovieId(id),
        getOwnLikesByMovieId(id)
    ]);
    const card = createMovieCard(movie, likes, onwLikes);
    section.appendChild(card);
}