import {createElement, buildUrl,} from "./utilities.js";
import {
    editMovieEvent,
    editCollectionEvent,
    addCollectionEvent,
    deleteMovieEvent,
    deleteCollectionEvent
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