

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

