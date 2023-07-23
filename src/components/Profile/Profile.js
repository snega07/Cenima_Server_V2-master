import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReviewService from "../Services/ReviewService";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {

    let [isLoggedIn, setIsLoggedIn] = useState(false);
    const [creds, setCreds] = useState(null);
    const [isRole, setIsRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [myReviews, setMyreviews] = useState([]);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
    });

   
    useEffect(() => {
        let storedCreds = localStorage.getItem('user');
        console.log(storedCreds)
        if (storedCreds != null) {
            const parsedCreds = JSON.parse(storedCreds);
            setCreds(parsedCreds);
            setIsLoggedIn(true);
           
            setIsRole(parsedCreds.user_role[0].authority);
           fetchReviews();
            setProfileData(parsedCreds.user)
        
        }
    }, []);
    console.log()
  const fetchReviews = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).user.userId;
    ReviewService.getSpecificReviews(userId)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setReviews(res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching Reviews:", error);
            });
    };
    useEffect(() => {

        separateReviews();
    }, [reviews]);

    const separateReviews = () => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromLocalStorage && userFromLocalStorage.user && userFromLocalStorage.user.userName) {
            const currentUser = userFromLocalStorage.user.userName;
            const currentUserReviews = reviews.filter((review) => review.username === currentUser);
            setMyreviews(currentUserReviews);
        }
    };
    console.log(myReviews);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const openMovie = (movieId) => {
        navigate(`/view-movie/${movieId}`, { state: { isRole: isRole, isLoggedIn: isLoggedIn } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container d-flex justify-content-center align-items-center p-3 mb-2">
                    <div className="row">
                        <div className="col-sm-6 column">
                            <h3 className="py-4 text-warning">Personal Information</h3>
                            <div className="form-group">
                                <div className="col m-2 fs-5">
                                    <label>UserName</label>
                                    <input
                                        style={{ color: "#000" }}
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={profileData.userName}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="col m-2 fs-5">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        style={{ color: "#000" }}
                                        name="email"
                                        value={profileData.emailId}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    <br />
                                    <a href="#"> Reset Password?</a>
                                    {/*  </div>
                 <div className="col m-2 fs-5">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="pass"
                  value={profileData.pass}
                  onChange={handleChange}
                />
                <div>
                  <i
                    className="password-toggle-btn fs-5"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </i>
                </div>*/}
                                </div>
                                { /* <div className="col m-2 text-center">
                                    <button
                                        className="btn btn-warning"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </button>
            </div>*/}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div>
                                <p className="text-warning">Your reviews</p>
                                {isRole === "ROLE_USER" ?
                                    myReviews.length <= 0 ? <p>You haven't added any  reviews yet</p> : myReviews.map((rev, index) => (
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
                                            <div className="row">
                                                <button className="btn btn-warning" onClick={() => openMovie(rev.movieId)}>View Review</button>
                                            </div>
                                        </div>
                                    )) : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;