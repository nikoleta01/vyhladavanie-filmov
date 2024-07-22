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
  favoriteMovies: [],
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
    addFavoriteMovie(state, action: PayloadAction<{ imdbId: string }>) {
      if (!state.favoriteMovies.includes(action.payload.imdbId)) {
        state.favoriteMovies.push(action.payload.imdbId);
      }
    },
    /*removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (id) => id !== action.payload.,
      );
    },*/
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  addFavoriteMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
