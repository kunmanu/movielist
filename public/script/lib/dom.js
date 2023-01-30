import {createElement, buildUrl,} from "./utilities.js";
import {
    editMovieEvent,
    editCollectionEvent,
    addCollectionEvent,
    deleteCollectionEvent, addMovieEvent
} from "./event.js";

export const deleteMovieDom = (data) => {
    console.log(data)
    let p = createElement("p").appendChildren('film supprimé')
    document.querySelector(`.movie${data.idMovie}`).replaceWith(p);

}

export const deleteMovieFromCollectionDom = (data) => document.querySelector(`.movie${data.idMovie}-collection${data.idCollection}`).remove();

export const deleteCollectionDom = (data) => document.querySelector(`.collection-${data.id}`).remove()

export const editCollectionDom = (form, data) => {
    console.log(data)
    let h3 = createElement('h3', {id : `collection-${data.idCollection}`}).appendChildren(data.name)

    form.replaceWith(h3);
}

export const editMovieDom = (form, idMovie, newName) => {
    let p = createElement("p",{id:`movie${idMovie}`}).appendChildren(newName);
    form.replaceWith(p);

};

export const createEditMovieForm = (btn) => {

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

export const createEditCollectionForm = (btn) => {
    let idCollection = btn.dataset.idcollection;
    let ajaxUrl = btn.dataset.ajax;
    let collectionNameElement = document.querySelector(`.collection-${idCollection} h3`)
    let collectionName = collectionNameElement.textContent;

    let form = createElement(
        "form",
        {class: "update-collection-form", "data-ajax":ajaxUrl},
        {submit: (e) => {e.preventDefault();editCollectionEvent(form);}})
        .appendChildren(
            [
                createElement("input", { type: "text", name: "name", value: collectionName }),
                createElement("input", { type: "hidden", name: "id", value: idCollection }),
                createElement("button", { type: "submit" })
                    .appendChildren("ok")])

    collectionNameElement.replaceWith(form);
    return form
};


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
                    'input',
                    {
                        type : 'checkbox',
                        value : 1,
                        name : 'collectionIsFavorite',
                        id : 'collectionIsFavorite',
                    }),
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

    // console.log(collection.idCollection)
    const collectionContainer = createElement(
        'div',
        { class: `collection-${collection.idCollection} collectionsContainer-collection` });

    const title = createElement('h3', { id: `collection-${collection.idCollection}`}).appendChildren(`${collection.title}`)
    const userText = createElement('p', {}, {}).appendChildren(`${collection.userText}`);
    console.log(userText)

    collectionContainer.appendChildren([title, userText]);

    if (collection.movies.length > 0) {
        const movieCount = createElement('p',).appendChildren(`Contain ${collection.movies.length} movies` )
        collectionContainer.appendChild(movieCount);
    } else {
        const noMovies = createElement('p').appendChildren(`No movie yet` )
        collectionContainer.appendChild(noMovies);
    }

    // let urltest = buildUrl('delete_collection', { 'idCollection': collection.idCollection })

    // console.log(urltest)

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
    editBtn.addEventListener('click', ()=>createEditCollectionForm(editBtn))
    form.replaceWith(collectionContainer)

};

export const createAddMovieForm = (btn) => {
    let container = document.querySelector('.movieCardsContainer')
    let idCollection = btn.dataset.collection
    let form = createElement(
        'form',
        {
            class : 'movieCardsContainer-movieCard',
            enctype :'multipart/form-data',
            'data-ajax' : btn.dataset.ajax,
        },
        {'submit' : (e)=> {
                e.preventDefault();
                addMovieEvent(form);}}

            ).appendChildren(
                [
                createElement(
                    'input',
                    {
                        type : 'text',
                        name : 'movieTitle',
                        id : 'movieTitle',
                        placeholder : "Movie Title" }),
                createElement(
                    'input',
                    {
                        type : 'number',
                        name : 'releaseYear',
                        id : 'releaseYear',
                        placeholder : "Release year"}),
                createElement(
                    'input',
                    {
                        type : 'number',
                        name : 'movieRating',
                        id : 'movieRating',
                        placeholder : 'Movie rating'
                    }),
                createElement(
                    'textarea',
                    {
                        name : 'movieSummary',
                        id : 'movieSummary',
                        placeholder : 'movie Summary'
                    }),
                createElement(
                    'input',
                    {
                        type : 'file',
                        name : 'movieImg',
                        id : 'movieImg',
                        placeholder : 'Movie poster'
                    }),
                createElement(
                    'input',
                    {
                        type : 'checkbox',
                        value : 1,
                        name : 'movieIsFavorite',
                        id : 'movieIsFavorite',
                    }),
                createElement(
                    'input',
                    {
                        type : 'hidden',
                        value : idCollection,
                        name : 'idCollection',
                        id : 'idCollection',
                    }),

                createElement(
                    'button',
                    {
                        type : 'submit',
                    }).appendChildren('Add a new movie'),

            ])


    container.insertBefore(form, container.firstChild)

}

