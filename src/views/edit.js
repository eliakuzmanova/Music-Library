import {html} from "../../node_modules/lit-html/lit-html.js"
import { editById, getById } from "../api/data.js"
import { createSubmitHandler } from "../api/util.js"

export async function showEditView(ctx) {
    const id = ctx.params.id
    const data = await getById(id)
    ctx.render(editTemplate(data, createSubmitHandler(onSubmit)))

   async function onSubmit({singer,album, imageUrl, release, label,sales}) { //add params <<<----------------
        
    if (!singer || !album || !imageUrl || !release || !label || !sales) { //add params <<<----------------
            alert("All fields are required")
            return
        }

       await editById(id,{
        singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales 
      }) //add params <<<----------------

        ctx.page.redirect(`/details/${id}`) // check if redirect is correct 
    }
}

function editTemplate(data, onSubmit) {
return html`
  <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit = ${onSubmit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${data.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" value=${data.album}/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${data.imageUrl}/>
            <input type="text" name="release" id="album-release" placeholder="Release date" value=${data.release}/>
            <input type="text" name="label" id="album-label" placeholder="Label" value=${data.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${data.sales}/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`
}