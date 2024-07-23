import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetail.scss";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../redux/slices/movieSlice";
import {
  fetchMovieDetailStart,
  resetMovieDetail,
} from "../redux/slices/movieDetailSlice";
import { MovieDetailState, MovieState } from "../redux/types";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const favoriteMovies = useSelector(
    (state: { movies: MovieState }) => state.movies.favoriteMovies,
  );
  const { movieDetail, loading } = useSelector(
    (state: { movieDetail: MovieDetailState }) => state.movieDetail,
  );

  const handleAddFavorite = () => {
    if (id) {
      dispatch(
        addFavoriteMovie({
          imdbID: id,
          Poster: movieDetail.Poster,
          Year: movieDetail.Year,
          Title: movieDetail.Title,
        }),
      );
    }
  };

  const handleRemoveFavorite = () => {
    if (id) {
      dispatch(removeFavoriteMovie({ imdbId: id }));
    }
  };

  useEffect(() => {
    dispatch(resetMovieDetail());

    if (id) {
      dispatch(fetchMovieDetailStart({ imdbId: id }));
    }
  }, [id, dispatch]);

  const isFavorite = id
    ? favoriteMovies.some((movie) => movie.imdbID === id)
    : false;

  const detailsObject = {
    Actors: movieDetail.Actors,
    Awards: movieDetail.Awards,
    "Box Office": movieDetail.BoxOffice,
    Country: movieDetail.Country,
    DVD: movieDetail.DVD,
    Director: movieDetail.Director,
    Genre: movieDetail.Genre,
    Language: movieDetail.Language,
    Metascore: movieDetail.Metascore,
    Plot: movieDetail.Plot,
    Production: movieDetail.Production,
    Released: movieDetail.Released,
    Ratings: movieDetail.Ratings,
    Rated: movieDetail.Rated,
    Runtime: movieDetail.Runtime,
    Type: movieDetail.Type,
    Website: movieDetail.Website,
    Year: movieDetail.Year,
    "IMDB ID": movieDetail.imdbID,
    "IMDB Rating": movieDetail.imdbRating,
    "IMDB Votes": movieDetail.imdbVotes,
  };

  return (
    <div className="MovieDetail-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="MovieDetail-heading-favorite-wrapper">
            <h1>{movieDetail.Title}</h1>
            {isFavorite ? (
              <IoHeart onClick={handleRemoveFavorite} size={40} />
            ) : (
              <IoHeartOutline onClick={handleAddFavorite} size={40} />
            )}
          </div>
          <hr className="MovieDetail-hr" />
          <div className="MovieDetail-content">
            <img src={movieDetail.Poster} alt="movie poster" />
            <div className="MovieDetail-body">
              {Object.entries(detailsObject).map(([key, value]) => (
                <div className="MovieDetail-row" key={key}>
                  <div className="MovieDetail-label">{key}:</div>
                  {key !== "Ratings" ? (
                    <div className="MovieDetail-value">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  ) : (
                    movieDetail.Ratings &&
                    movieDetail.Ratings.length > 0 && (
                      <div className="MovieDetail-value">
                        {movieDetail.Ratings.map((rating, index) => (
                          <div key={index}>
                            {rating.Source}: {rating.Value}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
