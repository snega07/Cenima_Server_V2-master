import axios from 'axios';
const Review_API_BASE_URL1 = "http://localhost:8080/api/reviews";
const Review_API_BASE_URL2 = "http://localhost:8080/api/reviews";
const Review_API_BASE_URL3 = "http://localhost:8080/user/reviews";
class ReviewService {

    getReview(movieId) {
        return axios.get(Review_API_BASE_URL1 + '/' + movieId);
    }
    deleteReview(reviewId) {
        return axios.delete(Review_API_BASE_URL2 + '/' + reviewId)
    }
    postReview(movieId, review) {
       /* const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }*/
        return axios.post(Review_API_BASE_URL2 + '/' + movieId, review);
    }
    putReview(reviewId, review) {
        /* const config = {
             headers: {
                 'Authorization': `Bearer ${token}`
             }
         }*/
         return axios.put(Review_API_BASE_URL2 + '/' + reviewId, review);
     }

     getSpecificReviews(userId){
        return axios.get(Review_API_BASE_URL1+'/specific/'+userId);
     }

}

export default new ReviewService();
