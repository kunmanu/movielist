import {createElement} from "./lib/utilities.js";
import {ajaxEditMovie} from "./lib/ajax.js";
import {createEditMovieForm} from "./lib/dom.js";
import {editMovieEvent} from "./lib/event.js";

console.log('main.js');



//////////DELETE LIST

let deleteCollectionBtn = document.querySelectorAll('.deleteCollection-btn')
deleteCollectionBtn.forEach(btn => {
    btn.addEventListener('click',  async () => {

        let ajaxUrl = btn.dataset.ajax
        let response = await fetch(ajaxUrl);
        let data = await response.json();

        if (data.success === true) {
            document.querySelector(`.collection-${data.id}`).remove();
        }

    });
});

/////DELETE MOVIE FROM LIST


let deleteFromCollectionMovieBtn = document.querySelectorAll('.deleteMovieFromCollection-btn')
if (deleteFromCollectionMovieBtn) {
    deleteFromCollectionMovieBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            let ajaxUrl = btn.dataset.ajax
            console.log(ajaxUrl)

            let response = await fetch(ajaxUrl);
            let data = await response.json();

            if (data.success === true) {
                console.log(data)
                document.querySelector(`.movie${data.idMovie}-collection${data.idCollection}`).remove();
            }
        });
    });
}


////////EDIT MOVIE

let editMovieButtons = document.querySelectorAll(".editMovie-btn");

if (editMovieButtons) {
    editMovieButtons.forEach((btn) => {
        btn.addEventListener("click", () => createEditMovieForm(btn));
    });
}


// async function ajaxEditMovie(form) {
// //     console.log(form)
// //     // Get the id of the movie.phtml to be edited and the new title from the form
// //     let newName = form.title.value;
// //     console.log(newName)
// //     let params = new URLSearchParams();
// //     params.append("movie_name", newName);
// //     console.log(form.dataset)
// //     let ajaxUrl = form.dataset.ajax + `&${params.toString()}`;
// //     console.log(ajaxUrl)
// //     let response = await fetch(ajaxUrl);
// //     let data = await response.json();
// //
// //     if (data.success === true) {
// //         console.log(data)
// //         let p = document.createElement("p");
// //         p.textContent = data.name;
// //         p.id = `movie${data.idMovie}`;
// //         form.replaceWith(p);
// //     }
// // }

// let openMovieForm = (btn) => {
//     // Get data
//     let idMovie = btn.dataset.idmovie;
//     let movieTitleElement = document.getElementById(`movie${idMovie}`);
//     let movieTitle = movieTitleElement.textContent;
//     let ajaxUrl = btn.dataset.ajax
//
//
//
//     // let form = createElement(
//     //     "form",
//     //     {
//     //         class : "update-movie-form",
//     //         "data-ajax" : ajaxUrl
//     //     },
//     //     {"submit" : (e) => {
//     //             e.preventDefault();
//     //             ajaxEditMovie(form);
//     //         }
//     //     }
//     // )
//     //
//     // let input = createElement(
//     //     'input',
//     //     {
//     //         type :"text",
//     //         name : "title",
//     //         value : movieTitle
//     //     }
//     // )
//     //
//     // let idInput = createElement(
//     //     "input",
//     //     {
//     //         type :"hidden",
//     //         name : "id",
//     //         value : idMovie
//     //     }
//     // )
//     //
//     // let submitButton = createElement(
//     //     'button',
//     //     {
//     //         type : 'submit',
//     //     }
//     // ).appendChildren("ok");
//     //
//     //
//     // form.append(input, idInput, submitButton);
//
//     let form = createElement(
//         "form",
//         {class : "update-movie-form", "data-ajax" : ajaxUrl},
//         {"submit" : (e) => {e.preventDefault();ajaxEditMovie(form);}})
//         .appendChildren(
//             [
//             createElement('input', {type :"text", name : "title", value : movieTitle}),
//             createElement("input", {type :"hidden", name : "id", value : idMovie}),
//             createElement('button', {type : 'submit',})
//                 .appendChildren("ok")
//             ]);
//
//
//     movieTitleElement.replaceWith(form);
// };

///////EDIT LIST
let updateCollectionButtons = document.querySelectorAll(".editCollection-btn")
updateCollectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => openCollectionForm(btn));
});


// let openCollectionForm = (btn) => {
//     // Get the collection name element and the collection name
//     let idCollection = btn.dataset.idcollection;
//     let ajaxUrl =  btn.dataset.ajax
//     console.log(ajaxUrl)
//     let collectionNameElement = document.querySelector(`.collection-${idCollection} h3`);
//     let collectionName = collectionNameElement.textContent;
//
//     // Create the form element
//     let form = document.createElement("form");
//     form.classList.add("update-collection-form");
//
//     // Create the input element for the collection name
//     let input = document.createElement("input");
//     input.type = "text";
//     input.name = "name";
//     input.value = collectionName;
//
//     // Create the hidden input element for the collection id
//     let idInput = document.createElement("input");
//     idInput.type = "hidden";
//     idInput.name = "id";
//     idInput.value = idCollection;
//
//
//     // Create the submit button
//     let submitButton = document.createElement("button");
//     submitButton.type = "submit";
//     submitButton.textContent = "ok";
//
//     form.setAttribute('data-ajax', ajaxUrl)
//
//     // Add an event collectionener to the submit button that calls the ajaxEditCollection function when the form is submitted
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         ajaxEditCollection(form);
//
//
//     });
//
//     // Add the input and submit button to the form
//     form.append(input, idInput, submitButton);
//
//     // Replace the collection name element with the form
//     collectionNameElement.replaceWith(form);
//
// };


let openCollectionForm = (btn) => {
    let idCollection = btn.dataset.idcollection;
    let ajaxUrl = btn.dataset.ajax;
    let collectionNameElement = document.querySelector(`.collection-${idCollection} h3`)
    let collectionName = collectionNameElement.textContent;
    let form = createElement(
        "form",
        {class: "update-collection-form", "data-ajax":ajaxUrl},
        {submit: (e) => {e.preventDefault();ajaxEditCollection(form);}})
        .appendChildren(
            [
                createElement("input", { type: "text", name: "name", value: collectionName }),
                createElement("input", { type: "hidden", name: "id", value: idCollection }),
                createElement("button", { type: "submit" })
                    .appendChildren("ok")])

    collectionNameElement.replaceWith(form);
};


async function ajaxEditCollection(form) {

    let newName = form.name.value;

    let params = new URLSearchParams();
    params.append("collection_name", newName);
    let ajaxUrl = form.dataset.ajax + `&${params.toString()}`;
    console.log(ajaxUrl)
    let response = await fetch(ajaxUrl);
    let data = await response.json();

    if (data.success === true) {
        console.log(data)
        let h3 = document.createElement("h3");
        h3.textContent = data.name;
        h3.id = `collection-${data.idCollection}`;
        form.replaceWith(h3);
    }




}


////////DELETE MOVIE

let deleteMovieButtons = document.querySelectorAll(".deleteMovie-btn")

deleteMovieButtons.forEach((btn)=>{
    btn.addEventListener('click',async (e) => {
        let ajaxUrl = btn.dataset.ajax
        console.log(ajaxUrl)
        let response = await fetch(ajaxUrl);

        let data = await response.json();

        if (data.success === true) {
            console.log(data)
            let p= document.createElement('p')
            p.textContent = 'film supprimé'
            document.querySelector(`.movie${data.idMovie}`).replaceWith(p);
        }
    });
    }
)