const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//app is using NewBooking and LastBooking Routes -->

app.use(
  "https://bookmyshowtest01.onrender.com/api",
  require("./routes/NewBooking")
);
app.use(
  "https://bookmyshowtest01.onrender.com/api",
  require("./routes/LastBooking")
);

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