export const addMovieDom = (form, movie) => {

    console.log(form)
    console.log(movie)


    const movieContainer = createElement(
        'div',
        {class:`movieCardsContainer-movieCard movie-${movie.idMovie}`});


    const img = createElement(
        'img',
        {
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
        {id : `movie${movie.idMovie}` }).appendChildren(`${movie.title}`);

    const summary = createElement(
        'p',
    ).appendChildren(`${movie.summary}`)


    const movieMetaContainer =  createElement('div',{class : "movieCardsContainer-movieCard-movieMeta"})
    const userRating = createElement('span', {}).appendChildren(`Rating: ${movie.userRating}`);
    const releasedDate = createElement('span', {}).appendChildren(`released in: ${movie.releaseYear}`);
    const isFavorite = createElement('span', {}).appendChildren(`Is Favorite: ${movie.isFavorite}`);
    const internetRating = createElement('span', {}).appendChildren(`internet rate ${movie.internetRating}`);
    const userText = createElement('span', {}).appendChildren(`internet rate ${movie.internetRating}`);


    movieMetaContainer.append(releasedDate,internetRating,userRating,userText,isFavorite)

    // Add button to delete movie
    // const deleteBtn = createElement(
    //     'button',
    //     {
    //         'data-idMovie': movie.idMovie,
    //         'data-ajax': buildUrl('delete_movie', {'idMovie': movie.idMovie}),
    //         class: 'deleteMovie-btn',
    //         type: 'button'
    //     },
    // ).appendChildren([createElement('i', {class: "fa-solid fa-trash"})]);
    // movieContainer.appendChild(deleteBtn);
    //
    // // Add button to edit movie
    // const editBtn = createElement(
    //     'button',
    //     {
    //         'data-idMovie': movie.idMovie,
    //         'data-ajax': buildUrl('edit_movie', {'idMovie': movie.idMovie}),
    //         class: 'editMovie-btn',
    //         type: 'button'
    //     }).appendChildren([createElement('i', {class: "fa-solid fa-pen"})])
    // movieContainer.appendChild(editBtn);
    //
    // const viewBtn = createElement('a', { href: buildUrl('view_movie', { 'id': movie.idMovie }) });
    // const viewBtnInner = createElement('button', {
    //     'data-idMovie': movie.idMovie,
    //     class: 'viewMovie-btn',
    //     type: 'button'
    // }).appendChildren('View Movie');
    //
    // viewBtn.appendChild(viewBtnInner);
    // movieContainer.appendChild(viewBtn);
    // movieContainer.appendChild(deleteBtn);
    //
    //
    // deleteBtn.addEventListener('click',()=>deleteMovieEvent(deleteBtn))
    // editBtn.addEventListener('click', ()=>createEditMovieForm(editBtn))
    movieDetails.append(title, summary,movieMetaContainer)
    movieContainer.append(img, movieDetails)
    form.replaceWith(movieContainer)
}


export const searchTmdbDom = (data) => {

    let resultContainer = document.querySelector(".resultContainer");
    // data.forEach(movie => {
    //     console.log(movie)
    //     console.log(movie.title)
    //     console.log(movie.id)
    //     console.log(movie.poster_path)
    //     console.log(movie.overview)
    //     console.log(movie.release_date)
    //     console.log(movie.vote_average)
    // });
    data.forEach(movie => {

        const movieCard = createElement("div", { class: "movie-card" });
        const title = createElement('h3', {}, {}).appendChildren(`${movie.title}`)
        const overview = createElement('p', {}, {}).appendChildren(`${movie.overview}`)
        const poster = movie.poster_path === null ?
            createElement("img", { src: '../public/img/movie_posters/missing.jpg' }) :
            createElement("img", { src: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` });
        const releaseDate = createElement("p" ).appendChildren(`Release date: ${movie.release_date}`);
        const voteAverage = createElement("p", {}, ).appendChildren(`Vote average: ${movie.vote_average}`);
        const addBtn = createElement('button').appendChildren('add to a collection')
        movieCard.appendChildren([
            title,
            poster,
            overview,
            releaseDate,
            voteAverage,
            addBtn,
        ]);
        resultContainer.appendChild(movieCard);
    });
}
