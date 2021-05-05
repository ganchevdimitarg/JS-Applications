import {showDetails} from "./details.js";

let main;
let section;
let id;

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }

    if (movie.title == '' || movie.description == '' || movie.img == ''){
        return alert('All fields are required!');
    }

    const resp = await fetch('http://localhost:3030/data/movies/' + id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    });

    if (resp.ok){
        event.target.reset();
        showDetails(id);
    } else {
        const er = await resp.json();
        alert(er.message);
    }
}

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form =  section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showEdit(movieId){
    id = movieId;
    main.innerHTML = '';
    const movie = await getMovieInfo(movieId);
    document.getElementById('edit-title').value = movie.title;
    document.getElementById('edit-description').value = movie.description;
    document.getElementById('edit-img').value = movie.img;
    main.appendChild(section);
}

async function getMovieInfo(id){
    const resp = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await resp.json();

    return data;
}