import { MovieType } from "../redux/types";
import "./Movie.scss";

interface MovieProps {
  movie: MovieType;
}

const Movie = ({ movie }: MovieProps) => {
  return (
    <div className="Movie">
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt="movie poster" className="Movie-poster" />
      ) : (
        <div className="Movie-placeholder"></div>
      )}
      <div className="Movie-wrapper-title-year">
        <p>{movie.Title}</p>
        <p className="Movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default Movie;
