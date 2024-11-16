var movieList = document.getElementById('movieList')

fetch('https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json')
    .then(function (response) {
        if (response.status !== 200) {
            throw Error('unable to fetch data', error)
        }
        return response.text()
    })
    .then(function (text) {
        var data = JSON.parse(text)
        for (let i = 0; i < data.length; i++) {
            var movie = data[i]

            var row = document.createElement('tr')

            var titleCell = document.createElement('td')
            titleCell.textContent = movie.title
            row.appendChild(titleCell);

            var idCell = document.createElement('td')
            idCell.textContent = movie.id;
            row.appendChild(idCell);

            var rankCell = document.createElement('td')
            rankCell.textContent = movie.rank;
            row.appendChild(rankCell);

            movieList.querySelector('tbody').appendChild(row)

        }
    })
    .catch(function (err) {
        movieList.innerHTML = 'Fetch problem: ' + err.message
    })
    .finally(function () {
        console.log('Alls good')
    })

function searchMovie() {
    var searchInput = document.getElementById('searchInput');
    var searchText = searchInput.value.trim().toLowerCase();

    var movieList = document.getElementById('movieList');
    var rows = movieList.getElementsByTagName('tr');

    var messageElement = document.getElementById('message');
    var message = 'Movie is not on the list';

    var matchFound = false;

    for (var i = 0; i < rows.length; i++) {
        var titleCell = rows[i].getElementsByTagName('td')[0];
        var rankCell = rows[i].getElementsByTagName('td')[2];

        if (!titleCell || !rankCell) {
            continue;
        }

        var title = titleCell.textContent.trim().toLowerCase();
        var rank = rankCell.textContent.trim().toLowerCase();

        if (title.includes(searchText) || rank.includes(searchText)) {
            message = 'Movie Rank: ' + rankCell.textContent;
            matchFound = true;
            break;
        }
    }

    if (!matchFound) {
        messageElement.textContent = message;
    } else {
        messageElement.textContent = message;
    }
}

var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchMovie);








