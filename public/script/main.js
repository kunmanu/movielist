
import {createEditMovieForm, createEditCollectionForm} from "./lib/dom.js";
import {deleteCollectionEvent} from "./lib/event.js";



console.log('main.js');



//////////DELETE COLLECTION

let deleteCollectionBtn = document.querySelectorAll('.deleteCollection-btn')

if (deleteCollectionBtn){
deleteCollectionBtn.forEach(btn => {
    btn.addEventListener('click',  () => {deleteCollectionEvent(btn)});
});

}

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


////////EDIT MOVIE

let editMovieButtons = document.querySelectorAll(".editMovie-btn");

if (editMovieButtons) {
    editMovieButtons.forEach((btn) => {
        btn.addEventListener("click", () => createEditMovieForm(btn));
    });
}




///////EDIT LIST
let updateCollectionButtons = document.querySelectorAll(".editCollection-btn")
updateCollectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => createEditCollectionForm(btn));
});




////////DELETE MOVIE

let deleteMovieButtons = document.querySelectorAll(".deleteMovie-btn")

deleteMovieButtons.forEach((btn)=>{
    btn.addEventListener('click',async () => {
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