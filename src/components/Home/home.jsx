import React from 'react';
import Trending from '../Trending/Trendingmovies';
import Genre from '../Genre/genre';
import Recommended from '../Recommended/Recommended';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../Services/AuthServices';
import Navbar from '../Header/navbar';


const Home = () => {

  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [creds, setCreds] = useState(null);
  useEffect(() => {
    let storedCreds = localStorage.getItem('user');
    console.log(storedCreds)
    if (storedCreds != null) {
      setCreds(JSON.parse(storedCreds))
      setIsLoggedIn(true);
    }
    console.log(AuthServices.getCurrentUser())
  }, []);

  const logout = () => {
    AuthServices.logout();
    window.location.reload()
  }
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} creds={creds} logout={logout} />
      <br />
      <Recommended isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} creds={creds} logout={logout} />
      <br />
      <Trending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} creds={creds} logout={logout} />
      <br />
      <Genre isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} creds={creds} logout={logout} />
      <br />

    </>
  );
}

export default Home;
