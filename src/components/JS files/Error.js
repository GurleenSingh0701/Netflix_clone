import React from "react";
import { Link } from "react-router-dom";
import "../Css files/Error.css";
const Error = () => {
  return (
    <div className="Error fs-1 fw-lighter">
      <p>404 - Page Not Found !!!!</p>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default Error;
