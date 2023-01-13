
console.log('main.js');




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
//
//
//
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



//////////DELETE LIST

let deleteListBtn = document.querySelectorAll('.deleteList-btn')
deleteListBtn.forEach(btn => {
    btn.addEventListener('click',  async () => {

        let ajaxUrl = btn.dataset.ajax
        let response = await fetch(ajaxUrl);
        let data = await response.json();

        if (data.success === true) {
            document.querySelector(`.list-${data.id}`).remove();
        }

    });
});

/////DELETE MOVIE FROM LIST
let deleteFromListMovieBtn = document.querySelectorAll('.deleteMovieFromList-btn')
if (deleteFromListMovieBtn) {
    deleteFromListMovieBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            let ajaxUrl = btn.dataset.ajax
            console.log(ajaxUrl)

            let response = await fetch(ajaxUrl);
            let data = await response.json();

            if (data.success === true) {
                console.log(data)
                document.querySelector(`.movie${data.idMovie}-list${data.idList}`).remove();
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
        p.id = `movie${data.id_movie}`;
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
    let ajaxUrl =  btn.dataset.ajax
    console.log(ajaxUrl)
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

    form.setAttribute('data-ajax', ajaxUrl)

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

async function ajaxEditList(form) {

    let newName = form.name.value;

    let params = new URLSearchParams();
    params.append("list_name", newName);
    let ajaxUrl = form.dataset.ajax + `&${params.toString()}`;
    console.log(ajaxUrl)
    let response = await fetch(ajaxUrl);
    let data = await response.json();

    if (data.success === true) {
        console.log(data)
        let h3 = document.createElement("h3");
        h3.textContent = data.name;
        h3.id = `list-${data.id_list}`;
        form.replaceWith(h3);
    }


    // Use the fetch API to send a PUT request to the edit_list.php file
    // fetch("../controllers/edit_list.php", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         id_list: idList,
    //         list_name: newName,
    //     }),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         let h3 = document.createElement("h3");
    //         h3.textContent = data.name;
    //         h3.id = `list-${data.id_list}`;
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