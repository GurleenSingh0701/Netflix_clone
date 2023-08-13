import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import requests from "../../requests";
import "../Css files/EachMovie.css";
import default_img from "../../images/default_img.jpg";

function EachMovie() {
  const id = useParams();
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests[`fetch${id.title}`]);
      console.log("The response is", response?.data?.results);
      setMovies(response?.data?.results);
    }
    fetchData();
  }, [id.title]);
  console.log(id.id);
  return (
    <div className="movie_details_container">
      {movies?.map((item) => {
        return `${item?.id}` === id.id ? (
          <>
            <div className="row-card-content ">
              <img
              
                src={
                      item?.poster_path != null
                        ? `${baseURL}${item?.poster_path}`
                        :`${ default_img }`
                    }
                alt="poster-img"
                className="poster_img"
              />
            </div>

            <div className="movie-info">
              {" "}
              <p>
                {" "}
                <span className="fw-bold fs-2">Movie Title: </span>
                <span className="fs-3">
                  {item?.original_name || item?.original_title}
                </span>
              </p>
              <p>
                <span className="fw-bold fs-2">Release Date: </span>
                <span className="fw-normal fs-3 ">
                  <i class="fa-regular fa-clock"></i>{" "}
                  {item.release_date || item.first_air_date}
                </span>
              </p>
              <p>
                <ul className="ratings-list">
                  <span className="fw-bold fs-2">Ratings: </span>{" "}
                  <li className="fw-normal fs-3">
                    <span className="values-icon">
                      <i class="fa-solid fa-check-to-slot"></i>{" "}
                      {item?.vote_count}
                    </span>
                  </li>
                  <li className="fw-normal fs-3">
                    <span className="values-icon">
                      <i class="fa-solid fa-star"></i> {item?.vote_average}
                    </span>
                  </li>
                  <li className="fw-normal fs-3">
                    <span className="values-icon">
                      <i class="fa-solid fa-language"></i>{" "}
                      {item?.original_language}
                    </span>
                  </li>
                </ul>
              </p>
              <p>
                <span className="fw-bold fs-2 ">Film overview:</span>{" "}
                <span className=" fs-4">
                  <i class="fa-solid fa-film"></i> {item?.overview}
                </span>
              </p>
              <div className="trailer-back-btns">
                <NavLink
                  to={`/trailer/${
                    item?.name || item?.title || item?.original_title
                  }`}
                  className="btn btn-md btn-secondary"
                >
                  {" "}
                  <i class="fa-solid fa-play"></i> <span> Watch Trailer</span>
                </NavLink>
                <NavLink to={"/"} className="btn btn-md btn-secondary">
                  {" "}
                  <i class="fa-solid fa-angle-left"></i>
                  <span> Go back</span>
                </NavLink>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default EachMovie;
