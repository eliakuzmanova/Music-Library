import { del, get, post, put } from "./api.js";

    export async function getAll() {
        return await get("/data/albums?sortBy=_createdOn%20desc")
    }

export async function getById(id) {
     return await get(`/data/albums/${id}`) 
}

export async function deleteById(id) {
     return await del(`/data/albums/${id}`)
}

export async function create(data) {
    return await post("/data/albums", data)
}

export async function editById(id, data) {
     return await put(`/data/albums/${id}`, data)
}
// if myposts needed, add function
export async function makeLike(albumId) {
    return await post("/data/likes", {albumId})
}

export async function getLikes(albumId) {
    return await get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}
//:/data/likes?where=albumId%3D%22{albumId}%22%20and%20_ownerId%3D%22{userId}%22&count
export async function userDataLike(albumId, userId) {
    return await get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}