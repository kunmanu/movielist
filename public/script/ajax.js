console.log('hey')

let deleteListBtn = document.querySelectorAll('.deleteList-btn')
// let deleteMovieBtn = document.querySelectorAll('.deleteMovie-btn')


deleteListBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        fetch('../controllers/delete_list.php', {
            method: 'DELETE',
            body: JSON.stringify({
                id: btn.dataset.id
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
                } else {
                    document.querySelector(`.list-${data.id}`).remove();
                }
            })
            .catch(err => console.log(err));
    });
});
