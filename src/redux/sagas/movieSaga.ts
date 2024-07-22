import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../slices/movieSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { fetchMovieDetail, fetchMovies } from "../../api/omdbApi";
import {
  fetchMovieDetailFailure,
  fetchMovieDetailStart,
  fetchMovieDetailSuccess,
} from "../slices/movieDetailSlice";
import movieDetail from "../../pages/MovieDetail";

interface FetchMoviesStartPayload {
  title: string;
  page: number;
}

function* fetchMoviesSaga(
  action: PayloadAction<FetchMoviesStartPayload>,
): SagaIterator {
  try {
    const { title, page } = action.payload;
    const data = yield call(fetchMovies, title, page);
    if (data.Response === "True") {
      yield put(
        fetchMoviesSuccess({
          movies: data.Search,
          totalPages: data.totalResults,
        }),
      );
    } else {
      yield put(fetchMoviesFailure(data.Error));
    }
  } catch (error) {
    yield put(fetchMoviesFailure({ error: error as string }));
  }
}

function* fetchMovieDetailSaga(
  action: PayloadAction<{ imdbId: string }>,
): SagaIterator {
  try {
    const { imdbId } = action.payload;
    const data = yield call(fetchMovieDetail, imdbId);
    if (data.Response === "True") {
      yield put(fetchMovieDetailSuccess({ movieDetail: data }));
    } else {
      yield put(fetchMovieDetailFailure({ error: data.Error }));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchMovieDetailFailure({ error: error as string }));
  }
}

export function* moviesSaga() {
  yield takeLatest(fetchMoviesStart.type, fetchMoviesSaga);
  yield takeLatest(fetchMovieDetailStart.type, fetchMovieDetailSaga);
}
