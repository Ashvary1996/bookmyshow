const express = require("express");
const routes = express.Router();
const { connection } = require("../connector");

///      This API is for Booking Movie      ///

routes.post("/booking", async (req, res) => {
  try {
    if (!req.body.movie) {
      res.status(400).json({ ERROR: "Movies Name Required" });
    } else if (!req.body.slot) {
      res.status(400).json({ ERROR: "Slot Required" });
    } else if (!req.body.seats) {
      res.status(400).json({ ERROR: "Seat Required" });
    } else {
      // Creating a new Movie-booking with the use of given Schema.
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
      newBooking.save(); //Saving In The Database
      res.status(200).send({
        booking: "Booking Successfull",
        bookingDetails: newBooking,
      });
    }
  } catch (error) {
    res.status(500).json(error); // This will show Any Error if it occurs.
  }
});

module.exports = routes;
