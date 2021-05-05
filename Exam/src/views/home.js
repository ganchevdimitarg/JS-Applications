import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMostRecentArticles} from "../api/data.js";

const homeTemp = (data) => html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            <h2>JavaScript</h2>
            ${articleTempCard(data[0])}
        </section>
        <section class="recent csharp">
            <h2>C#</h2>
            ${articleTempCard(data[1])}
        </section>
        <section class="recent java">
            <h2>Java</h2>
            ${articleTempCard(data[2])}
        </section>
        <section class="recent python">
            <h2>Python</h2>
            ${articleTempCard(data[3])}
        </section>
    </section>
`;

const articleTempCard = (data) => html`
    ${data ? html`
        <article>
            <h3>${data.title}</h3>
            <p>${data.content}</p>
            <a href="/details/${data._id}" class="btn details-btn">Details</a>
        </article>` : html`<h3 class="no-articles">No articles yet</h3>`}`;

export async function createHomePage(ctx) {
    const articles = await getMostRecentArticles();
    ctx.render(homeTemp(articles))
}

const categoryClass = {
    JavaScript: 'js',
    Python: 'python',
    Java: 'java'
}