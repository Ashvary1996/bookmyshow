import React from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import BookMyShow from "./BookMyShow";
const dotenv = require("dotenv").config();

const App = () => {
  return (
    <div className="container">
      <BookMyShow /> {/*  Displaying BookmyShow Page  */}
    </div>
  );
};

export default App;
