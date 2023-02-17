import {
        AddCollectionDom,
        addMovieDom,
        deleteCollectionDom,
        deleteMovieDom,
        deleteMovieFromCollectionDom,
        editCollectionDom,
        editMovieDom,
        searchTmdbDom, showOverlay, updateOverlayWithMovieInfo,
} from "./dom.js";
import {
        ajaxAddCollection,
        ajaxAddMovie,
        ajaxDeleteCollection,
        ajaxDeleteMovie,
        ajaxDeleteMovieFromCollection,
        ajaxEditCollection,
        ajaxEditMovie,
        fetchMovieDataFromTmdb,
        searchTmdbAjax,
        uploadImg,
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
        // let isFav = form.collectionIsFavorite.value

        console.log(ajaxUrl, title, description)

        try {
                let data = await ajaxAddCollection(ajaxUrl, title, description);

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
        let rating = form.userRating.value;
        let poster = form.movieImg.files[0];
        let releaseYear = form.releaseYear.value
        let idCollection = form.idCollection.value;
        let genres = form.movieGenre.value

        // console.log("ajaxUrl: ", ajaxUrl);
        // console.log("title: ", title);
        // console.log("summary: ", summary);
        // console.log("rating: ", rating);
        // console.log("poster: ", poster);
        // console.log("releaseYear: ", releaseYear);
        // console.log("idCollection: ", idCollection);
        // console.log("genres: ", genres);



        //Upload the image to the server
        let imgPath = await uploadImg(poster);
        // use the imgPath to make a GET request to the server
        try {
                let data = await ajaxAddMovie(
                    ajaxUrl,
                    title,
                    summary,
                    rating,
                    imgPath,
                    releaseYear,
                    genres,
                    idCollection);
                console.log(data)
                if (data) {
                        document.querySelector('.addMovieOverlay').style.display = 'none';
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








