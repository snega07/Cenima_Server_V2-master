import React, { useState } from "react";
import './MovieForm.css';
import { useEffect } from "react";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";
import MovieServices from "../Services/MovieServices";
import GenreServices from "../Services/GenreServices";

const MovieForm = (props) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    id: id,
    title: "",
    director: "",
    producer: "",
    motionPictureRating: "",
    movieDesc: "",
    casts: [],
    genres: [],
    trailerId:"",
    runtime: "",
    collection: "",
    language: "",
    posterUrl: "",
    releaseDate: "",
  });


  const [selectedValue, setSelectedValue] = useState([]);
  const [castInput, setCastInput] = useState({ castName: "", roleName: "", castUrl: "" });
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [unit, setUnit] = useState("");
  const [genresFromApi,setGenresFromApi] = useState([]); //added
  const [data,setData]= useState([
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "animation", label: "Animation" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "drama", label: "Drama" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horror", label: "Horror" },
    { value: "musical", label: "Musical" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "science_fiction", label: "Science Fiction" },
    { value: "thriller", label: "Thriller" },
    { value: "war", label: "War" },
    { value: "western", label: "Western" },
    { value: "historical", label: "Historical" },
    { value: "biographical", label: "Biographical" },
    { value: "documentary", label: "Documentary" },
    { value: "sports", label: "Sports" },
  ]);


  useEffect(() => {

    if (movieData.id === '_add') {
      return;
    }
    else {
      
      MovieServices.getMovieById(movieData.id).then((res) => {
        let existingMovieData = res.data;
        const collectionValue =existingMovieData.collection.split(' ')[0];
        setMovieData({
          title: existingMovieData.title,
          director: existingMovieData.director,
          producer: existingMovieData.producer,
          motionPictureRating: existingMovieData.motionPictureRating,
          movieDesc: existingMovieData.movieDesc,
          casts: [],
          genres:[],
          trailerId: existingMovieData.trailerId,
          genreId: existingMovieData.genreId,
          runtime: existingMovieData.runtime,
          collection: collectionValue,
          language: existingMovieData.language,
          posterUrl: existingMovieData.posterUrl,
          releaseDate: existingMovieData.releaseDate
        })
        setGenresFromApi(existingMovieData.genres)//addded
      })
    
    }
  }, [])

  useEffect(() => {//added
    const filteredOptions = getFilteredOptions();
    setData(filteredOptions);
    //console.log(filteredOptions)
  }, [genresFromApi]); 

console.log(data)
const getExistingGenresValues = () => {//added
  return genresFromApi.map((genre) => genre.category);
};

