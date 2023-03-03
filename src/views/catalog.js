import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll} from "../api/data.js";


export async function showCatalogView(ctx) {
    const data = await getAll()
    ctx.render(catalogTemplate(data))
}

function catalogTemplate(data) {
    return html`
<section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          <!-- Display a li with information about every post (if any)-->
        ${data.length !== 0
        ? data.map(el => elemTemplate(el))
        : html` 
        <h2>There are no albums added yet.</h2>
        `
        }
        </ul>
      </section>
`}

function elemTemplate(elem) {
    return html`
<li class="card">
            <img src="${elem.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${elem.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${elem.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${elem.sales}</span></p>
            <a class="details-btn" href="/details/${elem._id}">Details</a>
          </li>
`}