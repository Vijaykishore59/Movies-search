const API_KEY = '46795d9f';

// Elements
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieDetails = document.getElementById('movieDetails');

// Fetch Movie Data
searchBtn.addEventListener('click', () => {
    const movieName = movieInput.value.trim();
    if (movieName) {
        displayLoading();
        fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => displayMovieDetails(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                showError('An error occurred while fetching data. Please try again.');
            });
    } else {
        alert('Please enter a movie name!');
    }
});

// Display Loading Spinner
function displayLoading() {
    movieDetails.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    movieDetails.style.display = "block";
}

// Display Movie Details
function displayMovieDetails(data) {
    if (data.Response === "True") {
        movieDetails.innerHTML = `
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.Poster}" alt="${data.Title} Poster" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.Title} (${data.Year})</h5>
                            <p class="card-text"><strong>Genre:</strong> ${data.Genre}</p>
                            <p class="card-text"><strong>Director:</strong> ${data.Director}</p>
                            <p class="card-text"><strong>Actors:</strong> ${data.Actors}</p>
                            <p class="card-text"><strong>Plot:</strong> ${data.Plot}</p>
                            <p class="card-text"><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        movieDetails.style.display = "block";
    } else {
        showError('Movie not found!');
    }
}

// Show Error Message
function showError(message) {
    movieDetails.innerHTML = `<p class="text-danger">${message}</p>`;
    movieDetails.style.display = "block";
}

