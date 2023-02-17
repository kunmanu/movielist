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

export const ajaxEditMovie = (ajaxUrl, movie_name, summary, poster, releaseYear,  userRating, idMovie) => {
    let params = new URLSearchParams();
    params.append('movie_name', movie_name);
    params.append('summary', summary);
    params.append('poster', poster);
    params.append('releaseYear', releaseYear);
    // params.append('internetRating', internetRating);
    params.append('userRating', userRating);
    params.append('idMovie', idMovie);

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
};


export  function ajaxEditCollection(ajaxUrl, name, description) {

    let params = new URLSearchParams();
    params.append("collection_name", name);
    params.append("collection_description", description);

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
    // params.append("collection_isFavorite",isFav );


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

export async function fetchMovieDataFromTmdb(movieId) {
    const response = await fetch(buildUrl('tmdb_get_one_movie', {'id': movieId}));
    return response.json();
}

export async function fetchMovieDataLocal(movieId) {
    const response = await fetch(buildUrl('get_one_movie', {'id': movieId}));
    return response.json();
}

export async function fetchCollectionData(collectionId) {
    const response = await fetch(buildUrl('get_one_collection', {'id': collectionId }));
    return response.json();
}