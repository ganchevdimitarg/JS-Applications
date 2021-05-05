import {html} from "../../node_modules/lit-html/lit-html.js";
import {createItem} from "../api/data.js";

const createTemp = (onSubmit) => html`
    <section id="create-page" class="content">
        <h1>Create Article</h1>

        <form @submit=${onSubmit} id="create" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>

                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>

            </fieldset>
        </form>
    </section>
`;

export async function createCreatePage(ctx) {
    ctx.render(createTemp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();


        try {
            if (!title || !category || !content) {
                throw new Error('All fields are required');
            }

            await createItem(title, category, content);
            ctx.setNavBar();
            ctx.page.redirect('/');
        } catch (error) {
            window.alert(error.message)
        }
    }
}
