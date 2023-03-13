import {
    createAddCollectionForm,
    createAddMovieForm, showOverlay,
} from "./lib/dom.js";
import {
    addMovieFromTmdbEvent,
    deleteCollectionEvent,
    deleteMovieEvent,
    deleteMovieFromCollectionEvent, editCollectionEvent, editMovieEvent, editUserEvent,
    searchTmdbEvent,
} from "./lib/event.js";
import {buildUrl, downloadImg} from "./lib/utilities.js";
import {fetchMovieDataFromTmdb} from "./lib/ajax.js";

console.log('main.js');

////////EDIT MOVIE

let editMovieButtons = document.querySelectorAll(".editMovie-btn");

if (editMovieButtons) {
    editMovieButtons.forEach((btn) => {
        btn.addEventListener("click", () => editMovieEvent(btn));
    });
}


///////EDIT COLLECTION [X]
let editCollectionButtons = document.querySelectorAll(".editCollection-btn")
if (editCollectionButtons){
    editCollectionButtons.forEach((btn) => {
        btn.addEventListener("click", () => editCollectionEvent(btn));
    });
}


//////////DELETE COLLECTION

let deleteCollectionBtn = document.querySelectorAll('.deleteCollection-btn')

if (deleteCollectionBtn){
    deleteCollectionBtn.forEach(btn => {
        btn.addEventListener('click',  () => {deleteCollectionEvent(btn)});
    });
}

/////DELETE MOVIE FROM LIST


let deleteMovieFromCollectionBtn = document.querySelectorAll('.deleteMovieFromCollection-btn')

if (deleteMovieFromCollectionBtn) {
    deleteMovieFromCollectionBtn.forEach(btn => {
        btn.addEventListener('click', () => deleteMovieFromCollectionEvent(btn))
    })



////////DELETE MOVIE

let deleteMovieButtons = document.querySelectorAll(".deleteMovie-btn")

if (deleteMovieButtons){

    deleteMovieButtons.forEach((btn)=>{
            btn.addEventListener('click',async () =>deleteMovieEvent(btn));
        }
    )}

}

///////ADD COLLECTION

let addCollectionBtn =  document.querySelectorAll(".addCollection-btn")

if (addCollectionBtn) {
    addCollectionBtn.forEach((btn)=>{
        btn.addEventListener('click', () => createAddCollectionForm(btn))
    })

}


//////ADD MOVIE

let addMovieBtn = document.querySelectorAll('.addMovieForm-btn')

if (addMovieBtn) {

    addMovieBtn.forEach((btn=>{
        btn.addEventListener('click',()=> createAddMovieForm(btn))
    }))
}





////// API
/////search TMDB

let movieSearchForm = document.querySelector('.movieSearchForm')

if (movieSearchForm){

    movieSearchForm.addEventListener("submit",  (e)=> {
        e.preventDefault()

        searchTmdbEvent(movieSearchForm)
        }
    )
}


//Add from tmdb

const addMovieFromTmdbBtn = document.querySelector('.addMovieFromTmdbBtn')


if (addMovieFromTmdbBtn) {
    addMovieFromTmdbBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addMovieFromTmdbEvent(addMovieFromTmdbBtn);
    });

}


//USER


let editUserButton = document.querySelector(".editUserBtnOverlay");
console.log(editUserButton)
if (editUserButton) {
    editUserButton.addEventListener("click", () => editUserEvent());

}