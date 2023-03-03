import { getUserData } from "../api/util.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyItemsById } from "../api/data.js";



export async function showMyPostsView(ctx) {

    const user = getUserData()
    const myItems = await getMyItemsById(user._id)
    ctx.render(myPostTemplates(myItems))
// '    async function onClick(ev) {
//         ev.preventDefault();
//         ctx.page.redirect(`/details/${item._id}`)
        
//     }'
}

function myPostTemplates(items) {
    return html`
  
    `
}

// function showItems(items) {
//     if (items.length > 1) {
//         return items.map(item => cardTemplate(item))
//     } else if (items.length > 0) {
//         return  cardTemplate(items[0])
//     } else {
//         return
//     }
   
// }

function cardTemplate(elem) {
    return html`

`
}


