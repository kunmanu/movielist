
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