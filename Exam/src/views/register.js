import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from "../api/data.js";

const registerTemp = (onSubmit) => html`
    <section id="register-page" class="content auth">
        <h1>Register</h1>

        <form @submit=${onSubmit} id="register" action="#" method="">
            <fieldset>
                <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                    It
                    increases by diffusion and grows by dispersion.</blockquote>
                <p class="field email">
                    <label for="register-email">Email:</label>
                    <input type="email" id="register-email" name="email" placeholder="maria@email.com">
                </p>
                <p class="field password">
                    <label for="register-pass">Password:</label>
                    <input type="password" name="password" id="register-pass">
                </p>
                <p class="field password">
                    <label for="register-rep-pass">Repeat password:</label>
                    <input type="password" name="rep-pass" id="register-rep-pass">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Register">
                </p>
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export async function createRegisterPage(ctx) {
    ctx.render(registerTemp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repPass = formData.get('rep-pass').trim();

        //TODO валидация регистрация
        try {
            if (!email || !password || !repPass) {
                throw new Error('All fields are required');
            }

            await register(email, password);

            ctx.setNavBar();
            event.target.reset();
            ctx.page.redirect('/');
        } catch (error) {
            window.alert(error.message);
        }
    }
}