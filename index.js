const searchBtn = document.getElementById("search-btn");
let renderMovies = document.getElementById("render-movies");

searchBtn.addEventListener("click", function () {
    let searchItem = document.getElementById("search-item");
    fetchMovies(searchItem.value);
});

function fetchMovies(searchItem) {
    const url = `https://www.omdbapi.com/?apikey=49653bc0&s=${encodeURIComponent(searchItem)}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMovies.innerHTML = "";
            let items = data.Search;
            for (let item of items) {
                let movieId = item.imdbID;
                moviesCollection(movieId);
            }
        })
        .catch(error => console.log(error));
}

function moviesCollection(movieId) {
    const url = `https://www.omdbapi.com/?apikey=49653bc0&i=${movieId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMovies.innerHTML += `
            <div id="movie-data" data-movie-id="${movieId}">
            <div id="poster">
                <img src="${data.Poster}">
            </div>

            <div id="head-data">
                <div id="first-line">
                    <h1>${data.Title}</h1>
                    <h4>⭐ ${data.Ratings[0].Value}</h4>
                </div>

                <div id="second-line">
                    <h5>${data.Runtime}</h5>
                    <h5 id="genre">${data.Genre}</h5>
                    <img class="plus-icon" id="plus-icon" src="image/Icon.png">
                    <p>Watchlist<p>
                </div>

                <div id="third-line">
                    <p id="plot">${data.Plot}</p>
                </div>
            </div>

            <div id="line"></div>
        </div>
        `;
        });
}


renderMovies.addEventListener("click", function (event) {
    if (event.target.classList.contains("plus-icon")) {
        const movieData = event.target.closest("#movie-data"); 
        console.log(movieData)
        const movieId = movieData.dataset.movieId;
        addToWatchlist(movieId);
        console.log(movieId);
    }
});

function addToWatchlist(movieId) {
    let watchlist = getWatchlistFromStorage();
    if (watchlist.includes(movieId)) {
        alert("Movie is already in the watchlist.");
        return;
    }

    watchlist.push(movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Movie added to watchlist.");
}
function getWatchlistFromStorage() {
    const watchlistData = localStorage.getItem("watchlist");
    return watchlistData ? JSON.parse(watchlistData) : [];
  }