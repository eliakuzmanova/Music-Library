import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteById, getById, getLikes, makeLike, userDataLike } from "../api/data.js";
import { getUserData } from "../api/util.js";

export async function showDetailsView(ctx) {

    const id = ctx.params.id
    const data = await getById(id)
    let likes = await getLikes(id)
   

    const user = getUserData()
    let isUser = Boolean(user)
    let isOwner = isUser && user._id == data._ownerId
    let isLiked;
    if(isUser) {
       isLiked = await userDataLike(id, user._id)
    }
    
    ctx.render(detailsTemplate(data, user, isUser, isOwner, onEdit, onDelete,likes, isLiked, onLike)) // add params <<< -------------

    async function onDelete(ev) {
        ev.preventDefault()
        const isConfirm = confirm("Are you sure you want to delete")

        if (isConfirm) {
            await deleteById(id)
            ctx.page.redirect(`/catalog`)
        } else {
            return
        }

    }

    async function onEdit(ev) {
        ev.preventDefault()
        ctx.page.redirect(`/edit/${id}`)
    }

    async function onLike(ev) {
        ev.preventDefault()
        await makeLike(id)
        likes++
        isLiked = await userDataLike(id, user._id)
        ctx.render(detailsTemplate(data, user, isUser, isOwner, onEdit, onDelete,likes, isLiked, onLike))
        // ctx.page.redirect(`/details/${id}`)
    }
}



function detailsTemplate(data, user, isUser, isOwner, onEdit, onDelete ,likes, isLiked, onLike) {  // add params <<< ----------------------
    return html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
        <div id="action-buttons">
            ${isOwner
                    ? html`
                    
            <a @click=${onEdit} href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            

            `
                    : likeIt(isUser,likes, isLiked, onLike)
                    }
        </div>
    </div>
</section>
`
}

function likeIt(isUser,likes, isLiked, onLike) {
        return html`
        ${isUser && isLiked == 0
        ?  html`
        <a @click = ${onLike} href="javascript:void(0)" id="like-btn">Like</a>
        `
        : nothing
        }
        `
 
}