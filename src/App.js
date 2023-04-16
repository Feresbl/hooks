import React, { useState } from "react";


function MovieCard({ title, description, posterURL, rating }) {
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={posterURL} alt={title} />
      <p>{`Rating: ${rating}`}</p>
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.title} {...movie} />
      ))}
    </div>
  );
}

function Filter({ onFilterChange }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
    onFilterChange({ title: event.target.value, rating: ratingFilter });
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
    onFilterChange({ title: titleFilter, rating: event.target.value });
  };

  return (
    <div className="filter">
      <label>
        Title:
        <input type="text" value={titleFilter} onChange={handleTitleFilterChange} />
      </label>
      <label>
        Rating:
        <input type="text" value={ratingFilter} onChange={handleRatingFilterChange} />
      </label>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([
    {
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL:
      "C:\Users\Fares\Desktop\react\hooks\hooks\download (1).jpg",
      rating: 8.8
    },
    {
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL:
      "C:\Users\Fares\Desktop\react\hooks\hooks\download .jpg",
      rating: 9.0
    }
  ]);

  const [filter, setFilter] = useState({ title: "", rating: "" });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      (filter.rating === "" || movie.rating >= parseFloat(filter.rating))
    );
  });

  const handleAddMovie = () => {
    const title = prompt("Enter movie title:");
    const description = prompt("Enter movie description:");
    const posterURL = prompt("Enter movie poster URL:");
    const rating = parseFloat(prompt("Enter movie rating (out of 10):"));
    const newMovie = { title, description, posterURL, rating };
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="app">
      <h1>Movie List</h1>
      <Filter onFilterChange={handleFilterChange} />
      <button onClick={handleAddMovie}>Add Movie</button>
      <MovieList movies={filteredMovies}/>  </div>
);
}

export default App;