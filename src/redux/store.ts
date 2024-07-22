import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import movieReducer from "./slices/movieSlice";
import movieDetailReducer from "./slices/movieDetailSlice";
import { moviesSaga } from "./sagas/movieSaga";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetail: movieDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(moviesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
