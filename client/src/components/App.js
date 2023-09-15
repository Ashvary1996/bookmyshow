import React, {  useEffect, useState } from "react";
import '../styles/App.css';
import { movies, slots,} from "./data";
import axios from "axios";


const App = () => {
//const [lastdata,setlastData] = useState({});
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
const [state,setState] = useState({
  movie:"",
  slot:"",
  seats:{
    A1:"0",
    A2:"0",
    A3:"0",
    A4:"0",
    D1:"0",
    D2:"0"
  }
})

const sendData = {
  movie:movie,
            slot:slot,
            seats:{
              A1:seat.A1,
              A2:seat.A2,
              A3:seat.A3,
              A4:seat.A4,
              D1:seat.D1,
              D2:seat.D2
}}

const handleseats = (e)=>{
const { name, value } = e.target;
  setSeat({
    ...seat,
    [name]: value,
  });
  localStorage.setItem("selectedMovie",[movie,slot] );
}

//######---submit data--########//

  
const handleSubmit = async (e)=>{
  e.preventDefault();
  if(movie){
    if(slot){
      if(seat.A1 !== "0" || seat.A2 !== "0" || seat.A3 !== "0" || seat.A4 !== "0" || seat.D1 !== "0" || seat.D2 !== "0"  ){
        await axios.post('http://localhost:8080/api/booking', sendData)
        .then((res) => {
          console.log(res.data.bookingDetails,"this is result");
          const data = res.data.bookingDetails;
          setState({movie:data.movie,
            slot:data.slot,
            seats:{
              A1:data.seats.A1,
              A2:data.seats.A2,
              A3:data.seats.A3,
              A4:data.seats.A4,
              D1:data.seats.D1,
              D2:data.seats.D2
            }});
            setshow(true);
        }).then(()=>{
          localStorage.clear("selectedMovie")
          setMovie("");
          setSlot("");
          setSeat({    A1:"0",
          A2:"0",
          A3:"0",
          A4:"0",
          D1:"0",
          D2:"0"});
          alert('Ticket booked successfully');
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
      }
      else 
          {
            alert("Please Select Seats");
            return
          }
      }
      else
        {
        alert("Please Select Time Slot")
        return
        }
    }
    else
      {
      alert("Please Select Movie")
      return
      }
}

//######------ fetching last booking detail---#######//
useEffect(()=>{
    const localmovie = localStorage.getItem("selectedMovie");
    if(localmovie){
      setMovie(localmovie.split(",")[0]);
    setSlot(localmovie.split(",")[1])
    console.log(localmovie.split(",")[0],"this is from localdata")
    }
    
    axios.get('http://localhost:8080/api/booking')
   .then((response)=>{
      let fetchData = response.data[0] || response.data
      if(fetchData.length === 0){
        console.log("will  not work",fetchData)
        setshow(false);
      }else{
        console.log(" work",fetchData)
        setState(fetchData);
        setshow(true);
      }
      
   })
   .catch((err)=>{
    console.error(err);
   })
   // eslint-disable-next-line
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
                  {movies.map((item,index)=>(
                    <span key={index}>
                      <input type="radio" className="btn-check bold" name="movie_name" id={item} autoComplete="off"  onClick={handleseats} checked={movie === item}  />
                      <label className="btn btn-outline-danger black m-2" htmlFor={item}  onClick={()=>{setMovie(item)}} >{item}</label>
                    </span>
                  ))}
                </div>

                {/* movie timing selection */}
                <div className="movie-row">
                  <h5>Select a Time Slot</h5>
                  {slots.map((item,index)=>(
                    <span key={index}>
                      <input type="radio" className="btn-check" name="time_slot" id={item} autoComplete="off" onClick={handleseats} checked={slot === item} />
                      <label className="btn btn-outline-danger black m-2" htmlFor={item} onClick={()=>{setSlot(item)}}>{item}</label>
                    </span>
                  ))}
                </div>

                {/* theater seat selection */}
                <div className="movie-row">
                  <h5>Select the Seats</h5>
                  <input type="radio" className="btn-check" name="seat_slot" id="seat1" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat1">Type A1 <br/>
                  <input type="number" min={0} name="A1" onChange={handleseats} value={seat.A1} ></input>
                  </label>
                  
                  <input type="radio" className="btn-check" name="seat_slot" id="seat2" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat2">Type A2
                  <br/>
                  <input type="number"min={0} name="A2" onChange={handleseats} value={seat.A2} ></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat3" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat3">Type A3
                  <br/>
                  <input type="number" min={0} name="A3" onChange={handleseats} value={seat.A3} ></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat4" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat4">Type A4
                  <br/>
                  <input type="number" min={0} name="A4" onChange={handleseats} value={seat.A4}></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat5" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat5">Type D1
                  <br/>
                  <input type="number" min={0} name="D1" onChange={handleseats} value={seat.D1}></input></label>

                  <input type="radio" className="btn-check" name="seat_slot" id="seat6" autoComplete="off" />
                  <label className="btn btn-outline-danger m-2 black" htmlFor="seat6">Type D2
                  <br/>
                  <input type="number" min={0} name="D2" onChange={handleseats} value={seat.D2}></input></label>
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
              {show === false ? (
                <p className="bold red text-center">No record Found</p>
              ):
              ( 
                <div>
                  <h5 className="bold">Last Booking Detail</h5>
                  <h6 className="bold">Seats:</h6>
                  <h6 className="bold">A1: <span className="red">{state.seats.A1 }</span></h6>
                  <h6 className="bold">A2: <span className="red">{state.seats.A2 }</span></h6>
                  <h6 className="bold">A3: <span className="red">{state.seats.A3 }</span></h6>
                  <h6 className="bold">A4: <span className="red">{state.seats.A4 }</span></h6>
                  <h6 className="bold">D1: <span className="red">{state.seats.D1 }</span></h6>
                  <h6 className="bold">D2: <span className="red">{state.seats.D2 }</span></h6>
                  <h6 className="bold">Slot: <span className="red">{state.slot }</span></h6>
                  <h6 className="bold">Movie: <span className="red">{state.movie }</span></h6>
                </div>
              )}
            </div>
            
        </div>
    </div>

  </>);
}


export default App;