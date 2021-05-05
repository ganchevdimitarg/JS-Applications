import {html} from "../../node_modules/lit-html/lit-html.js";
import {login} from "../api/data.js";


const loginTemp = (onSubmit) => html`
    <section id="login">
        <div class="container">
            <form @submit=${onSubmit} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>`;

export async function createLoginPage(ctx) {
    ctx.render(loginTemp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        try {
            if (username == '' || password == '') {
                throw new Error('All fields are required');
            }

            await login(username, password)
            ctx.setNavBar();
            ctx.page.redirect('/listings');
        } catch (error){
            window.alert(error.message)
        }
    }
}