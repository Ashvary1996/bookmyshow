import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data";
import axios from "axios";
//import bookmyshow_logo from './bookmyshow_logo.png';

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
    D2: "0"
  })
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
  // console.log("Movieticket", movieTicket);

  const handleseats = (e) => {
    const { name, value } = e.target;
    setSeat({ ...seat, [name]: value, });
    console.log(name, value);
    localStorage.setItem("selectedMovie", [movie, slot, seat]);
  };



  //######---submit data--########//
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie) {
      if (slot) {
        if (seat.A1 !== "0" || seat.A2 !== "0" || seat.A3 !== "0" || seat.A4 !== "0" || seat.D1 !== "0" || seat.D2 !== "0") {
          await axios
            .post("/api/booking", movieTicket)
            .then(() => {
              alert("Ticket booked successfully");
              setlastBooking(movieTicket);
              setDisplay(true)
            })
            .catch((error) => {
              console.error("Error sending data:", error);
            });
          localStorage.clear("selectedMovie")
          setMovie("");
          setSlot("");
          setSeat({
            A1: "0",
            A2: "0",
            A3: "0",
            A4: "0",
            D1: "0",
            D2: "0"
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

  //######------ fetching last booking detail---#######//
  useEffect(() => {
    const localmovie = localStorage.getItem("selectedMovie");
    if (localmovie) {
      setMovie(localmovie.split(",")[0]);
      setSlot(localmovie.split(",")[1])
      // setSeat(localmovie.split(",")[2])
      console.log(localmovie.split(",")[0], "this is from localdata")
    }

    axios
      .get("/api/booking")
      .then((response) => {
        let fetchData = response.data[0] || response.data;
        if (fetchData.length == 0) {
          // console.log("Data not exists", fetchData);
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
          <h4 className="book">
            book<span className="my">my</span>show
          </h4>
          <form onSubmit={handleSubmit}>
            <div>
              {/* movie selection */}
              <div className="movie-row">
                <h5>Select a movie</h5>

                {movies.map((smovie, index) => (
                  <div key={index} className="d-inline">
                    <input
                      index={index}
                      type="radio"
                      className="btn-check"
                      name="movie_name"
                      id={"smovie" + index}
                      autoComplete="off"
                      checked={movie === smovie}
                      
                    />
                    <label

                      index={index}
                      className="btn btn-outline-danger m-2"
                      htmlFor={"smovie" + index}
                      // checked={movie === smovie}
                      onClick={() => {
                        setMovie(smovie), console.log(smovie);
                        localStorage.setItem("selectedMovie", [smovie, slot, seat]);
                      }}
                    >
                      {smovie}
                    </label>
                  </div>
                ))}
              </div>
              {/* movie timing selection */}

              <div className="movie-row ">
                <h5>Select a Time Slot</h5>

                {slots.map((eslot, index) => (
                  <div key={index} className="d-inline">
                    <input
                      index={index}
                      type="radio"
                      className="btn-check"
                      name="time_slot"
                      id={"time" + index}
                      autoComplete="off"
                      checked={slot === eslot}

                    />
                    <label
                      className="btn btn-outline-danger m-2"
                      htmlFor={"time" + index}

                      onClick={() => {
                        setSlot(eslot), console.log(eslot),
                          localStorage.setItem("selectedMovie", [movie, eslot, seat]);
                      }}>
                      {eslot}

                    </label>

                  </div>
                ))}
              </div>

              {/* theater seat selection */}
              <div className="movie-row">
                <h5>Select the Seats</h5>
                {
                  seats.map((eseat, index) => (
                    <div key={index} className="d-inline"  >

                      <input
                        type="radio"
                        className="btn-check"
                        name="seat_slot"
                        id={"eseat" + index}
                        autoComplete="off"
                        checked={seat === eseat}
                        
                      />

                      <label className="btn btn-outline-danger m-2" htmlFor={"eseat" + index} >
                        Type {eseat} <br />

                        <input
                          type="number"
                          max={10}
                          min={0}
                          name={eseat}
                          className="seatValue "
                          onChange={handleseats}
                          onClick={() => localStorage.setItem("selectedMovie", [movie, slot, eseat])}

                          value={seat[eseat]}
                        // checked={seat === seat[eseat]}

                        ></input>
                      </label>

                    </div>
                  ))
                }

              </div>
            </div>
            <div className="book-button">
              <button>Book Now</button>
            </div>
          </form>
        </div >

        {/* Last booking Detail */}
        <div div className="column-2" >
          <div className="movie-row">
            {display == false ? (
              <p>No record Found</p>
            ) : (
              <div>
                <h5>Last Booking Details</h5>
                <h6>Seats:</h6>
                <h6>A1: <span>{lastBooking.seats.A1}</span></h6>
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
        </div >
      </div >
    </>
  );
};

export default App;


{seats.map((eseat, index) => (
  <div key={index} className="d-inline">

    <input
      type="radio"
      className="btn-check"
      name="seat_slot"
      id={"eseat" + index}

      autoComplete="off"
    // checked={seat === eseat}
    />

    <label
      className="btn btn-outline-danger m-2"
      htmlFor={"eseat" + index}
    >
      Type {eseat} <br />
      <input
        type="number"
        max={10} ///////////////////IMP below Id ////////////
        // id={"seat"+"-"+"eseat"} need to fix this according to given id
        // id={`seat-${eseat}`}
        min={0}
        name={eseat}
        className="seatValue "
        onChange={handleseats}
        // onClick={() => localStorage.setItem("selectedMovie", [movie, slot, eseat])}
        value={seat[eseat]}
      ></input>
    </label>
  </div>
))}