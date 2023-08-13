"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
const root = ReactDOM.createRoot(document.getElementById("root"));

function fallbackRender({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "blue" }}>{error.message}</pre>
    </div>
  );
}

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </BrowserRouter>
);
