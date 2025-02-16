function getGenreMovies() {
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genreId');
    const genreName = urlParams.get('genreName');
    
    const movieListContainer = document.getElementById('movie-list');
    const genreTitle = document.getElementById('genre-title');
    const genreDescription = document.querySelector('.genre-description');

    genreTitle.textContent = `${genreName} Movies`;
    genreDescription.textContent = `Explore top-rated ${genreName} movies.`;

    const API_KEY = '46795d9f'; // Replace with your OMDb API key

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${genreName}&type=movie`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True' && data.Search) {
                data.Search.forEach(movie => {
                    const movieCard = `
                        <div class="movie-card">
                            <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
                            <div class="movie-info">
                                <h5 class="movie-title">${movie.Title}</h5>
                                <p class="movie-year">${movie.Year}</p>
                            </div>
                        </div>
                    `;
                    movieListContainer.innerHTML += movieCard;
                });
            } else {
                movieListContainer.innerHTML = '<p>No movies found for this genre.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            movieListContainer.innerHTML = '<p>Error loading movies.</p>';
        });
}

document.addEventListener('DOMContentLoaded', getGenreMovies);
