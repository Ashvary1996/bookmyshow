import React, { useEffect, useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css'
import { movies, slots } from "./data";
import axios from "axios";
//import bookmyshow_logo from './bookmyshow_logo.png';


const App = () => {
const [lastdata,setlastData] = useState({});
const [show,setshow] =useState(false);
const [movie, setMovie] = useState("");
const [slot, setSlot] = useState("");
const [seat , setSeat] = useState({
    A1:"0",
    A2:"0",
    A3:"0",
    A4:"0",
    D1:"0",
    D2:"0"
})

let state = {
  movie:movie,
  slot:slot,
  seats:{
    A1:seat.A1,
    A2:seat.A2,
    A3:seat.A3,
    A4:seat.A4,
    D1:seat.D1,
    D2:seat.D2
  }
}

const handleseats = (e)=>{
const { name, value } = e.target;
  setSeat({
    ...seat,
    [name]: value,
  });
}

//######---submit data--########//
const handleSubmit = async (e)=>{
  e.preventDefault();

  await axios.post('http://localhost:8080/api/booking', state)
  .then(() => {
    alert('Ticket booked successfully');
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error sending data:', error);
  });
}

//######------ fetching last booking detail---#######//
useEffect(()=>{
    axios.get('http://localhost:8080/api/booking')
   .then((response)=>{
      let fetchData = response.data[0] || response.data
      if(fetchData.length == 0){
        console.log("will  not work",fetchData)
        setshow(false);
      }else{
        console.log(" work",fetchData)
        setlastData(fetchData);
        setshow(true);
      }
      
   })
   .catch((err)=>{
    console.error(err);
   })
},[])

  return (<>  
    <div className="container">
        <div className="column-1">
            <h4 className="book">book<span className="my">my</span>show</h4>
            <form onSubmit={handleSubmit}>
            <div>
              {/* movie selection */}
                <div className="movie-row">
                  <h5>Select a movie</h5>
                  <input type="radio" className="btn-check bold" name="movie_name" id="movie1" autoComplete="off"  />
                  <label className="btn btn-outline-danger m-2" htmlFor="movie1"  onClick={()=>{setMovie(movies[0])}}>{movies[0]}</label>
                  
                  <input type="radio" className="btn-check" name="movie_name" id="movie2" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="movie2"  onClick={()=>{setMovie(movies[1])}} >{movies[1]}</label>

                  <input type="radio" className="btn-check" name="movie_name" id="movie3" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="movie3" onClick={()=>{setMovie(movies[2])}}>{movies[2]}</label>

                  <input type="radio" className="btn-check" name="movie_name" id="movie5" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="movie5" onClick={()=>{setMovie(movies[3])}}>{movies[3]}</label>

                  <input type="radio" className="btn-check" name="movie_name" id="movie4" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="movie4" onClick={()=>{setMovie(movies[4])}}>{movies[4]}</label>
                </div>

                {/* movie timing selection */}
                <div className="movie-row">
                  <h5>Select a Time Slot</h5>
                  <input type="radio" className="btn-check" name="time_slot" id="time1" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="time1" onClick={()=>{setSlot(slots[0])}}>{slots[0]}</label>
                  
                  <input type="radio" className="btn-check" name="time_slot" id="time2" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="time2" onClick={()=>{setSlot(slots[1])}}>{slots[1]}</label>

                  <input type="radio" className="btn-check" name="time_slot" id="time3" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="time3" onClick={()=>{setSlot(slots[2])}}>{slots[2]}</label>

                  <input type="radio" className="btn-check" name="time_slot" id="time4" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="time4" onClick={()=>{setSlot(slots[3])}}>{slots[3]}</label>

                  <input type="radio" className="btn-check" name="time_slot" id="time5" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="time5" onClick={()=>{setSlot(slots[4])}}>{slots[4]}</label>
                </div>

                {/* theater seat selection */}
                <div className="movie-row">
                  <h5>Select the Seats</h5>
                  <input type="radio" className="btn-check" name="seat_slot" id="seat1" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat1">Type A1 <br/>
                  <input type="number" min={0} name="A1" onChange={handleseats} defaultValue={0} ></input>
                  </label>
                  
                  <input type="radio" className="btn-check" name="seat_slot" id="seat2" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat2">Type A2
                  <br/>
                  <input type="number"min={0} name="A2" onChange={handleseats} defaultValue={0} ></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat3" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat3">Type A3
                  <br/>
                  <input type="number" min={0} name="A3" onChange={handleseats} defaultValue={0} ></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat4" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat4">Type A4
                  <br/>
                  <input type="number" min={0} name="A4" onChange={handleseats} defaultValue={0}></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat5" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat5">Type D1
                  <br/>
                  <input type="number" min={0} name="D1" onChange={handleseats} defaultValue={0}></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat6" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2" htmlFor="seat6">Type D2
                  <br/>
                  <input type="number" min={0} name="D2" onChange={handleseats} defaultValue={0}></input></label>
                </div>
            </div>
            <div className="book-button">
              <button>
                  Book Now
              </button>
            </div>
            </form>
        </div>

        {/* Last booking Detail */}
        <div className="column-2">
            <div className="movie-row">
              {show == false ? (
                <p>No record Found</p>
              ):
              ( 
                <div>
                  <h5>Last Booking Detail</h5>
                  <h6>Seats:</h6>
                  <h6>A1: <span>{lastdata.seats.A1}</span></h6>
                  <h6>A2: {lastdata.seats.A2}</h6>
                  <h6>A3: {lastdata.seats.A3}</h6>
                  <h6>A4: {lastdata.seats.A4}</h6>
                  <h6>D1: {lastdata.seats.D1}</h6>
                  <h6>D2: {lastdata.seats.D2}</h6>
                  <h6>Slot: {lastdata.slot}</h6>
                  <h6>Movie: {lastdata.movie}</h6>
                </div>
              )}
            </div>
            
        </div>
    </div>

  </>);
}


export default App;
