

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