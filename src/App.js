import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Login from './components/Cred/Login';
import Signup from './components/Cred/signup';
import MovieForm from './components/Form/MovieForm';
import MovieDetailPage from './components/MovieDetail/MovieDetailPage';

import Footer from './components/Footer/footer';

import SearchResult from './components/searchresult/SearchResult';
import ViewAll from './components/Viewall/ViewAll';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/addmovie/:id" element={<MovieForm />} />
        <Route path="/viewall" element={<ViewAll />} />
        <Route path="/view-movie/:id" element={<MovieDetailPage />} />
        <Route path="/view-search-result/:search" element={<SearchResult />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
