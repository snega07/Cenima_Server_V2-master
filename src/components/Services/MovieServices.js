import axios from 'axios';
const MOVIE_API_BASE_URL = "http://localhost:8080/api/movies";
const TRENDING_API = "http://localhost:8080/api/trending"
class MovieService {

    getMovies() {
        return axios.get(MOVIE_API_BASE_URL);
    }

    createMovie(movie) {
        return axios.post(MOVIE_API_BASE_URL, movie);
    }

    getMovieById(movieId) {
        return axios.get(MOVIE_API_BASE_URL + '/' + movieId);
    }
    updateMovie(movie, movieId) {
        return axios.put(MOVIE_API_BASE_URL + '/' + movieId, movie);
    }
    deleteMovie(movieId) {
        return axios.delete(MOVIE_API_BASE_URL + '/' + movieId);
    }
    removeGenreFromMovie(genreId, movieId) {
        return axios.put(MOVIE_API_BASE_URL + '/' + genreId + '/' + movieId);
    }
    getMovieByGenre(category) {
        return axios.get(MOVIE_API_BASE_URL + '/search/' + 'genre?category=' + category)

    }
    getMovieByTitle(title) {
        return axios.get(MOVIE_API_BASE_URL + '/search/' + 'title?title=' + title)

    }

    getRecommendation() {
        return axios.get(MOVIE_API_BASE_URL + '/' + 'recommendation')
    }

    addToTrending(movieId) {
        return axios.post(TRENDING_API + '/' + movieId)
    }
    isTrending(movieId) {
        return axios.get(TRENDING_API + '/istrending/' + movieId)
    }
    removeFromTrending(movieId) {
        return axios.delete(TRENDING_API + '/' + movieId)
    }
    getTrending() {
        return axios.get(TRENDING_API);
    }
}

export default new MovieService();
