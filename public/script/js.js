/*TODO:
* casser le fichier en plusieur fichier et gerer les include
*
* */


console.log('js.js');


//VIEW LIST

// const viewListButtons = document.querySelectorAll('.viewList-btn');
// if (viewListButtons) {
//     viewListButtons.forEach(btn =>{
//     btn.addEventListener('click', function(event) {
//         let idList = event.target.dataset.idlist;
//         // window.location.assign(`/public/index.php?page=view_list`, '_blank');
//         fetch(`/public/index.php?page=view_list`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 id : idList
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.success) {
//                     window.location.assign(`/public/index.php?page=view_list.php?id=${idList}`, '_blank');
//                 }
//             })
//             .catch(err => console.error(err));
//     });
//
//     })
//
// }
//

//VIEW MOVIE

// const viewMovieButtons = document.querySelectorAll('.viewMovie-btn');
// if (viewMovieButtons) {
//     viewMovieButtons.forEach(btn =>{
//         btn.addEventListener('click', function(event) {
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
//     viewMovieBtn.addEventListener('click', function(event) {
//         let idMovie = event.target.dataset.idmovie;
//         window.location.assign(`view_movie.php?&id=${idMovie}`, '_blank');
//     });
// }





//DELETE LIST
let deleteListBtn = document.querySelectorAll('.deleteList-btn')
deleteListBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        fetch('../controllers/delete_list.php', {
            method: 'DELETE',
            body: JSON.stringify({
                idList: btn.dataset.idlist
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    console.log(data.id)
                    document.querySelector(`.list-${data.id}`).remove();
                } else {

                }
            })
            .catch(err => console.log(err));
    });
});

///////DELETE MOVIE FROM LIST
let deleteFromListMovieBtn = document.querySelectorAll('.deleteMovieFromList-btn')
if (deleteFromListMovieBtn) {
    deleteFromListMovieBtn.forEach(btn => {
        btn.addEventListener('click', () => {

            fetch('../controllers/delete_movie_from_list.php', {
                method: 'DELETE',
                body: JSON.stringify({
                    id_list: btn.dataset.idlist,
                    id_movie: btn.dataset.idmovie
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        // console.log(data)
                        let itemToRemove = document.querySelector(`.movie${data.idMovie}-list${data.idList}`)
                        console.log(itemToRemove)
                        itemToRemove.remove();
                    }
                })
                .catch(err => console.error(err));
        });
    });
}


let updateMovieButtons = document.querySelectorAll(".updateMovie-btn");


///////EDIT MOVIE
updateMovieButtons.forEach((btn) => {
    btn.addEventListener("click", () => openMovieForm(btn));
});

function ajaxEditMovie(form) {
    // Get the id of the movie.phtml to be edited and the new title from the form
    let idMovie = form.id.value;

    let newTitle = form.title.value;

    // Use the fetch API to send a PUT request to the edit_movie.php file
    fetch("../controllers/edit_movie.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_movie: idMovie,
            title: newTitle
        })
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response data here
            console.log(data);
            let p = document.createElement("p");
            p.textContent = data.name;
            p.setAttribute('id',`${data.id_movie}`) ;
            form.replaceWith(p);
        });
}

let openMovieForm = (btn) => {
    // Get the movie.phtml title element and the movie.phtml title
    let idMovie = btn.dataset.idmovie;
    let movieTitleElement = document.getElementById(`movie${idMovie}`);
    let movieTitle = movieTitleElement.textContent;

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

    // Add an event listener to the submit button that calls the ajaxEditMovie function when the form is submitted
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
let updateListButtons = document.querySelectorAll(".editList-btn")
updateListButtons.forEach((btn) => {
    btn.addEventListener("click", () => openListForm(btn));
});


let openListForm = (btn) => {
    // Get the list name element and the list name
    let idList = btn.dataset.idlist;
    let listNameElement = document.querySelector(`.list-${idList} h3`);
    let listName = listNameElement.textContent;

    // Create the form element
    let form = document.createElement("form");
    form.classList.add("update-list-form");

    // Create the input element for the list name
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.value = listName;

    // Create the hidden input element for the list id
    let idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "id";
    idInput.value = idList;

    // Create the submit button
    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "ok";

    // Add an event listener to the submit button that calls the ajaxEditList function when the form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        ajaxEditList(form);


    });

    // Add the input and submit button to the form
    form.append(input, idInput, submitButton);

    // Replace the list name element with the form
    listNameElement.replaceWith(form);

};

function ajaxEditList(form) {
    // Get the id of the list to be edited and the new name from the form
    let idList = form.id.value;
    let newName = form.name.value;

    // Use the fetch API to send a PUT request to the edit_list.php file
    fetch("../controllers/edit_list.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_list: idList,
            list_name: newName,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let h3 = document.createElement("h3");
            h3.textContent = data.name;
            h3.id = `list-${data.id_list}`;
            form.replaceWith(h3);
        });

}


////////DELETE MOVIE

let deleteMovieButtons = document.querySelectorAll(".deleteMovie-btn")

deleteMovieButtons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log(btn.dataset)
        fetch('../controllers/delete_movie.php', {
            method: 'DELETE',
            body: JSON.stringify({
                idMovie: btn.dataset.idmovie
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.location.assign(`lists.php`, '_blank');
                } else {

                }
            })
            .catch(err => console.log(err));
    });
    }
)