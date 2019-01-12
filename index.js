
function getList(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => {
            if (response.ok) {
                $('#js-error-message').text("")
                return response.json();
            }
            throw new Error (response.status);
        })
        .then(responseJSON => displayList(responseJSON))
        .catch(err =>{
            $('#js-error-message').text(`Something went wrong: ${err.message}`)
        })
}

function watchForm() {
    $('form').submit(function(event){
        event.preventDefault();
        getList($('#js-search-user').val())
    })
}

function displayList(results) {
    console.log(results)
    $('#results-list').empty();
    $('h2').replaceWith(`
        <h2>User <a href="https://github.com/${$('#js-search-user').val()}">${$('#js-search-user').val()}</a> has <span>${results.length}</span> repositories</h2>
    `)
    results.forEach(repo =>{
        $('#results-list').append(`
            <li><a href="${repo.url}">${repo.name}</a></li>
        `)
    })
    $('#results').removeClass('hidden');
}

$(
    function(){
        watchForm();
    }
)