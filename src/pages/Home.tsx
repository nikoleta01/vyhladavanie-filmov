import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieState } from "../redux/types";
import { fetchMoviesStart } from "../redux/slices/movieSlice";
import { IoIosSearch } from "react-icons/io";
import "./Home.scss";
import MovieList from "../components/MovieList";

const Home = () => {
  const dispatch = useDispatch();
  const [searchTitle, setSearchTitle] = useState("");

  const { movies, loading, error } = useSelector(
    (state: { movies: MovieState }) => state.movies,
  );

  const handleSearch = () => {
    if (searchTitle.length > 0) {
      dispatch(fetchMoviesStart({ title: searchTitle, page: 1 }));
    }
  };

  return (
    <div className="Home">
      <h2 className="Home-title">Find your movie</h2>
      <div className="Home-search-container">
        <input
          type="search"
          className="Home-search-input"
          placeholder="Movie name"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <IoIosSearch size={20}></IoIosSearch>
        </button>
      </div>
      {error && <p>Pal do cice</p>}
      <MovieList loading={loading} movies={movies} error={error}></MovieList>
    </div>
  );
};

export default Home;
