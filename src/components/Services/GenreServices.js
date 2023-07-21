import axios from 'axios';
const Genre_API_BASE_URL ="http://localhost:8080/api/genre";
class GenreServices {

    getGenre(){
    return axios.get(Genre_API_BASE_URL);
    }
    deleteGenre(genreId){
        return axios.delete(Genre_API_BASE_URL+'/'+genreId)
    }

}

export default new GenreServices();