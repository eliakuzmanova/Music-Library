import {html} from "../../node_modules/lit-html/lit-html.js";
import { updateNav } from "./nav.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";

export function showLoginView(ctx) {
ctx.render(loginTemplate(createSubmitHandler(onSubmit)))

async function onSubmit({email, password}) {
    if (!email || !password) {
        alert("All fields are required")
        return
    } 
        await login(email, password)
        updateNav()
        ctx.page.redirect("/catalog") //check if redirect is correct
    
}
}

function loginTemplate(onSubmit) {
return html`
    <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form @submit = ${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`
}