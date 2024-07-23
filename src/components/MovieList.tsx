import Pagination from "react-bootstrap/Pagination";
import { HiOutlineInbox } from "react-icons/hi2";
import Movie from "../components/Movie";
import "./MovieList.scss";
import { MovieType } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesStart } from "../redux/slices/movieSlice";
import { Link } from "react-router-dom";

interface MovieListProps {
  loading: boolean;
  movies: MovieType[];
  error: string | null;
}

const MovieList = ({ loading, movies }: MovieListProps) => {
  const dispatch = useDispatch();
  const { totalPages, page, title } = useSelector(
    (state: {
      movies: {
        totalPages: number;
        page: number;
        title: string;
      };
    }) => ({
      totalPages: state.movies.totalPages,
      page: state.movies.page,
      title: state.movies.title,
    }),
  );

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMoviesStart({ title, page: newPage }));
  };

  return (
    <div className="MovieList">
      {loading ? (
        <div>Loading...</div>
      ) : movies && movies.length > 0 ? (
        <div>
          <ul>
            {movies.map((movie, index) => (
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
          <Pagination className="MovieList-pagination">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      ) : (
        <div>
          <HiOutlineInbox fontSize="8rem" color="#dcdcdc" />
          <p className="MovieList-paragraph">No data.</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
