import axios from 'axios';
const Cast_API_BASE_URL ="http://localhost:8080/api/cast";
class CastServices {

    deleteCast(castId){
        return axios.delete(Cast_API_BASE_URL+ '/' + castId);
    }
   
    getMovieByCast(castName){
        return axios.get(Cast_API_BASE_URL+'/search?castName='+castName)
    }

}

export default new CastServices();