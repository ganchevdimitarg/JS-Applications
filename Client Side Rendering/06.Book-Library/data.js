async function request(url, option){
    const resp = await fetch(url, option);
    const data = await resp.json();

    return data;
}

const host = 'http://localhost:3030/jsonstore/collections/books';

async function getBooks(){
    return Object.entries(await request(host)).map(([k, v]) => Object.assign(v, {_id: k}));
}

async function getBookById(id){
    return await request(host + '/' + id);
}

async function createBook(book){
    return await request(host,{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(book)
    });
}

async function updateBook(id, book){
    return await request(host + '/' + id,{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(book)
    });
}

async function deleteBook(id){
    return await request(host + '/' + id,{
        method: 'DELETE',
    });
}

export {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}