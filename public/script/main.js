import {
    createEditMovieForm,
    createEditCollectionForm,
    createAddCollectionForm,
    createAddMovieForm,
} from "./lib/dom.js";
import {
    deleteCollectionEvent,
    deleteMovieEvent,
    deleteMovieFromCollectionEvent, searchTmdbEvent,
} from "./lib/event.js";
import {buildUrl} from "./lib/utilities.js";

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

///////ADD COLLECTION

let addCollectionBtn =  document.querySelectorAll(".addCollection-btn")

if (addCollectionBtn) {
    addCollectionBtn.forEach((btn)=>{
        btn.addEventListener('click', () => createAddCollectionForm(btn))
    })

}


//////ADD MOVIE

let addMovieBtn = document.querySelectorAll('.addMovie-btn')

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


/////Get One Movie


//done when the card are build in dom.js

// let addMovieBtnApi = document.querySelectorAll('.resultContainer-movieCard-movieDetails-addBtn')
//
// if (addMovieBtnApi) {
//     addMovieBtnApi.forEach((btn=>{
//        btn.addEventListener('click',()=>{
//            console.log('hey')
//        })
//
//     }))}


// Get references to the HTML elements
const buttons = document.querySelectorAll('.resultContainer-movieCard-movieDetails-addBtn');
const overlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('close-overlay');
const info = document.querySelector('.movie-info')


// Add click event listeners to the "Add to Collection" buttons
buttons.forEach(button => {
    button.addEventListener('click', async () => {

        info.innerHTML = button.dataset.movieid
        try {
            // Use fetch to retrieve the movie information from the server
            const response = await fetch(buildUrl('tmdb_get_one_movie', {'id': button.dataset.movieid}));
            const movie = await response.json();

            // Update the overlay with the movie information
            movieTitle.innerHTML = movie.title;
            movieDescription.innerHTML = movie.description;

            // Show the overlay
            overlay.style.display = 'block';
        } catch (error) {
            console.error(error);
        }


        // Show the overlay
        overlay.style.display = 'block';

    })})

// Add a click event listener to the close button
closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});
