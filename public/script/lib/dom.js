import {createElement, buildUrl,} from "./utilities.js";
import {
    editMovieEvent,
    addCollectionEvent,
    deleteCollectionEvent, addMovieEvent, editCollectionEvent, deleteMovieEvent, deleteMovieFromCollectionEvent,
} from "./event.js";
import {

    fetchMovieDataFromTmdb,

} from "./ajax.js";

export const deleteMovieDom = (data) => {
    console.log(data)
    let p = createElement("p").appendChildren('film supprimé')
    document.querySelector(`.movie${data.idMovie}`).replaceWith(p);
    // document.querySelector(`movie${movie.idMovie}`).replaceWith(p);


}

export const deleteMovieFromCollectionDom = (data) => document.querySelector(`.movie${data.idMovie}-collection${data.idCollection}`).remove();

export const deleteCollectionDom = (data) => document.querySelector(`.collection-${data.id}`).remove()


export const createAddCollectionForm = (btn) => {
    let container = document.querySelector('.collectionsContainer')
    let ajaxUrl = btn.dataset.ajax;

    let form = createElement(
        'form',
        {class : "collectionsContainer-collection", "data-ajax":ajaxUrl},
        {'submit' : (e)=> {
                e.preventDefault();
                addCollectionEvent(form);}})
        .appendChildren(
            [
                createElement(
                    'input',
                    {
                        type : 'text',
                        name : 'collectionTitle',
                        id : 'collectionTitle',
                        placeholder : "Collection Name" }),
                createElement(
                    'textarea',
                    {
                        name : 'collectionDescription',
                        id : 'collectionDescription',
                        placeholder : "Collection description"}),
                createElement(
                    'button',
                    {
                        type : 'submit',
                    }).appendChildren('Create a new collection'),

            ])

container.insertBefore(form, container.firstChild)
}


export const AddCollectionDom = (form, collection) => {
    console.log(form)


    const collectionContainer = createElement(
        'div',
        { class: `collection-${collection.idCollection} collectionsContainer-collection` });

    const title = createElement('h3', { id: `collectionTitle-${collection.idCollection}`}).appendChildren(`${collection.title}`)
    const userText = createElement('p', {id : `collectionDescription-${collection.idCollection}`}, {}).appendChildren(`${collection.userText}`);
    console.log(userText)

    collectionContainer.appendChildren([title, userText]);


    const noMovies = createElement('p').appendChildren(`No movie in that list` )
    collectionContainer.appendChild(noMovies);


    const deleteBtn = createElement(
        'button',
        {
            'data-idCollection': collection.idCollection,
            'data-ajax': buildUrl('delete_collection', { 'idCollection': collection.idCollection }),
            class: 'deleteCollection-btn',
            type: 'button'
        },
        // {'click': () => deleteCollectionEvent(this)}
        ).appendChildren([createElement('i',{class : "fa-solid fa-trash"})]);
    collectionContainer.appendChild(deleteBtn);

    const editBtn = createElement('button', {
        'data-idCollection': collection.idCollection,
        'data-ajax': buildUrl('edit_collection', { 'idCollection': collection.idCollection }),
        class: 'editCollection-btn',
        type: 'button'
    }).appendChildren([createElement('i',{class : "fa-solid fa-pen"})])
    collectionContainer.appendChild(editBtn);

    const viewBtn = createElement('a', { href: buildUrl('view_collection', { 'id': collection.idCollection }) });
    const viewBtnInner = createElement('button', {
        'data-idCollection': collection.idCollection,
        class: 'viewCollection-btn',
        type: 'button'
    }).appendChildren('View Collection');



    viewBtn.appendChild(viewBtnInner);
    collectionContainer.appendChild(viewBtn);
    deleteBtn.addEventListener('click',()=>deleteCollectionEvent(deleteBtn))
    editBtn.addEventListener('click', ()=>editCollectionEvent(editBtn))
    form.replaceWith(collectionContainer)

};

export const createAddMovieForm = () => {

    document.querySelector('.addMovieOverlay').style.display = 'block'

    let closeAddMovieOverlay = document.querySelector('.closeAddMovieOverlay')


    closeAddMovieOverlay.addEventListener('click', () => {
        document.querySelector('.addMovieOverlay').style.display = 'none';
    });

    let addMovieButton = document.querySelector(".addMovie-btn")

    addMovieButton.addEventListener('click',(e)=>{
        e.preventDefault()
        addMovieEvent(document.querySelector('.addMovieForm'))
    })







}


