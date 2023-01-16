import {createElement} from "./utilities.js";

import {editMovieEvent} from "./event.js";

export const editMovieDom = (form, idMovie, newName) => {
    let p = createElement("p",{id:`movie${idMovie}`}).appendChildren(newName);
    form.replaceWith(p);

};

export let createEditMovieForm = (btn) => {

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

