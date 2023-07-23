import axios from 'axios';
const Genre_API_BASE_URL ="http://localhost:8080/api/genre";
class GenreServices {

    getGenreForMovie(movieId){
    return axios.get(Genre_API_BASE_URL+'/movie/'+movieId);
    }
    deleteGenre(genreId){
        return axios.delete(Genre_API_BASE_URL+'/'+genreId)
    }

}

export default new GenreServices();