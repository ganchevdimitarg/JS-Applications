import {render} from "./node_modules/lit-html/lit-html.js";
import * as api from './data.js';
import {layoutTemp} from './mian.js';

const context = {
    list: [],
    async load(){
        context.list = await api.getBooks();
        update();
    },
    onEdit(id){
        const book = context.list.find(b => b._id === id);
        update(book);
    },
    async onDelete(id){
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await api.deleteBook(id);
        }
    }
}

const onSubmit = {
    'add-form': onCreateBook,
    'edit-form': onEditBook
}

document.body.addEventListener('submit', (ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit[ev.target.id](formData, ev.target);
}));

start();

async function start(){
    update([]);
}

function update(book){
    const result = layoutTemp(context, book);
    render(result, document.body);
}

async function onCreateBook(formData, form){
    const book = {
        title: formData.get('title'),
        author: formData.get('author'),
    }

    await api.createBook(book);
    form.reset();
}

async function onEditBook(formData, form){
    const id = formData.get('_id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author'),
    }

    await api.updateBook(id, book);
    form.reset();
    update();
}