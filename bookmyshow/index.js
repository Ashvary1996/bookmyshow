const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require("cors");
app.use(cors());

/////////////////////   This API is for Booking Movie  //////////////////////////////
app.post("/api/booking", async (req, res) => {
  try {
    if (!req.body.movie) {
      res.status(400).json({ ERROR: "Movies Name Required" });
    } else if (!req.body.slot) {
      res.status(400).json({ ERROR: "Slot Required" });
    } else if (!req.body.seats) {
      res.status(400).json({ ERROR: "Seat Required" });
    } else {
      const newBooking = await new connection({
        movie: req.body.movie,
        slot: req.body.slot,
        seats: {
          A1: req.body.seats.A1,
          A2: req.body.seats.A2,
          A3: req.body.seats.A3,
          A4: req.body.seats.A4,
          D1: req.body.seats.D1,
          D2: req.body.seats.D2,
        },
      });
      newBooking.save();
      res.status(200).send({
        booking: "Booking Successfull",
        bookingDetails: newBooking,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
/////////////////////   This API is for getting the Last Booking details  //////////////////////////////
app.get("/api/booking", async (req, res) => {
  try {
    const lastBookings = await connection
      .find()
      .sort({ $natural: -1 })
      .limit(1);

      res.json(lastBookings);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
