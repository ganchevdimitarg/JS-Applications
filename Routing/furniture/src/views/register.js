import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from "../api/data.js";


const registerTemp = (onSubmit, errMsg, invalidEmail, invalidPass, invalidRePass) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                ${errMsg ? html `<div class="form-group warning"><p>${errMsg}</p></div>` : ''}
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${'form-control' + (invalidEmail ? ' is-invalid' : ' is-valid')} id="email" type="text"
                           name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${'form-control' + (invalidPass ? ' is-invalid' : ' is-valid')} id="password"
                           type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class=${'form-control' + (invalidRePass ? ' is-invalid' : ' is-valid')} id="rePass"
                           type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register"/>
            </div>
        </div>
    </form>
`;


export async function registerPage(ctx) {
    ctx.render(registerTemp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        if (email === '' || password === '' || rePass === '') {
            return ctx.render(registerTemp(onSubmit, 'All fields are required!', email === '', password === '', rePass === ''))
        }

        if (password !== rePass) {
            return ctx.render(registerTemp(onSubmit, 'Passwords don not match!', false, true, true))
        }

        await register(email, password);

        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}