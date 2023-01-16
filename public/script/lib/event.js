import {editMovieDom, editCollectionDom, deleteCollectionDom} from "./dom.js";
import {ajaxDeleteCollection, ajaxEditCollection, ajaxEditMovie} from "./ajax.js";


export const deleteCollectionEvent = async (btn) => {
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