const getFilteredOptions = () => { //added
  const existingGenresValues = getExistingGenresValues();
 // console.log(existingGenresValues);
  return data.filter((genre) => !existingGenresValues.includes(genre.value));
};

  const handleGenreChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map(option => ({ category: option.value }));
    setSelectedValue(selectedGenres);
    setMovieData((prevState) => ({
      ...prevState,
      genres: selectedGenres
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCastInput((prevState) => ({
      ...prevState, [name]: value
    }))
    console.log(castInput)

  }
  const handleEditCast = (e, index) => {
    e.preventDefault();
    setCastInput(movieData.casts[index]);
    setEditMode(true);
    setEditModeIndex(index);
  };
  const handleRemoveCast = (e, index) => {
    e.preventDefault();
    const updatedCasts = [...movieData.casts];
    updatedCasts.splice(index, 1);
    setMovieData((prevState) => ({
      ...prevState,
      casts: updatedCasts,
    }));
  };
  const handleUpdateCast = (e) => {
    e.preventDefault();
    let updatedCasts = [...movieData.casts];
    if (editModeIndex !== -1) {
      // Editing an existing cast
      updatedCasts[editModeIndex] = castInput;
      setEditModeIndex(-1);
    } else {
      // Adding a new cast
      updatedCasts.push(castInput);
    }

    setMovieData((prevState) => ({
      ...prevState,
      casts: updatedCasts,
    }));

    setCastInput({ castName: "", roleName: "", castUrl: "" });
    setEditMode(false);
  }
  const handleAddCast = () => {
    setCastInput({ castName: "", roleName: "", castUrl: "" });
    setEditMode(true);
  }










  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setMovieData((prevState) => ({
      ...prevState,
      motionPictureRating: selectedRating,
    }));
  };
  const handleCollectionChange = (event) => {
    const { value } = event.target;
    setUnit(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newMovie = {
      title: movieData.title,
      director: movieData.director,
      producer: movieData.producer,
      motionPictureRating: movieData.motionPictureRating,
      movieDesc: movieData.movieDesc,
      casts: movieData.casts,
      genres: movieData.genres,
      genreId: movieData.genreId,
      runtime: movieData.runtime,
      trailerId:movieData.trailerId,
      collection: `${movieData.collection} ${unit}`,
      language: movieData.language,
      posterUrl: movieData.posterUrl,
      releaseDate: movieData.releaseDate
    }

    console.log('newMovie => ' + JSON.stringify(newMovie));
    if (movieData.id === '_add') {
      MovieServices.createMovie(newMovie).then(res => {
        console.log(res.data)
        navigate('/')
      }, (error) => {
        alert("something went wrong try again ")
        navigate('/')
        console.log("error")
      });

    }
    else {
      MovieServices.updateMovie(newMovie, id).then(res => {
        console.log(res.data);
        navigate('/')
      })

    }
    setMovieData({
      title: "",
      director: "",
      producer: "",
      motionPictureRating: "",
      movieDesc: "",
      trailerId:"",
      casts: [],
      genres: [],
      genreId: [],
      runtime: "",
      collection: "",
      language: "",
      posterUrl: "",
      releaseDate: "",
    });

  };

  return (
    <div className="flex-fill" style={{ margin: "10px" }}>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h3 className="py-4 text-warning text-center">{movieData.id === '_add' ? "Add Movie Form" : "Update Movie Form"}</h3>
          <form>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Director</label>
                <input
                  className="form-control"
                  type="text"
                  name="director"
                  value={movieData.director}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Producer</label>
                <input
                  className="form-control"
                  type="text"
                  name="producer"
                  value={movieData.producer}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Image URL</label>
                <input
                  className="form-control"
                  type="url"
                  name="posterUrl"
                  value={movieData.posterUrl}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Release Date</label>
                <input
                  className="form-control"
                  type="date"
                  min="1990-01-01"
                  max="2023-06-23"
                  name="releaseDate"
                  value={movieData.releaseDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-sm-6">
                <label className="movieLabel">Select Genre </label>
                <Select
                  className="dropdown"
                  placeholder="Select Genre"
                  value={selectedValue.map(genre => ({ value: genre.category, label: genre.category }))}
                  options={data.map(genre => ({ value: genre.value, label: genre.value }))}
                  onChange={handleGenreChange} // assign onChange function
                  isMulti
                  isClearable
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12 p-3">
                <label className="movieLabel">Cast</label>

                <div>
                  <div className="d-flex flex-wrap ">
                    {movieData.casts.map((cast, index) => (
                      <div className="card mb-3 mr-2" style={{ marginRight: '8px' }} key={index}>
                        <div className="card-body" style={{ width: '15rem', backgroundColor: 'gray', border: '0', outline: 'none' }}>
                          <img
                            src={cast.castUrl}
                            className="card-img-top"
                            alt={cast.castName}
                            style={{ height: "150px", objectFit: 'cover' }}
                          />
                          <h5 style={{ overflow: 'hidden', padding: '0.5rem' }} className="card-title">{cast.castName}</h5>
                          <p className="card-text">Role: {cast.roleName}</p>
                          {!editMode && (
                            <div className="row">
                              <div className="col">
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => handleEditCast(e, index)}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="col">
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => handleRemoveCast(e, index)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <div>
                      <div className="form-group">
                        <label className="movieLabel">Star Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="castName"
                          value={castInput.castName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="movieLabel">Star Image URL</label>
                        <input
                          className="form-control"
                          type="text"
                          name="castUrl"
                          value={castInput.castUrl}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="movieLabel">Star Role</label>
                        <input
                          className="form-control"
                          type="text"
                          name="roleName"
                          value={castInput.roleName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleUpdateCast(e)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                  {!editMode && (
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={handleAddCast}
                    >
                      Add Cast
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Plot Summary</label>
                <textarea
                  rows="3"
                  cols="3"
                  className="form-control"
                  name="movieDesc"
                  value={movieData.movieDesc}
                  onChange={handleChange}
                />
                
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Trailer Video Id</label>
                <input
                  rows="3"
                  cols="3"
                  className="form-control"
                  name="trailerId"
                  value={movieData.trailerId}
                  onChange={handleChange}
                /></div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Rating</label>
                <select
                  className="form-control"
                  name="motionPictureRating"
                  value={movieData.motionPictureRating}
                  onChange={handleRatingChange}
                >
                  <option value="">Choose one</option>
                  <option value="PG">PG</option>
                  <option value="M">M</option>
                  <option value="E">E</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="movieLabel">Runtime</label>
                <input
                  className="form-control"
                  type="text"
                  name="runtime"
                  value={movieData.runtime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label className="movieLabel">Language</label>
                <input
                  className="form-control"
                  type="text"
                  name="language"
                  value={movieData.language}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label className="movieLabel">Box Office</label>
                <input
                  className="form-control"
                  type="text"
                  name="collection"
                  value={movieData.collection}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="movieLabel">choose unit</label>
                <select
                  className="form-control"
                  name="unit"
                  value={unit}
                  onChange={handleCollectionChange}
                  placeholder="choose one"
                >
                   <option value="">Choose one</option>
                  <option value="Millions">Millions</option>
                  <option value="Billions">Billions</option>
                </select>
              </div>
            </div>
            <div className="col text-center m-4">
              <button
                className="btn btn-warning btn1"
                type="submit"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