export const addMovieDom = (form, movie) => {


    let movieCardsContainer =  document.querySelector('.movieCardsContainer')

    const movieContainer = createElement(
        'div',
        {class:`movieCardsContainer-movieCard movie${movie.idMovie}`});


    const img = createElement(
        'img',
        {
            id :`moviePoster${movie.idMovie}`,
            class : "movieCardsContainer-movieCard-moviePoster",
            src : '../public/img/movie_posters/'+movie.poster
        }
    )

    const movieDetails = createElement(
        'div',
        {
            class : 'movieCardsContainer-movieCard-movieDetails'
        }
    )


    const title = createElement(
        'h2',
        {id : `movieTitle${movie.idMovie}` }).appendChildren(`${movie.title}`);

    const summary = createElement(
        'p',
        {id :`movieSummary${movie.idMovie}`,}
    ).appendChildren(`${movie.summary}`)


    const movieMetaContainer =  createElement('div',{class : "movieCardsContainer-movieCard-movieMeta"})
    const userRating = createElement('span', {id :`movieRating${movie.idMovie}`}).appendChildren(`Rating: ${movie.userRating}`);
    const releasedDate = createElement('span', {id :`movieReleaseYear${movie.idMovie}`}).appendChildren(`released in: ${movie.releaseYear}`);

    movieMetaContainer.append(releasedDate,userRating)

    movieDetails.append(title, summary,movieMetaContainer)
    movieContainer.append(img, movieDetails)

    const movieActions = createElement('div', {class: "movieCardsContainer-movieCard-movieActions"});

    const deleteBtn = createElement(
        'button',
        {
            class: "deleteMovie-btn",
            type: "button",
            "data-idmovie": movie.idMovie,
            "data-ajax": `index.php?page=delete_movie&idMovie=${movie.idMovie}`
        }
    ).appendChildren("delete");

    const editBtn = createElement(
        'button',
        {
            class: "editMovie-btn",
            type: "button",
            "data-idmovie": movie.idMovie,
            "data-ajax": `index.php?page=edit_movie&idMovie=${movie.idMovie}`
        }
    ).appendChildren("edit movie");

    const viewBtn = createElement(
        'a',
        {
            href: `index.php?page=view_movie&id=${movie.idMovie}`
        }
    ).appendChildren(createElement(
        'button',
        {
            class: "viewMovie-btn",
            type: "button",
            "data-idmovie": movie.idMovie
        }
    ).appendChildren("view movie"));


    editBtn.addEventListener('click', ()=> (editMovieEvent(editBtn)))
    deleteBtn.addEventListener('click', ()=> deleteMovieEvent(deleteBtn))


    movieActions.append(deleteBtn, editBtn, viewBtn);
    movieDetails.append(title, summary, movieMetaContainer, movieActions);
    movieContainer.append(img, movieDetails);
    movieCardsContainer.prepend(movieContainer);
};


export const searchTmdbDom = (data) => {

    let resultContainer = document.querySelector(".resultContainer");

    data.forEach(movie => {

        const movieCard = createElement(
            "div", {
                class: "resultContainer-movieCard"
            });

        const title = createElement(
            'h3', {
                class: "resultContainer-movieCard-movieDetails-title"
            }, {}
        ).appendChildren(`${movie.title}`)

        const overview = createElement(
            'p', {
            class: "resultContainer-movieCard-movieDetails-overview"
        }, {}).appendChildren(`${movie.overview.substring(0,150)}...`)

        const poster = createElement('div', {class :" resultContainer-movieCard-poster" })

        const posterImg = movie.poster_path === null ?
             createElement("img", {
                src: '../public/img/movie_posters/missing.jpg',
            }) :
            createElement("img", {
                src: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
            });

        const releaseDate = createElement("p", {
            class: "resultContainer-movieCard-movieDetails-releaseDate"
        }).appendChildren(`Release date: ${movie.release_date}`);

        const voteAverage = createElement("p", {
            class: "resultContainer-movieCard-movieDetails-voteAverage"
        }, ).appendChildren(`Vote average: ${movie.vote_average}`);

        const addBtn = createElement('button', {
            class: "resultContainer-movieCard-movieDetails-addBtn",
            'data-movieId': movie.id
        }).appendChildren('add to a collection')


        const movieDetails = createElement("div", {
            class: "resultContainer-movieCard-movieDetails"
        })


        addBtn.addEventListener('click', ()=>{
            displayOneMovieFromTmdb(addBtn)
        })

        poster.appendChildren([posterImg])
        movieDetails.appendChildren([
            title,
            overview,
            releaseDate,
            voteAverage,
            addBtn
        ])
        movieCard.appendChildren([

            poster,
            movieDetails,

        ]);



        resultContainer.appendChild(movieCard);
    });
}


