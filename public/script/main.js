import {
    createAddCollectionForm,
    createAddMovieForm,
    createEditCollectionForm,
    displayEditMovieForm,
} from "./lib/dom.js";
import {
    deleteCollectionEvent,
    deleteMovieEvent,
    deleteMovieFromCollectionEvent,
    searchTmdbEvent,
} from "./lib/event.js";
import {buildUrl} from "./lib/utilities.js";
import {fetchMovieDataFromTmdb} from "./lib/ajax.js";

console.log('main.js');

////////EDIT MOVIE

let editMovieButtons = document.querySelectorAll(".editMovie-btn");

if (editMovieButtons) {
    editMovieButtons.forEach((btn) => {
        btn.addEventListener("click", () => displayEditMovieForm(btn));
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

async function downloadImg(imgPath) {
    const response = await fetch(`../controllers/download_img.php?img=${imgPath}`);
    return await response.text();
}


addMovieFromTmdbBtn.addEventListener('click',async (e) => {
    e.preventDefault()
    const collectionId = document.getElementById('movieCollection').value
    const movie = await fetchMovieDataFromTmdb(addMovieFromTmdbBtn.dataset.movieid)
    console.log(movie)

    const title = movie.title;
    const genreNames = movie.genres.map(genre => genre.name).join(', ');
    const releaseDate = movie.release_date;
    const rating = movie.vote_average;
    const overview = movie.overview;
    const imgPath = movie.poster_path

    // console.log(imgPath)
    //
    //
    //
    // console.log(collectionId)
    // console.log(`Title: ${title}`);
    // console.log(`Genres: ${genreNames}`);
    // console.log(`Release date: ${releaseDate}`);
    // console.log(`Rating: ${rating}`);
    // console.log(`Overview: ${overview}`);


    const imgLocalPath = await downloadImg(imgPath)

    const params = {
        movieTitle: title,
        movieSummary: overview,
        movieRating: rating,
        movieImg: imgLocalPath,
        movieGenre: genreNames,
        idCollection: collectionId,
        releaseYear: releaseDate
    };

    const url = buildUrl('add_movie', params);

    const response = await fetch(url);


    // console.log(url, response)

})