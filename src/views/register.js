import {html} from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";

export function showRegisterView(ctx) {
ctx.render(registerTemplate(createSubmitHandler(onSubmit)))

async function onSubmit({email, password, "re-password": repassword}) { // check if repass is with that name <-------
    if (!email || !password) {
        alert("All fields are required")
        return
    } 
     if(password !== repassword){
        alert("Password don\`t match")
        return
    } 
        await register(email, password)
        ctx.page.redirect("/catalog") // check if redirect id correct
    
}
}

function registerTemplate(onSubmit) {
return html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit = ${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>


`
}