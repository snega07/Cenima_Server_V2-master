import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MovieServices from '../Services/MovieServices';
import CastServices from '../Services/CastServices';
import { MdOutlineSearchOff } from 'react-icons/md'
import { FaStar } from "react-icons/fa";
import ViewMovieModal from '../moviemodal';
import './SearchResult.css';
const SearchResult = () => {
    let { search } = useParams();
    const navigate = useNavigate();
    const [rmovie, setRmovie] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isRole = searchParams.get('isRole');
    const isLoggedIn = searchParams.get('isLoggedIn');
    console.log(isRole + "from search result page" + isLoggedIn)
    const fetchMovies = async () => {

        try {
            const [genreRes, titleRes, castRes] = await Promise.all([
                MovieServices.getMovieByGenre(search),
                MovieServices.getMovieByTitle(search),
                CastServices.getMovieByCast(search),
            ]);
            console.log(genreRes)
            console.log(castRes)
            console.log(titleRes)
            if (Array.isArray(genreRes.data) && genreRes.data.length > 0) {
                setRmovie(genreRes.data);
            }
            else if (Array.isArray(titleRes.data) && titleRes.data.length > 0) {
                setRmovie(titleRes.data);
            }
            else if (Array.isArray(castRes.data) && castRes.data.length > 0) {
                setRmovie(castRes.data);
            }

            else {
                console.log("no data found")
            }

        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };


    useEffect(() => {
        fetchMovies();

    }, [search])

    const handleShowModal = (rmovie) => {
        setSelectedMovie(rmovie)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const openMovie = (movieId) => {
        navigate(`/view-movie/${movieId}`, {
            state: {
                isRole: isRole || '',
                isLoggedIn: isLoggedIn || false,
            },
        });
    };




    return (
        <div className="flex-fill">
            <h3 style={{
                color: "#999999", font: "arial, sans-serif", fontSize: "2.5rem", padding: "1.8rem", fontWeight: "bold",
                left: "13px"
            }}>  Search result for "{search}"</h3>
            <br />
            <div className="container mt-4">
                <div className="row">
                    {rmovie.length > 0 ? rmovie.map((rmovie, index) => (
                        <div className="col-md-3" key={rmovie.id} style={{ paddingBottom: '25px' }}>
                            <div className="card scards" >
                                <img
                                    src={rmovie.posterUrl}
                                    onClick={() => openMovie(rmovie.movieId)}
                                    className="card-img-top"
                                    alt={rmovie.title}
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <div className="card-body" style={{ backgroundColor: 'black' }}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h5
                                                className="card-title"
                                                style={{
                                                    color: "wheat",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {rmovie.title}
                                            </h5>
                                        </div>
                                        <div className="col-sm-4">
                                            <span>{rmovie.rating !== null ?
                                                rmovie.rating : ""}
                                                <FaStar style={{ marginBottom: "4px" }} />
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleShowModal(rmovie)}
                                        style={{
                                            backgroundColor: "#FFA500",
                                            borderColor: "#FFA500",
                                            color: "black",
                                        }}
                                    >
                                        Watch Option
                                    </button>
                                    {selectedMovie && <ViewMovieModal showModal={showModal} handleCloseModal={handleCloseModal} movie={{
                                        image: selectedMovie.posterUrl,
                                        title: selectedMovie.title,
                                        description: selectedMovie.movieDesc,
                                        rating: selectedMovie.rating,
                                    }} />}
                                </div>
                            </div>
                        </div>
                    )) : <div >
                        <div className="some-x" style={{ width: "15rem", height: "15rem", background: "#e5e5e9" }} >
                            <div className="empty ">
                                <MdOutlineSearchOff className='mt-3 mx-5' size={100} />
                                <p className='mt-3 mx-3' >Sorry We could't find it</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <br />
        </div>


    );
}

export default SearchResult;
