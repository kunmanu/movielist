
console.log('main.js');




// const viewCollectionButtons = document.querySelectorAll('.viewCollection-btn');
// if (viewCollectionButtons) {
//     viewCollectionButtons.forEach(btn =>{
//     btn.addEventCollectionener('click', function(event) {
//         let idCollection = event.target.dataset.idcollection;
//         // window.location.assign(`/public/index.php?page=view_collection`, '_blank');
//         fetch(`/public/index.php?page=view_collection`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 id : idCollection
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.success) {
//                     window.location.assign(`/public/index.php?page=view_collection.php?id=${idCollection}`, '_blank');
//                 }
//             })
//             .catch(err => console.error(err));
//     });
//
//     })
//
// }
//
//
//
//
// const viewMovieButtons = document.querySelectorAll('.viewMovie-btn');
// if (viewMovieButtons) {
//     viewMovieButtons.forEach(btn =>{
//         btn.addEventCollectionener('click', function(event) {
//             let idMovie = event.target.dataset.idmovie;
//             window.location.assign(`view_movie.php?&id=${idMovie}`, '_blank');
//         });
//
//     })
//
// }
//
//
// let viewMovieBtn = document.querySelector('.viewMovie-btn');
//
// if (viewMovieBtn) {
//     viewMovieBtn.addEventCollectionener('click', function(event) {
//         let idMovie = event.target.dataset.idmovie;
//         window.location.assign(`view_movie.php?&id=${idMovie}`, '_blank');
//     });
// }



//////////DELETE LIST

let deleteCollectionBtn = document.querySelectorAll('.deleteCollection-btn')
deleteCollectionBtn.forEach(btn => {
    btn.addEventListener('click',  async () => {

        let ajaxUrl = btn.dataset.ajax
        let response = await fetch(ajaxUrl);
        let data = await response.json();

        if (data.success === true) {
            document.querySelector(`.collection-${data.id}`).remove();
        }

    });
});

/////DELETE MOVIE FROM LIST
let deleteFromCollectionMovieBtn = document.querySelectorAll('.deleteMovieFromCollection-btn')
if (deleteFromCollectionMovieBtn) {
    deleteFromCollectionMovieBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            let ajaxUrl = btn.dataset.ajax
            console.log(ajaxUrl)

            let response = await fetch(ajaxUrl);
            let data = await response.json();

            if (data.success === true) {
                console.log(data)
                document.querySelector(`.movie${data.idMovie}-collection${data.idCollection}`).remove();
            }
        });
    });
}


let editMovieButtons = document.querySelectorAll(".editMovie-btn");


///////EDIT MOVIE
editMovieButtons.forEach((btn) => {
    btn.addEventListener("click", () => openMovieForm(btn));
});

async function ajaxEditMovie(form) {
    // Get the id of the movie.phtml to be edited and the new title from the form
    let newName = form.title.value;
    console.log(newName)
    let params = new URLSearchParams();
    params.append("movie_name", newName);
    let ajaxUrl = form.dataset.ajax + `&${params.toString()}`;
    console.log(ajaxUrl)
    let response = await fetch(ajaxUrl);
    let data = await response.json();

    if (data.success === true) {
        console.log(data)
        let p = document.createElement("p");
        p.textContent = data.name;
        p.id = `movie${data.idMovie}`;
        form.replaceWith(p);
    }
}

let openMovieForm = (btn) => {
    // Get the movie.phtml title element and the movie.phtml title
    let idMovie = btn.dataset.idmovie;
    let movieTitleElement = document.getElementById(`movie${idMovie}`);
    let movieTitle = movieTitleElement.textContent;
    ajaxUrl = btn.dataset.ajax

    // Create the form element
    let form = document.createElement("form");
    form.classList.add("update-movie.phtml-form");

    // Create the input element for the movie.phtml title
    let input = document.createElement("input");
    input.type = "text";
    input.name = "title";
    input.value = movieTitle;

    // Create the hidden input element for the movie.phtml id
    let idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "id";
    idInput.value = idMovie;

    // Create the submit button
    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "ok";
    form.setAttribute('data-ajax', ajaxUrl)

    // Add an event collectionener to the submit button that calls the ajaxEditMovie function when the form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        ajaxEditMovie(form);
    });

    // Add the input and submit button to the form
    form.append(input, idInput, submitButton);

    // Replace the movie.phtml title element with the form
    movieTitleElement.replaceWith(form);
};

///////EDIT LIST
let updateCollectionButtons = document.querySelectorAll(".editCollection-btn")
updateCollectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => openCollectionForm(btn));
});


let openCollectionForm = (btn) => {
    // Get the collection name element and the collection name
    let idCollection = btn.dataset.idcollection;
    let ajaxUrl =  btn.dataset.ajax
    console.log(ajaxUrl)
    let collectionNameElement = document.querySelector(`.collection-${idCollection} h3`);
    let collectionName = collectionNameElement.textContent;

    // Create the form element
    let form = document.createElement("form");
    form.classList.add("update-collection-form");

    // Create the input element for the collection name
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.value = collectionName;

    // Create the hidden input element for the collection id
    let idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "id";
    idInput.value = idCollection;


    // Create the submit button
    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "ok";

    form.setAttribute('data-ajax', ajaxUrl)

    // Add an event collectionener to the submit button that calls the ajaxEditCollection function when the form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        ajaxEditCollection(form);


    });

    // Add the input and submit button to the form
    form.append(input, idInput, submitButton);

    // Replace the collection name element with the form
    collectionNameElement.replaceWith(form);

};

async function ajaxEditCollection(form) {

    let newName = form.name.value;

    let params = new URLSearchParams();
    params.append("collection_name", newName);
    let ajaxUrl = form.dataset.ajax + `&${params.toString()}`;
    console.log(ajaxUrl)
    let response = await fetch(ajaxUrl);
    let data = await response.json();

    if (data.success === true) {
        console.log(data)
        let h3 = document.createElement("h3");
        h3.textContent = data.name;
        h3.id = `collection-${data.idCollection}`;
        form.replaceWith(h3);
    }


    // Use the fetch API to send a PUT request to the edit_collection.php file
    // fetch("../controllers/edit_collection.php", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         idCollection: idCollection,
    //         collection_name: newName,
    //     }),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         let h3 = document.createElement("h3");
    //         h3.textContent = data.name;
    //         h3.id = `collection-${data.idCollection}`;
    //         form.replaceWith(h3);
    //     });

}


////////DELETE MOVIE

let deleteMovieButtons = document.querySelectorAll(".deleteMovie-btn")

deleteMovieButtons.forEach((btn)=>{
    btn.addEventListener('click',async (e) => {
        let ajaxUrl = btn.dataset.ajax
        console.log(ajaxUrl)
        let response = await fetch(ajaxUrl);

        let data = await response.json();

        if (data.success === true) {
            console.log(data)
            let p= document.createElement('p')
            p.textContent = 'film supprimé'
            document.querySelector(`.movie${data.idMovie}`).replaceWith(p);
        }
    });
    }
)