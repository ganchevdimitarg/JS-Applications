function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

attachEvents();

async function getPosts() {
    const url = `http://localhost:3030/jsonstore/blog/posts`;

    const reps = await fetch(url);
    const data = await reps.json();

    const posts = document.getElementById('posts');
    posts.innerHTML = '';

    Object.values(data).map(d => {
        const post = document.createElement('option');
        post.setAttribute('value', d.id);
        post.textContent = d.title;
        posts.appendChild(post);
    });
}

function viewPost() {
    const postsId = document.querySelector('#posts').value;
    getPostDetails(postsId);
}

async function getPostDetails(postId) {
    const ul = document.getElementById('post-comments');
    ul.innerHTML = '';

    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/'+ postId;
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const [postResp, commentsResp] = await Promise.all([
        fetch(postUrl),
        fetch(commentsUrl)
        ]);
    const postData = await postResp.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const commentsData = await commentsResp.json();
    const comments = Object.values(commentsData).filter(c => c.postId === postId);

    comments.map(createComment).forEach(c => ul.appendChild(c));
}

function createComment(comment) {
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}


