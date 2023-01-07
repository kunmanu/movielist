console.log('hey')

let deleteListBtn = document.querySelectorAll('.deleteList-btn')
let deleteMovieBtn = document.querySelectorAll('.deleteMovie-btn')


deleteListBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.dataset.idlist)
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

deleteMovieBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        fetch('../controllers/delete_movie.php', {
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