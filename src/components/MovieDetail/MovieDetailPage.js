import React, { useEffect, useState } from "react";
import './MovieDetail.css';
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieServices from "../Services/MovieServices";
import CastServices from "../Services/CastServices";
import Review from "./Review";
import GenreServices from "../Services/GenreServices";
import Trailer from "./Trailer";


const MovieDetailPage = (props) => {

    let { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [istrending, setIsTrending] = useState(false);
    const [moviedata, changeMovieData] = useState({
        id: id,
        title: "",
        director: "",
        producer: "",
        motionPictureRating: "",
        movieDesc: "",
        casts: [],
        genres: [],
        runtime: "",
        collection: "",
        language: "",
        posterUrl: "",
        releaseDate: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    
    const { isRole, isLoggedIn, token } = location.state;
    console.log(token)
    const fetchMovies = async () => {
        MovieServices.getMovieById(id).then(
            res => changeMovieData(res.data)
        )
    }

    const fetchIsTrending = async () => {
        MovieServices.isTrending(id).then(
            res => setIsTrending(res.data)

        )
    }
    useEffect(() => {
        fetchMovies();
        fetchIsTrending();

    }, [])

    const deleteCast = (castId) => {
        alert("delete this Cast")
        CastServices.deleteCast(castId).then(
            (res) => {
                const updatedCasts = moviedata.casts.filter((cast) => cast.castId !== castId);
                changeMovieData((prevData) => ({ ...prevData, casts: updatedCasts }));
                console.log("cast deleted")
            }
        )
    }
    const removeGenre = (genreId) => {
        alert("remove genre")
        GenreServices.deleteGenre(genreId).then(
            (res) => {
                const updatedGenres = moviedata.genres.filter((genre) => genre.genreId !== genreId);
                changeMovieData((prevData) => ({ ...prevData, genres: updatedGenres }));
                console.log("genre removed")
            }
        )
    }
    const toggle = (i) => {
        if (selected === i) {
            console.log(selected);
            return setSelected(null);
        }
        console.log(selected);
        setSelected(i);
    };


    const handleUpdate = (movieId) => {
        navigate(`/addmovie/${movieId}`);
    };
    const addToRecomm = (movieId) => {

        MovieServices.addToTrending(movieId).then(
            (res) => {
                console.log(res.data)
                setIsTrending(true);
            }
        )
        console.log("add")
    };
    const removeFromTrending = (movieId) => {
        MovieServices.removeFromTrending(movieId).then(
            (res) => {
                console.log("removed from trending")
                setIsTrending(false)
            }
        )
        console.log("remove")
    }


    return (
        <>
            <div
                className="flex-fill"
                style={{
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "500",
                    backgroundColor: "#363636",
                    overflow: "hidden"
                }}
            >
                <div className="box-main">
                    <div className="row align-items-stretch">
                        <div className="col-md-6 ">
                            <div style={{
                                backgroundImage: `url(${moviedata.posterUrl})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: "5px",
                                objectFit: "cover",
                                padding: "20px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "450px",
                            }}>

                                <div className="detail-box">
                                    <div className="row">
                                        <div className="col" style={{ fontSize: "35px" }}>
                                            <p>{moviedata.title}</p>
                                        </div>
                                        <div className="col" style={{ fontSize: "35px" }}>
                                            <p>
                                                <span><FaStar /></span>
                                                {moviedata.rating !== null ? moviedata.rating : "0"}/5
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <span>Rating</span>
                                            <p>{moviedata.motionPictureRating}</p>
                                        </div>
                                        <div className="col">
                                            <span>Runtime</span>
                                            <p>{moviedata.runtime}</p>
                                        </div>
                                        <div className="col">
                                            <span>Box-office</span>
                                            <p>{moviedata.collection}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex ">
                            <div

                                style={{
                                    height: '100%', // Adjust the height as per your requirement

                                    maxWidth: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}
                            >
                                <Trailer videoId={moviedata.trailerId} height="450px" width="630px" />
                            </div>
                        </div>
                    </div>
                    <div className="row-padding" style={{ textAlign: "left" }}>
                        <span>Plot Summary:</span>
                        {" " + moviedata.movieDesc}
                    </div>
                </div>

                <div className="box" style={{ textAlign: "left" }}>
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <span>Release Date:</span>
                        </div>
                        <div className="col-sm-2 col-8">{moviedata.releaseDate}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <span>Language:</span>
                        </div>
                        <div className="col-sm-2 col-8">{moviedata.language}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <span>Director:</span>
                        </div>
                        <div className="col-sm-2 col-8">{moviedata.director}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <span>Producer:</span>
                        </div>
                        <div className="col-sm-2 col-8">{moviedata.producer}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <span>Genre:</span>
                        </div>
                        {moviedata.genres.map((genre, index) => (
                            <div key={index} className="col-sm-2 col-4">{genre.category + " "}{isRole === "ROLE_ADMIN" ? <span onClick={() => removeGenre(genre.genreId)}><GiCancel /></span> : ""}</div>
                        ))}
                    </div>
                </div>
                <div className="box" style={{ textAlign: "left" }}>
                    <div>
                        <div className="wrapper">
                            <div className="accordian">
                                <div>
                                    <div className="title" onClick={() => toggle(0)}>
                                        <div className="col-sm-2 ">
                                            <span>Cast & Crew:</span>
                                        </div>
                                        <span>{selected === 0 ? <FaMinus /> : <FaPlus />}</span>
                                    </div>

                                    <div
                                        className={selected === 0 ? "content show" : "content"} style={{ paddingTop: '10px' }}
                                    >
                                        <div className="card-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gridGap: "10px" }}>
                                            {moviedata.casts.map((item, index) => (
                                                <div className="card" key={index} style={{ width: "200px", margin: "10px" }}>
                                                    <img
                                                        src={item.castUrl}
                                                        className="card-img-top"
                                                        alt={item.castName}
                                                        style={{ height: "200px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body">
                                                        <h6 className="card-title" style={{ color: "#000000" }}>{item.castName}</h6>
                                                        <h6 className="card-text">As {item.roleName}</h6>
                                                        {isRole === "ROLE_ADMIN" && (
                                                            <button
                                                                className="btn btn-danger"
                                                                type="submit"
                                                                onClick={() => deleteCast(item.castId)}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isRole === "ROLE_ADMIN" ? <div className=" row row-padding" >
                    <div className="col-sm-2">
                        <button
                            className="btn btn-success"
                            type="Submit"
                            onClick={() => handleUpdate(moviedata.movieId)}
                        >
                            Update Details
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <button
                            className="btn btn-success"
                            type="Submit"
                            onClick={istrending ? () => removeFromTrending(moviedata.movieId) : () => addToRecomm(moviedata.movieId)}
                        >
                            {istrending ? "remove from trending" : "Add to trending"}
                        </button>

                    </div>


                </div> : <></>}

                <div style={{ textAlign: "left" }}>
                    <span style={{ margin: "20px", fontSize: "30px" }} >REVIEWS:</span>
                    <Review movieId={moviedata.movieId}
                        isRole={isRole || ''}
                        isLoggedIn={isLoggedIn || false}
                        token={token}
                    />

                </div>

            </div>
        </>
    );
}

export default MovieDetailPage;
