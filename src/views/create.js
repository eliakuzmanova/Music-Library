import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";
import { createSubmitHandler } from "../api/util.js";

export function showCreateView(ctx) {

    ctx.render(createTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({singer,album, imageUrl, release, label,sales}) { //add params <<<-----------------

        if (!singer || !album || !imageUrl || !release || !label || !sales) {  //add params <<<-----------------
            alert("All fields are required")
            return
        }

        await create({
            singer,
            album, 
            imageUrl, 
            release, 
            label, 
            sales 
          })  //add params <<<-----------------

        ctx.page.redirect(`/catalog`) // check if redirect is correct
    }

}

function createTemplate(onSubmit) {
    return html`
<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form @submit = ${onSubmit} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`
}