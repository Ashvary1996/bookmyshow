import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data";
import axios from "axios";
import LastBooking from "./LastBooking";

const BookMyShow = () => {
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

  const handleseats = (e) => {
    //  Selecting the types of seats at the time of booking movie
    const { name, value } = e.target;
    setSeat({ ...seat, [name]: value });
  };

  //  Saving the data in the database after completing all validation with the help of POST REQUEST. //
  const handleSubmit = async (e) => {
    e.preventDefault();
    //First Checking movie,slot,seat are selected by the user if selected then saving it.
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
          // Clearing all selection after successfully booking.
          localStorage.removeItem("movie");
          localStorage.removeItem("slot");
          localStorage.removeItem("seats");
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
        }
        //Returning alert if user is trying to booking without selecting movie,slot & seat.
        else {
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
  // name,movie,seats

  // <------ using => useEffect for fetching the last booking details to show it and also we are saving the data in local storage so in case if user reload the page without booking the movieticket he/she will get the same data after that. ------>//

  useEffect(() => {
    const localmovie = localStorage.getItem("movie");
    if (localmovie) {
      setMovie(localmovie);
    }
    const localSlot = localStorage.getItem("slot");
    if (localSlot) {
      setSlot(localSlot);
    }
    const localSeats = JSON.parse(localStorage.getItem("seats"));
    if (localSeats) {
      setSeat(localSeats);
    }
// this api is for details of last booking
    axios
      .get("/api/booking")
      .then((response) => {
        let fetchData = response.data[0] || response.data;
        if (fetchData.length == 0) {
          console.log("NO PREVIOUS BOOKING", fetchData);
          setDisplay(false);
        } else {
          setlastBooking(fetchData);
          setDisplay(true);
        }
      })
      .catch((err) => {
        console.error("No Previous Booking Available ", err);
      });
  }, []);
  return (
    <>
      {/* This Section is for Selecting the Movie-Booking  */}
      <div className="selectColumn">
        {/* This Column 1 is for selecting The movie,timeslot and seats*/}
        <h4 className=" fs-3 mb-3 ">
          book<span className="my">my</span>show
        </h4>

        <form onSubmit={handleSubmit}>
          <div>
            {/*....................Movie Selection .................. */}
            <div className="movie-row">
              <h5>Select a movie</h5>

              {/* Generating all given Movies */}
              {movies.map((smovie, index) => (
                <div
                  key={index}
                  className={`movie-column ${
                    movie == smovie ? "movie-column-selected" : ""
                  } `}
                  onClick={() => {
                    setMovie(smovie), localStorage.setItem("movie", [smovie]);
                  }}
                >
                  <h6> {smovie}</h6>
                </div>
              ))}
            </div>

            {/*................. Movie-Time-Slot selection................ */}
            <div className="slot-row">
              <h5>Select a Time Slot</h5>

              {/* Generating all given Time Slot */}
              {slots.map((eslot, index) => (
                <div
                  key={index}
                  className={`slot-column ${
                    slot == eslot ? "slot-column-selected" : ""
                  } `}
                  onClick={() => {
                    setSlot(eslot), localStorage.setItem("slot", eslot);
                  }}
                >
                  <h6>{eslot}</h6>
                </div>
              ))}
            </div>

            {/*................... Seat selection................ */}
            <div className="seat-row">
              <h5>Select the Seats</h5>

              {/*Generating all given seats*/}
              {seats.map((eseat, index) => (
                <div
                  key={index}
                  className={`seat-column ${
                    movieTicket.seats[eseat] > 0 &&
                    movieTicket.seats[eseat] === seat[eseat]

                      ? "seat-column-selected"
                      : ""
                  } `}
                >
                  <label htmlFor={`seat-${eseat}`}>
                    <h6> Type {eseat}</h6>
                  </label>

                  <input
                    className="d-flex text-center"
                    id={`seat-${eseat}`}
                    type="number"
                    max={20}
                    min={0}
                    name={eseat}
                    onChange={handleseats}
                    onClick={() => {localStorage.setItem("seats", JSON.stringify(seat));
                    }}
                    value={seat[eseat]}
                  ></input>
                </div>
              ))}
            </div>
          </div>

          <div className="book-button">
            <button>Book Now</button>
          </div>
        </form>
      </div>

      {/* This Section is for Displaying The Last booking Details  */}
      <div className="bookingColumn">
        <LastBooking display={display} lastBooking={lastBooking} />
      </div>
    </>
  );
};

export default BookMyShow;
