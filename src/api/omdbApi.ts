import axios from "axios";

const API_KEY = "38a974d3";

export const fetchMovies = async (title: string, page: number = 1) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?s=${title}&page=${page}&apikey=${API_KEY}`,
  );
  return response.data;
};

export const fetchMovieDetail = async (imdbId: string) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
  );
  return response.data;
};
