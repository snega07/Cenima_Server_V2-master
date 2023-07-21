import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './ViewAll.css';
import ViewMovieModal from '../moviemodal';

const ViewAll = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { rmovie, isRole, isLoggedIn, title } = location.state;
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const openMovie = (movieId) => {
        navigate(`/view-movie/${movieId}`, { state: { isRole: isRole, isLoggedIn: isLoggedIn } });
    };

    const handleShowModal = (rmovie) => {
        setSelectedMovie(rmovie)
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

    return (
        <div className="flex-fill" >

            <h2 style={{ color: "gray", paddingLeft: "1.8rem" }}>{title}</h2>
            <br />
            <div className="container mt-4" >
                <div className="row" >
                    {rmovie.map((rmovie) => (
                        <div className="col-md-3 coller" key={rmovie.id} style={{ paddingBottom: '25px', width: '20 rem' }}>
                            <div className="card vcard" >
                                <img
                                    src={rmovie.posterUrl}
                                    onClick={() => openMovie(rmovie.movieId)}
                                    className="card-img-top"
                                    alt={rmovie.title}
                                    style={{ objectFit:'cover',height: '350px' }}
                                />
                                <div className="card-body" style={{ backgroundColor: 'black' }}>
                                    <h5 className="card-title" style={{
                                        color: 'wheat',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                    }}>{rmovie.title}</h5>
                                    <a   onClick={() => handleShowModal(rmovie)} className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                                        Watch Option
                                    </a>
                                </div>
                                {selectedMovie && <ViewMovieModal showModal={showModal} handleCloseModal={handleCloseModal} movie={{
                          image: selectedMovie.posterUrl,
                          title: selectedMovie.title,
                          description: selectedMovie.movieDesc,
                          rating: selectedMovie.rating,
                        }} />}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};
export default ViewAll;
