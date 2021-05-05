import {html} from "./node_modules/lit-html/lit-html.js";

const rowTemp = book => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td data-id=${book._id}>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    </tr>
`;

const tableTemp = context => html`
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody @click="${ev => onBtnClick(ev, context)}">
        ${context.list.map(rowTemp)}
        </tbody>
    </table>
`;

const createFormTemp = () => html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

const editFormTemp = book => html`
    <form id="edit-form">
        <input type="hidden" name="_id" .value=${book._id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder=${book.title} .value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder=${book.author} .value=${book.author}>
        <input type="submit" value="Save">
    </form>
`;

const layoutTemp = (context, book) => html`
    <button @click=${context.load} id="loadBooks">LOAD ALL BOOKS</button>
    ${tableTemp(context)}
    ${book ? editFormTemp(book) : createFormTemp()}
`;

function onBtnClick(ev, context) {
    const id = ev.target.parentNode.dataset.id;
    if (ev.target.classList.contains('edit-btn')) {
        context.onEdit(id);
    } else if (ev.target.classList.contains('delete-btn')) {
        context.onDelete(id);
    }
}

export {layoutTemp};