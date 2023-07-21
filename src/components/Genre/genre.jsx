import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './genre.css';
const Genre = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isRole, setIsRole] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    if (props.creds != null && props.isLoggedIn) {

      setIsRole(props.creds.user_role[0].authority);
      setIsLoading(false);


    }
  }, [props.creds, props.isLoggedIn]);

  const view = (searchValue) => {

    navigate(`/view-search-result/${searchValue}?isRole=${isRole}&isLoggedIn=${props.isLoggedIn}`)
  }

  const genres = [
    {
      title: 'Action',
      image: 'https://pbblogassets.s3.amazonaws.com/uploads/2019/07/12130642/John-Wick.jpg',
    },
    {
      title: 'Comedy',
      image: 'https://nofilmschool.com/sites/default/files/styles/facebook/public/screen_shot_2019-06-21_at_2.16.03_pm.png?itok=bcH1ZGO8',
    },
    {
      title: 'Drama',
      image: 'https://freedramamoviesblog.files.wordpress.com/2014/11/free-drama-movies-3.png',
    },
    {
      title: 'Horror',
      image: 'https://m.media-amazon.com/images/I/710NBpYrSjL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      title: 'Romance',
      image: 'https://genregeek.weebly.com/uploads/2/8/0/3/28037185/7430436_orig.jpg',
    },
    {
      title: 'science_fiction',
      image: 'https://i0.wp.com/www.pandorapost.com/wp-content/uploads/2021/04/science-fiction-genres-and-subgenres.jpg?resize=620%2C358&ssl=1',
    },
    {
      title: 'Thriller',
      image: 'https://resizing.flixster.com/BrQgVSdrjZgqlU7jFbLVdBWQ0Wk=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjYyNjE4LndlYnA=',
    },
    {
      title: 'Animation',
      image: 'https://jw-webmagazine.com/wp-content/uploads/2020/04/chihiro042-1.jpg',
    },
  ];

  return (
    <div className="flex-fill">
      <div className="sectionTitleG">
        <h3 id="headg">  Genres</h3>
      </div>
      <br />
      <div className="container mt-4">
        <div className="row">
          {genres.map((genre, index) => (
            <div className="col-md-3" key={index}>
              <div className="card gcard">
                <img
                  src={genre.image}
                  onClick={() => view(genre.title)}
                  className="card-img-top"
                  alt={genre.title}
                  style={{ height: '20rem', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ backgroundColor: 'black' }}>
                  <h5 className="card-title" style={{ color: 'white' }}>{genre.title}</h5>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre;
