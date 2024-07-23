import "./Favorites.scss";
import { useSelector } from "react-redux";
import { MovieState } from "../redux/types";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
const Favorites = () => {
  const favoriteMovies = useSelector(
    (state: { movies: MovieState }) => state.movies.favoriteMovies,
  );
  return (
    <div className="Favorites-container">
      <h1>Your favorite movies</h1>
      <ul>
        {favoriteMovies.map((movie, index) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="MovieList-link"
          >
            <li key={`movie-${index}`}>
              <Movie movie={movie}></Movie>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
