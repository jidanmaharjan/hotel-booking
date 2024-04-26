import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2';

const Bookingscreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const totaldays =
    moment
      .duration(
        moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))
      )
      .asDays() + 1;

  useEffect(() => {
    if(!('currentUser' in localStorage))
    {
      window.location.href='/login'
    }
    setLoading(true);
    axios
      .post("/api/rooms/getroombyid", { roomid: roomid })
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
        
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setLoading(false);
        
      });
  }, []);


const onToken = (token) =>{
    
    const totalamount = totaldays * room.rentperday;

    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    setLoading(true);
    axios
      .post("/api/bookings/bookroom", bookingDetails)
      .then((response) => {
        console.log(response);
        setLoading(false);
        Swal.fire('Congratulations','Your room booked successfully','success').then(response =>{
          window.location.href='/profile'
        }) 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire('Oops','Something went wrong','error')
      });
  }

  return (
    <div className="container">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div>
          <div className="row  bs mt-5">
            <div className="col-md-8 justify-self-start">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="" />
            </div>
            <div className="col-md-4 justify-self-end">
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date: {fromdate}</p>
                <p>To Date: {todate}</p>
                <p>Max Count : {room.maxcount} </p>
              </b>
              <div>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days: {totaldays}</p>
                  <p>Rent Per Day: {room.rentperday} </p>
                  <p>Total Amount: {totaldays * room.rentperday}</p>
                </b>
              </div>
              <div>
                
                <StripeCheckout
                    amount={totaldays * room.rentperday * 100}
                  token={onToken}
                  currency="AUD"
                  stripeKey="pk_test_51LLMtjBMj2sqTZV9AVRtb05nLD7LDolD8HjTgk9GWM7BfdanrzJ430Ouhe34x4WsfZwDwbreBdPIIKKOGKi5nIEV00Ny96QyFl"
                >
                <button className="btn btn-primary">
                  Pay Now
                </button>    
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Bookingscreen;
