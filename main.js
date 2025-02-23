document.addEventListener("DOMContentLoaded", function() {
    filterMovies();
    displaySavedMovies();
});

// Filmlarni ekranga chiqarish funksiyasi
function displayMovies(movieArray) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    if (movieArray.length === 0) {
        movieList.innerHTML = "<p class='text-center text-gray-400'>No movies found.</p>";
        return;
    }

    movieArray.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.classList.add(
            "bg-gray-800", "p-4", "rounded-lg", "shadow-lg", "text-center",
            "w-full", "max-w-xs", "mx-auto" , "forhover"
        );

        movieCard.innerHTML = `
            <img src="./spiderman.jpg" alt="${movie.Title}" class="w-full h-60 object-cover rounded-lg mb-2">
            <h3 class="text-lg font-semibold truncate">${movie.Title}</h3>
            <p class="text-yellow-400 flex items-center justify-center gap-1">
                ⭐ ${movie.imdb_rating}
            </p>
            <p class="text-gray-400 flex items-center justify-center gap-1">
                📅 ${movie.movie_year}
            </p>
            <p class="text-gray-300 truncate">${movie.Categories ? movie.Categories.replace(/\|/g, ", ") : "Unknown Genre"}</p>
            <button onclick='saveMovie(${JSON.stringify(movie)})' class="animated-border mt-2 transition-[0.3s] p-2 bg-green-600 hover:bg-green-700 rounded text-white hover:pr-4 hover:pl-4 ">Save</button>
        `;

        movieList.appendChild(movieCard);
    });
}

// Filmlarni filterlash va saralash funksiyasi
function filterMovies() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let genreValue = document.getElementById("genre-filter").value;
    let sortValue = document.getElementById("sort-filter").value;

    let filteredMovies = movies.filter(movie => {
        let title = movie.Title && typeof movie.Title === "string" ? movie.Title.toLowerCase() : "";
        let titleMatch = title.includes(searchValue);
        let genreMatch = genreValue === "all" || (movie.Categories && movie.Categories.split("|").includes(genreValue));
        return titleMatch && genreMatch;
    });

    if (sortValue === "year") {
        filteredMovies.sort((a, b) => (b.movie_year || 0) - (a.movie_year || 0));
    } else if (sortValue === "rating") {
        filteredMovies.sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0));
    }

    displayMovies(filteredMovies);
}

// Sidebarni ochish va yopish funksiyalari
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}



// LocalStorage-dan saqlangan filmlarni olish
function getSavedMovies() {
    return JSON.parse(localStorage.getItem("savedMovies")) || [];
}

// Saqlangan filmlarni sidebar-ga chiqarish
function displaySavedMovies() {
    const savedMovies = getSavedMovies();
    const sidebarList = document.getElementById("saved-movie-list");
    sidebarList.innerHTML = "";

    if (savedMovies.length === 0) {
        sidebarList.innerHTML = "<p class='text-gray-400 text-center'>No saved movies.</p>";
        return;
    }

    savedMovies.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-lg", "text-center");
        movieCard.innerHTML = `
            <img src="./spiderman.jpg" alt="${movie.Title}" class="w-full h-40 object-cover rounded-lg mb-2">
            <h3 class="text-lg font-semibold">${movie.Title}</h3>
            <p class="text-yellow-400">⭐ ${movie.imdb_rating}</p>
            <p class="text-gray-400">📅 ${movie.movie_year}</p>
            <button onclick='deleteMovie("${movie.imdb_id}")' class="animated-border mt-2 p-2 bg-red-600 hover:bg-red-700 rounded text-white">Delete</button>
        `;
        sidebarList.appendChild(movieCard);
    });
}

// Filmni saqlash funksiyasi
function saveMovie(movie) {
    let savedMovies = getSavedMovies();
    if (!savedMovies.find(m => m.imdb_id === movie.imdb_id)) {
        savedMovies.push(movie);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        displaySavedMovies();
    }
}

// Saqlangan filmni o‘chirish funksiyasi
function deleteMovie(imdb_id) {
    let savedMovies = getSavedMovies().filter(movie => movie.imdb_id !== imdb_id);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    displaySavedMovies();
}
