import React from "react";
import ReactDOM from "react-dom/client";
import { LazyApp } from "./app/LazyApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyApp />
  </React.StrictMode>
);
