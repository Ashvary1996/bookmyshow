const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
let mongoose = require("mongoose");
const { bookMovieSchema } = require("./schema"); 

//////////////////////////////////
/** function will check app is running on local server or live */
const isProduction = () => {
  return process.env.NODE_ENV === "production" ? true : false;
  };
  
const mongoURI = isProduction() ? process.env.MONGODBLIVE: process.env.MONGOURI;
/////////////////////////////////

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  }) 
  .catch((err) => {
    console.log("error while connection", err);
  }); 
 

let collection_connection = mongoose.model("bookmovietickets", bookMovieSchema);

exports.connection = collection_connection;
