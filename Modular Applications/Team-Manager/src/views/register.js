import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from "../api/data.js";

const registerTemp = (onSubmit, errorMsg) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
                ${errorMsg ? html `<divclass="error">${errorMsg}</div>` : ''}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
            <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
            </footer>
        </article>
    </section>
`;

export async function createRegisterPage(ctx) {
    ctx.render(registerTemp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repass').trim();

        try {
            if (!email || !username || !password) {
                throw new Error('All fields are required');
            }

            if (email.length < 3 || username.length < 3 || password.length < 3) {
                throw new Error('At least 3 characters');
            }

            if ( password !== repass) {
                throw new Error('the password do not match');
            }

            await register(email, username, password);

            ctx.setNavBar();
            event.target.reset();
            ctx.page.redirect('my-teams');
        } catch (error) {
            ctx.render(registerTemp(onSubmit, error.message));
        }
    }
}
