function attachEvents() {
    document.getElementById('refresh').addEventListener('click', getMessages);
    document.getElementById('submit').addEventListener('click', postMessage);
}

attachEvents();

async function getMessages() {
    const resp = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await resp.json();

    const messages = document.getElementById('messages');
    Object.values(data).forEach(message => {
        const {author, content} = message;
        if (!author || !content) {
            return;
        }
        const newMessage = `${author}: ${content}`;

        if (!messages.value.split('\n').includes(newMessage)) {
            messages.value += `${newMessage}\n`;
        }
    });
}

async function postMessage() {
    const author = document.getElementById('author');
    const content = document.getElementById('content');

    if (!author.value || !content.value) {
        return;
    }

    const newMessage = {
        author: `${author.value}`,
        content: `${content.value}`
    }

    const req = await fetch('http://localhost:3030/jsonstore/messenger',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMessage)
        });

    author.value = '';
    content.value = '';
}
