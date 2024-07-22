import { MovieDetailState, MovieDetailType } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MovieDetailState = {
  loading: false,
  movieDetail: {
    Actors: [],
    Awards: [],
    BoxOffice: "",
    Country: "",
    DVD: "",
    Director: "",
    Genre: "",
    Language: "",
    Metascore: "",
    Plot: "",
    Poster: "",
    Production: "",
    Released: "",
    Runtime: "",
    Title: "",
    imdbID: "",
    imdbRating: "",
    imdbVotes: "",
    Rated: "",
    Ratings: [],
    Year: "",
    Type: "",
    Website: "",
  },
  error: null,
  imdbId: "",
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    fetchMovieDetailStart(state, action: PayloadAction<{ imdbId: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchMovieDetailSuccess(
      state,
      action: PayloadAction<{ movieDetail: MovieDetailType }>,
    ) {
      state.loading = false;
      state.movieDetail = action.payload.movieDetail;
    },
    fetchMovieDetailFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchMovieDetailStart,
  fetchMovieDetailSuccess,
  fetchMovieDetailFailure,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
