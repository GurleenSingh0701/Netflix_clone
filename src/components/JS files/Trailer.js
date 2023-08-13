import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import "../Css files/Trailer.css";
function Trailer() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const name = useParams();
  const movie = name.name;
  const [loading, setLoading] = useState(true);
  const api_key = process.env.REACT_APP_API_KEY_IMDB;
  console.log(api_key);
  useEffect(() => async () => {
    const req = await axios.get(
      `https://imdb-api.com/en/API/Search/${api_key}/${movie}`
    );
    const result = req?.data?.results[0];
    const movie_id = result?.id;
    console.log(result);
    await axios
      .get(`https://imdb-api.com/en/API/YouTubeTrailer/${api_key}/${movie_id}`)
      .then((response) => {
        setYoutubeLink(response?.data?.videoUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  });

  return loading ? (
    <div className="loading fs-1 fw-bolder">
      {" "}
      <span className="circle-loading"></span>
    </div>
  ) : (
    <div>
      <ReactPlayer
        url={youtubeLink}
        playing={true}
        controls
        width={"100vw"}
        height={"100vh"}
        autoPlay
      />
    </div>
  );
}
export default Trailer;
