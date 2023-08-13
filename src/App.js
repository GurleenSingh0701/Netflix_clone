import { Route, Routes } from "react-router-dom";
import "./App.css";
import Banner from "./components/JS files/Banner";
import Row from "./components/JS files/Row";
import requests from "./requests";
import EachMovie from "./components/JS files/EachMovie";
import "bootstrap/dist/css/bootstrap.min.css";
import Trailer from "./components/JS files/Trailer";
import Error from "./components/JS files/Error";
import { useEffect, useState } from "react";
import Preloading from "./components/JS files/Preloading";

function App() {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 3000); // Simulating a 3-second loading delay
  }, []);
  return (
    <>
      <div className="App">
        {isLoading ? (
          <Preloading />
        ) : (
          <Routes>
            <Route
              exact="/"
              path="/"
              element={[
                <Banner />,
                <Row
                  title="Netflix-Originals"
                  fetchurl={requests.fetchNetflixOriginals}
                />,
                <Row title="Top-Rated" fetchurl={requests.fetchTopRated} />,
                <Row
                  title="Action Movies"
                  fetchurl={requests.fetchActionMovies}
                />,
                <Row
                  title="Comedy-Movies"
                  fetchurl={requests.fetchComedyMovies}
                />,
                <Row
                  title="Horror-Movies"
                  fetchurl={requests.fetchHorrorMovies}
                />,
                <Row
                  title="Romance-Movies"
                  fetchurl={requests.fetchRomanceMovies}
                />,
                <Row
                  title="Documentaries"
                  fetchurl={requests.fetchDocumentaries}
                />,
              ]}
            ></Route>
            <Route path="/:title/:id" element={<EachMovie />}></Route>
            <Route path="/trailer/:name" element={<Trailer />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
