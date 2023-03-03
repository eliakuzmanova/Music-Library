import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { logout } from "../api/user.js";
import { getUserData } from "../api/util.js";

const header = document.querySelector("header")

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user,onLogout), header)
    

    function onLogout(ev) {
        ev.preventDefault()
        logout();
        updateNav()
       page.redirect("/")
    }
}

function navTemplate(user,onLogout) {
    return html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
    ${user
    ? html `
     <div class="user">
    <a href="/create">Add Album</a>
    <a @click = ${onLogout} href="javasript:void(0)">Logout</a>
    </div>  `
  : html ` 
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
  `}
</nav>
`
}