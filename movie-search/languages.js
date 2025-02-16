const OMDB_API_KEY = ''; // Replace with your OMDb API key

function fetchLanguages() {
    const languages = [
        { name: 'English', img: '/assets/language-images/ENGLSIH2.png' },
        { name: 'Spanish', img: '/assets/language-images/SPANISH.png' },
        { name: 'French', img: '/assets/language-images/FRNCH3.png' },
        { name: 'German', img: '/assets/language-images/GERMAN2.png' },
        { name: 'Chinese', img: '/assets/language-images/CHINESE.png' },
        { name: 'Japanese', img: '/assets/language-images/JAPAN.png' },
        { name: 'Hindi', img: '/assets/language-images/hindi.png' },
        { name: 'Telugu', img: '/assets/language-images/telugu.png' }
    ];

    const languageContainer = document.getElementById('languages');
    languageContainer.innerHTML = "";

    languages.forEach(language => {
        const languageCard = document.createElement('div');
        languageCard.classList.add('card', 'language-card', 'm-2');
        languageCard.style.width = "18rem";
        languageCard.style.cursor = "pointer";
        languageCard.innerHTML = `
            <img src="${language.img}" class="card-img-top" alt="${language.name}">
            <div class="card-body">
                <h5 class="card-title">${language.name}</h5>
                <p class="card-text">Click to explore ${language.name} movies.</p>
            </div>
        `;

        // Add click event to fetch movies
        languageCard.onclick = () => fetchMovies(language.name);

        languageContainer.appendChild(languageCard);
    });
}

// Function to fetch movies from OMDb API based on language
function fetchMovies(language) {
    document.getElementById("movieTitle").innerText = `Movies in ${language}`;
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "<p>Loading...</p>"; 

    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${language}&type=movie`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            moviesContainer.innerHTML = "";

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('card', 'm-2');
                    movieCard.style.width = "14rem";
                    movieCard.innerHTML = `
                        <img src="${movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}" class="card-img-top" alt="${movie.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <p class="card-text">Year: ${movie.Year}</p>
                        </div>
                    `;
                    moviesContainer.appendChild(movieCard);
                });
            } else {
                moviesContainer.innerHTML = `<p>No movies found for ${language}.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
            moviesContainer.innerHTML = `<p>Failed to load movies.</p>`;
        });
}

// Initialize the language list on page load
document.addEventListener("DOMContentLoaded", fetchLanguages);
