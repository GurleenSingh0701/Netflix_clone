import React, { useEffect, useState } from "react";
import "../Css files/Rows.css";
import axios from "../../axios";
import default_img from "../../images/default_img.jpg";
import { NavLink } from "react-router-dom";
function Row({ title, fetchurl }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(fetchurl)
        .then((response) => {
          setMovies(response?.data?.results);

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
  }, [fetchurl]);

  const title1 = title.replace("-", "");

  return (
    <div className="row">
      <div className="col">
        <span class="row-title fw-bolder">{title}</span>
        <div className="row-card">
          {loading
            ? movies?.map((data) => {
                return (
                  <div className="row-card-content card-preloading ">
                    <div className="circle-loading center"></div>
                  </div>
                );
              })
            : movies?.map((data) => {
                return (
                  <div className="row-card-content">
                    <NavLink to={`/${title1}/${data?.id}`}>
                      <img
                        key={data?.id}
                        src={
                          data?.poster_path != null
                            ? `${baseURL}${data?.poster_path}`
                            : `${default_img}`
                        }
                        title={data.title || data.original_title || data.name}
                        // src={`${baseURL}${data?.poster_path}` || `${default_img}`}
                        className={
                          title === "Netflix-Originals"
                            ? "netflix-org-movie_poster"
                            : "movie_poster"
                        }
                        alt={data?.original_title}
                      />
                    </NavLink>
                    <NavLink
                      to={`/trailer/${
                        data?.name || data?.title || data?.original_title
                      }`}
                      className="card-button btn btn-danger "
                    >
                      Watch Trailer
                    </NavLink>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Row;
