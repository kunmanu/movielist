import {
    createEditMovieForm,
    createEditCollectionForm
} from "./lib/dom.js";
import {
        deleteCollectionEvent,
        deleteMovieEvent,
        deleteMovieFromCollectionEvent
} from "./lib/event.js";

console.log('main.js');

////////EDIT MOVIE

let editMovieButtons = document.querySelectorAll(".editMovie-btn");

if (editMovieButtons) {
    editMovieButtons.forEach((btn) => {
        btn.addEventListener("click", () => createEditMovieForm(btn));
    });
}


///////EDIT LIST
let updateCollectionButtons = document.querySelectorAll(".editCollection-btn")
if (updateCollectionButtons){
    updateCollectionButtons.forEach((btn) => {
        btn.addEventListener("click", () => createEditCollectionForm(btn));
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
