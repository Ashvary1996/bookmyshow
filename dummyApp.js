import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data";
import axios from "axios";

const App = () => {
  const [lastBooking, setlastBooking] = useState({});
  const [display, setDisplay] = useState(false);
  const [movie, setMovie] = useState("");
  const [slot, setSlot] = useState("");
  const [seat, setSeat] = useState({
    A1: "0",
    A2: "0",
    A3: "0",
    A4: "0",
    D1: "0",
    D2: "0",
  });
  let movieTicket = {
    movie: movie,
    slot: slot,
    seats: {
      A1: seat.A1,
      A2: seat.A2,
      A3: seat.A3,
      A4: seat.A4,
      D1: seat.D1,
      D2: seat.D2,
    },
  };
  // console.log(movieTicket);

  // This handleseats function is for handeling seats at the time of booking movie. //
  const handleseats = (e) => {
    const { name, value } = e.target;
    setSeat({ ...seat, [name]: value });
    // console.log(name, value);
  };

  // The handleSubmit function is used to save movie,time,seats and saved the data in the database after completing all validation with the help of POST REQUEST. //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie) {
      if (slot) {
        if (
          seat.A1 !== "0" ||
          seat.A2 !== "0" ||
          seat.A3 !== "0" ||
          seat.A4 !== "0" ||
          seat.D1 !== "0" ||
          seat.D2 !== "0"
        ) {
          await axios
            .post("/api/booking", movieTicket)
            .then(() => {
              alert("Ticket booked successfully");
              setlastBooking(movieTicket);
              setDisplay(true);
            })
            .catch((error) => {
              console.error("Error sending data:", error);
            });
          localStorage.removeItem("selectedMovie");
          localStorage.removeItem("localSeats");
          setMovie("");
          setSlot("");
          setSeat({
            A1: "0",
            A2: "0",
            A3: "0",
            A4: "0",
            D1: "0",
            D2: "0",
          });

          console.log(seat, seat.value);
        } else {
          alert("Please Select Seats");
          return;
        }
      } else {
        alert("Please Select Time Slot");
        return;
      }
    } else {
      alert("Please Select Movie");
      return;
    }
  };

  // ------ Here we are using => useEffect for fetching the last booking details to show it and also we are saving the data in local storage so in case if user reload the page without booking the movieticket he will get the same data after that. ------//

  useEffect(() => {
    const localmovie = localStorage.getItem("selectedMovie");
    if (localmovie) {
      setMovie(localmovie.split(",")[0]);
      setSlot(localmovie.split(",")[1]);
    }
    const localSeats = JSON.parse(localStorage.getItem("localSeats"));
    if (localSeats) {
      setSeat(localSeats);
    }

    axios
      .get("/api/booking")
      .then((response) => {
        let fetchData = response.data[0] || response.data;
        if (fetchData.length == 0) {
          console.log("NO PREVIOUS BOOKING", fetchData);
          setDisplay(false);
        } else {
          // console.log("Last Booking :", fetchData);
          setlastBooking(fetchData);
          setDisplay(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="column-1">
          {/* This Column 1 is for selecting The movie,timeslot and seats*/}
          <h4 className="book">
            book<span className="my">my</span>show
          </h4>

          <form onSubmit={handleSubmit}>
            <div>
              {/* Movie Selection  */}
              <div className="movie-row">
                <h5>Select a movie</h5>

                {/* Generating all given Movies with the help of map */}
                {movies.map((smovie, index) => (
                  <div key={index} className="movie-column">
                    <input
                      index={index}
                      type="radio"
                      className="btn-check"
                      hidden
                      name="movie_name"
                      id={"smovie" + index}
                      autoComplete="off"
                      checked={movie === smovie}
                      onChange={() => {
                        setMovie(smovie),
                          //  console.log(smovie);
                          localStorage.setItem("selectedMovie", [smovie, slot]);
                      }}
                    />
                    <label
                      index={index}
                      className="btn btn-outline-danger m-2"
                      htmlFor={"smovie" + index}
                    >
                      {smovie}
                    </label>
                  </div>
                ))}
              </div>

              {/* Movie timing selection */}
              <div className="slot-row">
                <h5>Select a Time Slot</h5>

                {/* Generating all given Movies Time Slot with the help of map*/}
                {slots.map((eslot, index) => (
                  <div key={index} className="slot-column">
                    <input
                      index={index}
                      type="radio"
                      className="btn-check"
                      name="time_slot"
                      id={"time" + index}
                      autoComplete="off"
                      checked={slot === eslot}
                      onChange={() => {
                        setSlot(eslot),
                          // console.log(eslot),
                          localStorage.setItem("selectedMovie", [movie, eslot]);
                      }}
                    />

                    <label
                      className="btn btn-outline-danger m-2"
                      htmlFor={"time" + index}
                    >
                      {eslot}
                    </label>
                  </div>
                ))}
              </div>

              {/* Theater seat selection */}
              <div className="seat-row">
                <h5>Select the Seats</h5>

                {/*Generating all seats with the help of map */}
                {seats.map((eseat, index) => (
                  // <div key={index} className="d-inline">
                  <div key={index} className="seat-column seatdiv">
                    <label htmlFor={`seat-${eseat}`}>
                      <h6> Type {eseat}</h6>
                    </label>
                    <input
                      type="number"
                      max={10}
                      id={`seat-${eseat}`}
                      min={0}
                      name={eseat}
                      className="d-flex "
                      onChange={handleseats}
                      onClick={() =>
                        localStorage.setItem(
                          "localSeats",
                          JSON.stringify(seat)
                        )
                      }
                      value={seat[eseat]}
                    // checked={seat === seat}
                    ></input>
                  </div>
                  // </div>
                ))}
              </div>
            </div>
            <div className="book-button">
              <button>Book Now</button>
            </div>
          </form>
        </div>

        {/* This Sectioon is for Displaying The Last booking Details  */}
        <div className="column-2 ">
          <div className="movie-row">
            <h5>Last Booking Details</h5>

            {display == false ? (
              <p>No Previous Booking Found</p>
            ) : (
              <div>
                <h6>Seats:</h6>
                <h6>A1: {lastBooking.seats.A1}</h6>
                <h6>A2: {lastBooking.seats.A2}</h6>
                <h6>A3: {lastBooking.seats.A3}</h6>
                <h6>A4: {lastBooking.seats.A4}</h6>
                <h6>D1: {lastBooking.seats.D1}</h6>
                <h6>D2: {lastBooking.seats.D2}</h6>
                <h6>Slot: {lastBooking.slot}</h6>
                <h6>Movie: {lastBooking.movie}</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
