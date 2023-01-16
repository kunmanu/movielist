import {editMovieDom} from "./dom.js";
import {ajaxEditMovie} from "./ajax.js";


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