export const displayOneMovieFromTmdb = async (addBtn) => {

    const overlayClass = ".overlay";

    // try {
        const movieData = await fetchMovieDataFromTmdb(addBtn.dataset.movieid);
        updateOverlayWithMovieInfo(movieData);
        showOverlay(overlayClass);
        document.getElementById('close-overlay').addEventListener('click', ()=>
            hideOverlay('.overlay')
        )
    // } catch (error) {
    //     console.error(error);
    // }
};


export function updateOverlayWithMovieInfo(movieData) {

    const movieImgContainer = document.querySelector('.movie-img');
    const movieTitleContainer = document.getElementById('movie-title');
    const movieDescriptionContainer = document.getElementById('movie-description');
    const movieRatingContainer = document.getElementById('movie-rating');
    const movieGenreContainer = document.getElementById('movie-genre');
    const movieReleaseDateContainer = document.getElementById('movie-release-date');
    const addMovieFromTmdbBtn = document.querySelector('.addMovieFromTmdbBtn');



    movieTitleContainer.innerHTML = movieData.title;
    movieDescriptionContainer.innerHTML = movieData.overview;
    movieImgContainer.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    movieRatingContainer.innerHTML = `rating : ${movieData.vote_average}`;
    movieReleaseDateContainer.innerHTML = `Release date : ${movieData.release_date}`;
    movieGenreContainer.innerHTML = movieData.genres.map(genre => genre.name).join(', ');

    addMovieFromTmdbBtn.setAttribute('data-movieId', movieData.id)

}


export const editCollectionDom = (data) => {
    // hide the edit collection overlay
    hideOverlay('.editCollectionOverlay');

    // select the elements of the collection based on its id
    let collectionTitle = document.querySelector(`#collectionTitle-${data.idCollection}`);
    let collectionDescription = document.querySelector(`#collectionDescription-${data.idCollection}`);

    // update the elements with the new name data from the AJAX call
    collectionTitle.innerHTML = data.name;
    collectionDescription.innerHTML = data.description;
};

export const editMovieDom = (data) => {
    hideOverlay('.editMovieOverlay');
    console.log(data);

    // const movieContainer = document.querySelector(`.movie-${data.idMovie}`);
    const movieTitle = document.querySelector(`#movieTitle${data.idMovie}`);
    const movieSummary = document.querySelector(`#movieSummary${data.idMovie}`);
    const movieReleaseYear = document.querySelector(`#movieReleaseYear${data.idMovie}`);
    const movieRating = document.querySelector(`#movieRating${data.idMovie}`);
    const moviePoster = document.querySelector(`#moviePoster${data.idMovie}`);

    movieTitle.innerText = data.title;
    movieSummary.innerText = data.summary;
    movieReleaseYear.innerText = `Released in ${data.releaseYear}`;
    movieRating.innerText = `Internet rating: ${data.userRating}`;
    moviePoster.src = `../public/img/movie_posters/${data.poster}`;
};






export function addMovieFromTmdbDom() {
    hideOverlay('.overlay')
}

export function showOverlay(overlayClass) {
    let overlay = document.querySelector(overlayClass);
    overlay.style.display = 'block';
}


export function hideOverlay(overlayClass) {
    let overlay = document.querySelector(overlayClass);
    overlay.style.display = 'none';
}


export function editUserDom(data) {
    hideOverlay('.editUserOverlay');
    alert('movie edited successfully')
    document.querySelector('.userInfo-username').innerHTML = data.username
    document.querySelector('.userInfo-email').innerHTML = data.email
}