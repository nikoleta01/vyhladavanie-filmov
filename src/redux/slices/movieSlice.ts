import { MovieState, MovieType } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: null,
  page: 1,
  title: "",
  totalPages: 0,
  imdbId: "",
  favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies") || "[]"),
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesStart(
      state,
      action: PayloadAction<{ title: string; page: number }>,
    ) {
      state.loading = true;
      state.error = null;
      state.title = action.payload.title;
      state.page = action.payload.page;
    },
    fetchMoviesSuccess(
      state,
      action: PayloadAction<{ movies: MovieType[]; totalPages: number }>,
    ) {
      state.loading = false;
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    fetchMoviesFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearMovies(state) {
      state.movies = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.title = "";
      state.totalPages = 0;
    },
    addFavoriteMovie(state, action: PayloadAction<MovieType>) {
      const existingMovie = state.favoriteMovies.find(
        (movie) => movie.imdbID === action.payload.imdbID,
      );
      if (!existingMovie) {
        state.favoriteMovies.push(action.payload);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(state.favoriteMovies),
        );
      }
    },
    removeFavoriteMovie(state, action: PayloadAction<{ imdbId: string }>) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== action.payload.imdbId,
      );
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies),
      );
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  addFavoriteMovie,
  clearMovies,
  removeFavoriteMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
