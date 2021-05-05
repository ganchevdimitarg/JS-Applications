import {showDetails} from "./details.js";

async function onSubmit(event){
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

    const resp = await fetch('http://localhost:3030/data/movies',{
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'X-Authorization': sessionStorage.getItem('authToken')
       },
       body: JSON.stringify(movie)
    });

    if (resp.ok){
        const movie = await resp.json();
        showDetails(movie._id);
    } else {
        const er = await resp.json();
        alert(er.message);
    }
}

let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form =  section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showCreate(){
    main.innerHTML = '';
    main.appendChild(section);
}