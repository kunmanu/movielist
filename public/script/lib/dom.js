import {createElement} from "./utilities.js";
import {editMovieEvent, editCollectionEvent} from "./event.js";

export const deleteMovieDom = (data) => {
    console.log(data)
    let p = createElement("p").appendChildren('film supprimé')

    document.querySelector(`.movie${data.idMovie}`).replaceWith(p);

}

export const deleteMovieFromCollectionDom = (data) => document.querySelector(`.movie${data.idMovie}-collection${data.idCollection}`).remove();

export const deleteCollectionDom = (data) => document.querySelector(`.collection-${data.id}`).remove()


export const editCollectionDom = (form, data) => {
    console.log(data)
    let h3 = createElement('h3', {id : `collection-${data.idCollection}`}).appendChildren(data.name)

    form.replaceWith(h3);
}

export const editMovieDom = (form, idMovie, newName) => {
    let p = createElement("p",{id:`movie${idMovie}`}).appendChildren(newName);
    form.replaceWith(p);

};

export const createEditMovieForm = (btn) => {

    let idMovie = btn.dataset.idmovie;
    let movieTitleElement = document.getElementById(`movie${idMovie}`);
    let movieTitle = document.getElementById(`movie${idMovie}`).textContent;
    let ajaxUrl = btn.dataset.ajax;

    let form = createElement(
        "form",
        {class : "update-movie-form", "data-ajax" : ajaxUrl},
        {"submit" : (e) => {e.preventDefault();editMovieEvent(form);}})
        .appendChildren(
            [
                createElement('input', {type :"text", name : "title", value : movieTitle}),
                createElement("input", {type :"hidden", name : "id", value : idMovie}),
                createElement('button', {type : 'submit',})
                    .appendChildren("ok")
            ]);


    movieTitleElement.replaceWith(form);
    return form
};

export const createEditCollectionForm = (btn) => {
    let idCollection = btn.dataset.idcollection;
    let ajaxUrl = btn.dataset.ajax;
    let collectionNameElement = document.querySelector(`.collection-${idCollection} h3`)
    let collectionName = collectionNameElement.textContent;

    let form = createElement(
        "form",
        {class: "update-collection-form", "data-ajax":ajaxUrl},
        {submit: (e) => {e.preventDefault();editCollectionEvent(form);}})
        .appendChildren(
            [
                createElement("input", { type: "text", name: "name", value: collectionName }),
                createElement("input", { type: "hidden", name: "id", value: idCollection }),
                createElement("button", { type: "submit" })
                    .appendChildren("ok")])

    collectionNameElement.replaceWith(form);
    return form
};