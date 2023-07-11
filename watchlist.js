document.addEventListener("DOMContentLoaded", function () {
  let moviesDisplay = document.getElementById("movies-display");
  let message = document.getElementById("message");
  let watchlist = getWatchlistFromStorage();

  if (watchlist.length > 0) {
    message.style.display = "none";
    for (let movieId of watchlist) {
      fetchMovieData(movieId);
    }
  }

  function fetchMovieData(movieId) {
    const url = `https://www.omdbapi.com/?apikey=49653bc0&i=${movieId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        moviesDisplay.innerHTML += `
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
                <img class="remove-icon" id="remove-icon"src="image/minus-Icon.png">
                <p>Remove</p>
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

  function getWatchlistFromStorage() {
    const watchlistData = localStorage.getItem("watchlist");
    return watchlistData ? JSON.parse(watchlistData) : [];
  }

  moviesDisplay.addEventListener("click", function (event) {
    if (event.target.id === "remove-icon") {
      const movieData = event.target.closest("#movie-data");
      const movieId = movieData.getAttribute("data-movie-id");
      removeFromWatchlist(movieId);
      movieData.remove(); // Remove the movie data from the watchlist display
    }
  });

  function removeFromWatchlist(movieId) {
    let watchlist = getWatchlistFromStorage();
    const index = watchlist.indexOf(movieId);
    if (index !== -1) {
      watchlist.splice(index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Movie removed from watchlist.");
    }
  }
});
