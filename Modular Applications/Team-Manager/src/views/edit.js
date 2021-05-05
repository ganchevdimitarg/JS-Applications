import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {editTeam, getTeamsById} from "../api/data.js";
import {loaderTemp} from "./common/loader.js";

const editTemp = (team, onSubmit, errorMsg) => html `
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
                ${errorMsg ? html `<divclass="error">${errorMsg}</div>` : ''}
                <label>Team name: <input type="text" name="name" .value=${team.name}></label>
                <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
                <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>
`;

export async function createEditPage(ctx){
    const id = ctx.params.id;

    ctx.render(until(loadingTemp(), loaderTemp()));

    async function loadingTemp() {
        const team = await getTeamsById(id);
        return editTemp(team, onSubmit)

        async function onSubmit(event){
            event.preventDefault();
            const formData = new FormData(event.target);
            const name = formData.get('name').trim();
            const logoUrl = formData.get('logoUrl').trim();
            const description = formData.get('description').trim();

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

                await editTeam(id, {name, logoUrl, description});

                ctx.setNavBar();
                event.target.reset();
                ctx.page.redirect('/details/' + id);
            } catch (error){
                ctx.render(editTemp(team, onSubmit, error.message));
            } finally {
                [...event.target.querySelectorAll('input')].forEach(i => i.disable = false);
            }
        }
    }
}