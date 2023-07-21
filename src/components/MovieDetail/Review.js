import React, { useEffect, useState } from "react";
import ReviewService from "../Services/ReviewService";
import './MovieDetail.css';
import { FaStar } from 'react-icons/fa';
import { Navigate, useNavigate } from "react-router-dom";
const Review = ({ movieId, isRole, isLoggedIn, token }) => {
    const navigate = useNavigate();
    const movId = movieId;
    const [reviewRes, setReviewRes] = useState([]);
    const [list, setList] = useState([1, 2, 3, 4, 5]);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState();
    const [hover, setHover] = useState(null);
    const [reviewslist, setReviewslist] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [otherReviews, setOtherReviews] = useState([]);
    const [update, setUpdate] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const [revId, setRevId] = useState("");
    const [idx, setIdx] = useState("");
    var i = 0;
    const fetchReviews = async () => {
        ReviewService.getReview(movId)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setReviewRes(res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            })
    }
    useEffect(() => {
        fetchReviews();
    }, [movieId])

    useEffect(() => {

        separateReviews();
    }, [reviewRes]);

    const separateReviews = () => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromLocalStorage && userFromLocalStorage.user && userFromLocalStorage.user.userName) {
            const currentUser = userFromLocalStorage.user.userName;
            const currentUserReviews = reviewRes.filter((review) => review.username === currentUser);
            const otherUsersReviews = reviewRes.filter((review) => review.username !== currentUser);
            setUserReviews(currentUserReviews);
            setOtherReviews(otherUsersReviews);
        } else {

            setOtherReviews(reviewRes)
        }
    };

    const handleUpdate = (id, txt, rat, i) => {
        setIdx(i)
        setRevId(id);
        setUpdate(true);
        setReview(txt);
        setRating(rat);

    }

    const handleDelete = async (reviewId) => {
        try {
            const res = await ReviewService.deleteReview(reviewId);
            console.log("Delete Response:", res);
            if (res.status === 200) {
                console.log("Review deleted");
                const updatedReviews = reviewRes.filter((review) => review.reviewId !== reviewId);
                setReviewRes(updatedReviews);
            } else {
                console.error("Unexpected status code:", res.status);
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };




    const handleCancel = () => {
        setIdx("")
        setRevId("");
        setUpdate(false);
        setRating('')
        setReview('')


    }

    const handlesubmit = (e) => {

        e.preventDefault();

        console.log("rating :" + rating);
        console.log("review : " + review);

        const newReview = {
            username: JSON.parse(localStorage.getItem('user')).user.userName,
            rating: rating,
            reviewText: review,
        };
        if (!update) {
            setReviewslist(newReview);

            ReviewService.postReview(movieId, newReview).then((res => {
                newReview["username"] = JSON.parse(localStorage.getItem('user')).user.userName;
                setReviewRes((prevReviews) => [...prevReviews, res.data]);
                console.log(res.data)
            }))


        }
        else {
            ReviewService.putReview(revId, newReview).then((res => {
                newReview["username"] = JSON.parse(localStorage.getItem('user')).user.userName;
                const updatedUserReviews = [...userReviews];
                updatedUserReviews[idx] = res.data;
                setUserReviews(updatedUserReviews)
                setUpdate(false)
                setRevId("")
                setIdx("");
                console.log("review updated")
            }))
        }
        setRating(' ');
        setReview(' ');
    }

    return (
        <div style={{ textAlign: "left", marginBottom: "30px", width: '100%' }}>
            <div id="reviewsec" style={{
                padding: "30px", marginLeft: "150px",
                marginRight: "150px",
                marginTop: "20px",
                padding: "20px",
                border: "2px solid black",
                borderRadius: "2rem"
            }}>
                <h6><strong>Rating</strong></h6>
                <div className='m-2'>
                    {list.map((ele, i) => {
                        // console.log(i + " bro ");
                        const ratingvalue = i + 1;
                        return (
                            <label>

                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingvalue}
                                    onClick={() => setRating(ratingvalue)}

                                />

                                <FaStar
                                    className="star"
                                    color={ratingvalue <= (hover || rating) ? '#ffc107' : "#e4e5e9"}
                                    size={30}
                                    onMouseEnter={() => setHover(ratingvalue)}
                                    onMouseLeave={() => setHover(null)}
                                />

                            </label>
                        );
                    })}

                </div>

                <div className="mb-3">
                    <label htmlFor="review" className="form-label"><strong>Review</strong></label>
                    <textarea className="form-control"
                        placeholder={isRole !== 'ROLE_USER' ? 'Only logged in user can write a review' : 'Write your review here...'}
                        id="review"
                        cols="2"
                        rows="4"
                        name="review"
                        value={review}
                        disabled={isRole !== 'ROLE_USER'}
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                </div>

                <button className='btn btn-success ' type='submit' onClick={handlesubmit} disabled={isRole !== 'ROLE_USER'}>{update ? "Update" : "Save"} </button>
                <button className='btn btn-danger mx-4' onClick={handleCancel} disabled={isRole !== 'ROLE_USER'}>Cancle</button>



            </div>

            {
                userReviews.length > 0 ? userReviews.map((rev, index) => (
                    <div className="reviewbox" key={index}>
                        <div className="row">
                            <div className="col"><span>{rev.username}</span></div>
                            <div className="col" style={{ color: "#ffffff", }}>Rating:{rev.rating}</div>
                        </div>
                        <div className="row">
                            <div className="col" style={{ color: "#ffffff", }}>{rev.reviewText}</div>
                        </div>
                        <div className="row">
                            <div className="col"><span>Source: </span> {rev.source}</div>
                            <div className="col"><span>Date: </span> {rev.reviewDate}</div>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-3">
                                    <button className="btn btn-danger" type="Submit" onClick={() => handleDelete(rev.reviewId)}>Delete</button>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <button className="btn btn-danger" type="Submit" onClick={() => handleUpdate(rev.reviewId, rev.reviewText, rev.rating, index)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : ""
            }
            {
                otherReviews.length <= 0 && userReviews <= 0 ? <p>no reviews yet</p> : otherReviews.map((rev, index) => (
                    <div className="reviewbox" key={index}>
                        <div className="row">
                            <div className="col"><span>{rev.username}</span></div>
                            <div className="col" style={{ color: "#ffffff", }}>Rating:{rev.rating}</div>
                            {isRole === "ROLE_ADMIN" ? <div className="col"
                            ><button
                                className="btn  btn-danger"
                                type="Submit"
                                onClick={() => handleDelete(rev.reviewId)}>Delete</button></div> : ""}
                        </div>
                        <div className="row">
                            <div className="col" style={{ color: "#ffffff", }}>{rev.reviewText}</div>
                        </div>
                        <div className="row">
                            <div className="col"><span>Source: </span> {rev.source}</div>
                            <div className="col"><span>Date: </span> {rev.reviewDate}</div>
                        </div>
                    </div>
                ))
            }

        </div >
    )
}

export default Review;