import React, { useEffect, useState } from "react";
import "../Css files/Banner.css";
import axios from "../../axios";
import requests from "../../requests";
import { NavLink } from "react-router-dom";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    async function fetchData() {
      axios
        .get(requests.fetchNetflixOriginals)
        .then((response) => {
          setMovies(
            response?.data?.results[
              Math.floor(Math.random() * response.data.results.length - 1)
            ]
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str?.substr(0, n - 1) + " ... " : str;
  }

  return loading? (
    <div className="banner-preloader">
      <div className="circle-loading"></div>
    </div>
  ) : (
    <header
      key={movies?.id}
      className="banner banner-img"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${baseURL}${movies?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <div className="banner-title">
          <h1>{movies?.title || movies?.original_title || movies?.name}</h1>
        </div>
        <div className="banner-buttons">
          <NavLink
            to={`/trailer/${
              movies?.name || movies?.title || movies?.original_title
            }`}
            className="banner-button btn-md"
          >
            {" "}
            <i class="fa-solid fa-play"></i> <span> Watch Trailer</span>
          </NavLink>

          <NavLink
            to={`/NetflixOriginals/${movies?.id}`}
            className="banner-button btn-md "
          >
            {" "}
            <i class="fa-solid fa-info-circle"></i> <span> More Info</span>
          </NavLink>
        </div>
        <div className="banner-description">
          <p>{truncate(movies?.overview, 150)}</p>
        </div>{" "}
      </div>
    </header>
  );
}

export default Banner;
