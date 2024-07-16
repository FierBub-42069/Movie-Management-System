import axios from "axios";

const API_URL = "http://localhost:7000";

// Functions exported for API usage, to fetch data from database
export const getMovies = () => axios.get(`${API_URL}/movies`);
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getLanguages = () => axios.get(`${API_URL}/languages`);
export const getMovieById = (id) => axios.get(`${API_URL}/movies/${id}`);
export const addMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (movie, id) => axios.put(`${API_URL}/movies/${id}`, movie)
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);