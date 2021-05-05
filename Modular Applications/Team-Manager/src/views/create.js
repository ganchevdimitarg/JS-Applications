import {html} from "../../node_modules/lit-html/lit-html.js";
import {createTeam} from "../api/data.js";

const createTemp = (onSubmit, errorMsg) => html `
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                ${errorMsg ? html `<divclass="error">${errorMsg}</div>` : ''}
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>
`;

export async function createCreatePage(ctx){
    ctx.render(createTemp(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');

        [...event.target.querySelectorAll('input')].forEach(i => i.disable = true);

        try {
            if (!name || !logoUrl || !description) {
                throw new Error('All fields are required');
            }

            if (name.length < 4){
                throw new Error('at least 4 characters');
            }

            if (description.length < 10){
                throw new Error('at least 10 characters');
            }

            const team = await createTeam({name, logoUrl, description});

            ctx.setNavBar();
            event.target.reset();
            ctx.page.redirect('/details/' + team._id);
        } catch (error){
            ctx.render(createTemp(onSubmit, error.message));
        } finally {
            [...event.target.querySelectorAll('input')].forEach(i => i.disable = false);
        }
    }
}