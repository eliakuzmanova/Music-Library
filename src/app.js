import { updateNav } from "./views/nav.js";
import {render} from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs"
import { showHomeView } from "./views/home.js";
 import { showRegisterView } from "./views/register.js";
 import { showLoginView } from "./views/login.js";
import { showCatalogView } from "./views/catalog.js";
import { showDetailsView } from "./views/details.js";
import { showEditView } from "./views/edit.js";
import { showCreateView } from "./views/create.js";

const root = document.querySelector("main")

page(middleWare)
page("/", showHomeView)
page("/register", showRegisterView)
page("/login", showLoginView)
page("/catalog", showCatalogView)
page("/details/:id", showDetailsView)
page("/edit/:id", showEditView)
page("/create", showCreateView)

updateNav()
page.start()

function middleWare(ctx, next) {

    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
}