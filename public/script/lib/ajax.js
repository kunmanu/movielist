import {buildUrl} from "./utilities.js";


export function ajaxDeleteMovie(ajaxUrl){
    return fetch(ajaxUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export function ajaxDeleteMovieFromCollection(ajaxUrl) {

    return fetch(ajaxUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export function ajaxDeleteCollection(ajaxUrl){

     return fetch(ajaxUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export function ajaxEditMovie(ajaxUrl, newName){

    let params = new URLSearchParams();
    params.append("movie_name", newName);

    let request = ajaxUrl + `&${params.toString()}`;
    return fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export  function ajaxEditCollection(ajaxUrl, newName) {

    let params = new URLSearchParams();
    params.append("collection_name", newName);

    let request = ajaxUrl + `&${params.toString()}`;
    return fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.log(error);
        });

}

export function ajaxAddCollection (ajaxUrl, title, description, isFav) {

    let params = new URLSearchParams();
    params.append("collection_name", title);
    params.append("collection_description", description);
    params.append("collection_isFavorite",isFav );


    let request = ajaxUrl + `&${params.toString()}`;

    console.log(request)
    return fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                return data;
            }
        })
        .catch(error => {
            console.log(error);
        });

}

export const ajaxAddMovie = async (
    ajaxUrl,
    title,
    summary,
    rating,
    imgPath,
    releaseYear,
    movieGenre,
    idCollection
) => {
    try {
        let params = new URLSearchParams();
        params.append("movieTitle", title);
        params.append("movieSummary", summary);
        params.append("movieRating", rating);
        params.append("movieImg", imgPath);
        params.append("movieGenre", movieGenre)
        params.append("idCollection", idCollection);
        params.append('releaseYear',releaseYear)

        let request = ajaxUrl + `&${params.toString()}`;


        console.log(request)

        return fetch(request)
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    return data;
                }
            }).catch(error => {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
    }
};


export function uploadImg(img) {
    // Create a new FormData object
    let formData = new FormData();
    // Append the file to the FormData object
    formData.append("poster", img);


    return fetch('../controllers/upload_img.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data.path;
        })
        .catch(error => {
            console.log(error);
        });
}


export function searchTmdbAjax(searchString){
    let formData = new FormData()
    formData.append('searchString', searchString)
    return fetch('../controllers/tmdb_search.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            return data
        })
        .catch(error => {
            console.log(error);
        });
}

export async function fetchMovieData(movieId) {
    const response = await fetch(buildUrl('tmdb_get_one_movie', {'id': movieId}));
    return response.json();
}

