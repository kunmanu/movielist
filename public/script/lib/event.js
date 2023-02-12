import {
        editMovieDom,
        editCollectionDom,
        deleteCollectionDom,
        deleteMovieFromCollectionDom,
        deleteMovieDom, AddCollectionDom, addMovieDom, searchTmdbDom,
} from "./dom.js";
import {
        ajaxDeleteCollection,
        ajaxEditCollection,
        ajaxEditMovie,
        ajaxDeleteMovieFromCollection,
        ajaxDeleteMovie,
        ajaxAddCollection,
        uploadImg, ajaxAddMovie, searchTmdbAjax,
} from "./ajax.js";
import {buildUrl} from "./utilities.js";



export const deleteMovieEvent = async (btn) => {
        let ajaxUrl = btn.dataset.ajax

        try {
                let data = await ajaxDeleteMovie(ajaxUrl);

                if (data) {
                        deleteMovieDom(data);
                }
        }
        catch (error) {
                console.log(error);
        }
}


export const deleteMovieFromCollectionEvent = async (btn) =>{
        let ajaxUrl = btn.dataset.ajax

        try {
                let data = await ajaxDeleteMovieFromCollection(ajaxUrl);

                if (data) {
                        deleteMovieFromCollectionDom(data);
                }
        }
        catch (error) {
                console.log(error);
        }
}


export const deleteCollectionEvent = async (btn) => {
        console.log(btn)
        let ajaxUrl = btn.dataset.ajax
        try {
                let data = await ajaxDeleteCollection(ajaxUrl);

                if (data) {
                        deleteCollectionDom(data);
                }
        }
        catch (error) {
                console.log(error);
        }
}


export const editCollectionEvent =  async (form) => {
        let newName = form.name.value;
        let ajaxUrl = form.dataset.ajax

        try {
                let data = await ajaxEditCollection(ajaxUrl, newName);

                if (data) {
                        editCollectionDom(form, data);
                }
        }
        catch (error) {
                console.log(error);
        }

}


export const editMovieEvent = async (form) => {
        let ajaxUrl = form.dataset.ajax;
        let newName = form.title.value;
        try {
                let data = await ajaxEditMovie(ajaxUrl, newName);
                if (data) {
                        let idMovie = data.idMovie
                        let name = data.name
                        editMovieDom(form, idMovie, name);
                }
        } catch (error) {
                console.log(error);
        }
};


export const addCollectionEvent = async (form) => {
        let ajaxUrl = form.dataset.ajax;
        let title = form.collectionTitle.value;
        let description = form.collectionDescription.value
        let isFav = form.collectionIsFavorite.value

        console.log(ajaxUrl, title, description, isFav)

        try {
                let data = await ajaxAddCollection(ajaxUrl, title, description, isFav);

                if (data) {
                        console.log(data.collection)
                        AddCollectionDom(form, data.collection);
                }
        } catch (error) {
                console.log(error)

        }

}



export const addMovieEvent = async (form) => {
        let ajaxUrl = form.dataset.ajax;
        let title = form.movieTitle.value;
        let summary = form.movieSummary.value;
        let rating = form.movieRating.value;
        let poster = form.movieImg.files[0];
        let releaseYear = form.releaseYear.value
        let isFavorite = form.movieIsFavorite.value;
        let idCollection = form.idCollection.value;

        //Upload the image to the server
        let imgPath = await uploadImg(poster);
        // use the imgPath to make a GET request to the server
        try {
                let data = await ajaxAddMovie(ajaxUrl,
                    title,
                    summary,
                    rating,
                    imgPath,
                    releaseYear,
                    isFavorite,
                    idCollection);
                if (data) {

                        addMovieDom(form, data.movie);
                }
        } catch (error) {
                console.log(error);
        }
};


export const searchTmdbEvent = async (form) => {

        document.querySelector(".resultContainer").innerHTML=""

        let searchInput = form.searchInput.value

        let data = await searchTmdbAjax(searchInput)
        if (data){searchTmdbDom(data)}
}



export const addFromTmdbEvent =  async (addBtn) => {
        const overlay = document.getElementById('overlay');
        const movieImg = document.querySelector('.movie-img');
        const movieTitle = document.getElementById('movie-title');
        const movieDescription = document.getElementById('movie-description');
        const movieRating = document.getElementById('movie-rating');
        const movieGenre = document.getElementById('movie-genre');
        const closeOverlay = document.getElementById('close-overlay');
        const addToCollection = document.getElementById('add-to-collection');




        try {
                // Use fetch to retrieve the movie information from the server
                const response = await fetch(buildUrl('tmdb_get_one_movie', {'id': addBtn.dataset.movieid}));
                const movie = await response.json();

                // Update the overlay with the movie information
                console.log(movie)
                movieTitle.innerHTML = movie.title;
                movieDescription.innerHTML = movie.overview;
                movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieRating.innerHTML = `rating : ${movie.vote_average}`

                let genreNames = '';

                movie.genres.forEach(genre => {
                        genreNames += genre.name + ', ';
                });

                        // Remove the trailing comma and space
                genreNames = genreNames.slice(0, -2);

                        // Update the movie-genre element with the genre names
                movieGenre.innerHTML = genreNames;


                // Show the overlay
                overlay.style.display = 'block';
        } catch (error) {
                console.error(error);
        }


        // Show the overlay
        overlay.style.display = 'block';

}
