import {
        AddCollectionDom,
        addMovieDom,
        addMovieFromTmdbDom,
        deleteCollectionDom,
        deleteMovieDom,
        deleteMovieFromCollectionDom,
        editCollectionDom,
        editMovieDom, editUserDom,
        hideOverlay,
        searchTmdbDom,
        showOverlay,
} from "./dom.js";
import {
        addMovieFromTmdbAjax,
        ajaxAddCollection,
        ajaxAddMovie,
        ajaxDeleteCollection,
        ajaxDeleteMovie,
        ajaxDeleteMovieFromCollection,
        ajaxEditCollection,
        ajaxEditMovie, ajaxEditUser,
        fetchCollectionData,
        fetchMovieDataFromTmdb,
        fetchMovieDataLocal,
        searchTmdbAjax,
        uploadImg,
} from "./ajax.js";
import {downloadImg} from "./utilities.js";


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




export const editMovieEvent = async (btn) => {
        let ajaxUrl = btn.dataset.ajax


        showOverlay('.editMovieOverlay')

        let closeEditMovieOverlay = document.querySelector('.closeEditMovieOverlay');
        closeEditMovieOverlay.addEventListener('click', () => {
                hideOverlay('.editMovieOverlay')
        });



        let movieInfo = await fetchMovieDataLocal(btn.dataset.idmovie);

        document.querySelector('#movie_name').value = movieInfo.title;
        document.querySelector('#summary').value = movieInfo.summary;
        document.querySelector('#currentPoster').src = `../public/img/movie_posters/${movieInfo.poster}`;
        document.querySelector('#releaseYear').value = movieInfo.releaseYear;
        // document.querySelector('#internetRating').value = movieInfo.internetRating;
        document.querySelector('#userRating').value = movieInfo.userRating;
        document.querySelector('#idMovie').value = btn.dataset.idmovie
        console.log(movieInfo.poster)


        document.querySelector('.editMovieBtn').addEventListener('click', async (event,) => {


                event.preventDefault();
                console.log(movieInfo.poster)
                let movie_name = document.querySelector('#movie_name').value;
                let summary = document.querySelector('#summary').value;
                let poster = document.querySelector('#poster').files[0] ? document.querySelector('#poster').files[0] : movieInfo.poster;
                let releaseYear = document.querySelector('#releaseYear').value;
                let userRating = document.querySelector('#userRating').value;
                let idMovie = document.querySelector('#idMovie').value;
                console.log(document.querySelector('#poster').files[0])

                let imgPath = poster === document.querySelector('#poster').files[0] ?  await uploadImg(poster) : poster


                ajaxEditMovie(
                    ajaxUrl,
                    movie_name,
                    summary,
                    imgPath,
                    releaseYear,
                    // internetRating,
                    userRating,
                    idMovie
                )
                    .then(data => {
                            editMovieDom(data);
                    })

                    .catch(error => {
                            console.error(error);
                    });
        });
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
                console.log('hello',data)
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




export const editCollectionEvent = async (btn) => {

        showOverlay('.editCollectionOverlay');

        let closeEditMovieOverlay = document.querySelector('.closeEditCollectionOverlay');
        closeEditMovieOverlay.addEventListener('click', () => {
                hideOverlay('.editCollectionOverlay');
        });

        let idCollection = btn.dataset.idcollection;
        let ajaxUrl = btn.dataset.ajax;

        let collectionData = await fetchCollectionData(idCollection);

        document.querySelector('#collectionTitle').value = collectionData.title;
        document.querySelector('#collectionDescription').value = collectionData.userText;
        document.querySelector('#idCollection').value = collectionData.idCollection;



        document.querySelector('.editCollectionBtn').addEventListener('click', (event) => {
                event.preventDefault();
                let collectionTitle = document.querySelector('#collectionTitle').value;
                let collectionDescription = document.querySelector('#collectionDescription').value;

                ajaxEditCollection(
                    ajaxUrl,
                    collectionTitle,
                    collectionDescription,
                )
                    .then((data) => {
                            editCollectionDom(data);
                    })
                    .catch((error) => {
                            console.error(error);
                    });
        });
};




export async function addMovieFromTmdbEvent(addMovieFromTmdbBtn) {
        const collectionId = document.getElementById('movieCollection').value
        const movie = await fetchMovieDataFromTmdb(addMovieFromTmdbBtn.dataset.movieid);

        const title = movie.title;
        const genreNames = movie.genres.map(genre => genre.name).join(', ');
        const releaseDate = movie.release_date;
        const rating = movie.vote_average;
        const overview = movie.overview;
        const imgPath = movie.poster_path;

        const imgLocalPath = await downloadImg(imgPath);

        const  response = await addMovieFromTmdbAjax(
            title,
            overview,
            rating,
            imgLocalPath,
            genreNames,
            collectionId,
            releaseDate
        )

        if (response.status === 200){
                addMovieFromTmdbDom()
        }
}


/* Add a click event listener to the responsive menu */

const menuButton = document.querySelector('.siteNav-ToggleResponsive');
const menuList = document.querySelector('.siteNav-list');

menuButton.addEventListener('click', function() {
        menuList.classList.toggle('responsive');
});




export const editUserEvent = () => {
        showOverlay('.editUserOverlay');
        document.querySelector('.closeEditUserOverlay').addEventListener('click', () => {
                hideOverlay('.editUserOverlay');
        });

        // Prefill the form with user information
        document.querySelector('#username').value = document.querySelector('.userInfo-username').innerHTML;
        document.querySelector('#email').value = document.querySelector('.userInfo-email').innerHTML;


        //edit the user on click

        document.querySelector('.editUserBtn').addEventListener('click', async (e) => {
                e.preventDefault()
                let username = document.querySelector('#username').value
                let email = document.querySelector('#email').value

                let data = await ajaxEditUser(username, email)

                if (data.success === true){
                        editUserDom(data);
                }

        })
}
