import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Movie = () => {
  return (
    <div className="flex-fill">
      <h3>    Recommended Movies</h3>
      <br />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/7/77/Gekij%C5%8D-ban_Jujutsu_Kaisen_0.png"
                className="card-img-top"
                alt="Movie 1"
                style={{ height: '400px' }}
              />
              <div className="card-body" style={{ backgroundColor: 'black' }}>
                <h5 className="card-title" style={{ color: 'white' }}>Jujutsu Kaisen 0</h5>
                <a href="#" className="btn btn-primary " style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                  Watch Option
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                src="https://irs.www.warnerbros.com/gallery-v2-jpeg/inception_posterlarge_8-1308772917.jpg"
                className="card-img-top"
                alt="Movie 2"
                style={{ height: '400px' }}
              />
              <div className="card-body" style={{ backgroundColor: 'black' }}>
                <h5 className="card-title" style={{ color: 'white' }}>Inception</h5>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                  Watch Option
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                src="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg"
                className="card-img-top"
                alt="Movie 3"
                style={{ height: '400px' }}
              />
              <div className="card-body" style={{ backgroundColor: 'black' }}>
                <h5 className="card-title" style={{ color: 'white' }}>Interstellar</h5>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                  Watch Option
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img
                src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d2284deb1c651f0678555eeb30cc10a51726b8e8d6a1eb4b2d12b55d5d0e003c._RI_TTW_.jpg"
                className="card-img-top"
                alt="Movie 4"
                style={{ height: '400px' }}
              />
              <div className="card-body" style={{ backgroundColor: 'black' }}>
                <h5 className="card-title" style={{ color: 'white' }}>Spider-Man</h5>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'black' }}>
                  Watch Option
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
