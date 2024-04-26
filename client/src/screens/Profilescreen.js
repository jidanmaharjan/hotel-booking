import { Tabs } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Error from "../components/Error";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';
import { Divider, Tag } from 'antd';

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
  };

const Profilescreen = () => {

  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if(!user){
      window.location.href='/login'
    }

  },[])

    return ( <div className='ml-3 mt-3'>
         <Tabs defaultActiveKey="1" onChange={onChange}>
    <TabPane tab="Profile" key="1">
      <h6>Name : {user.name}</h6> 
      <h6>Email: {user.email}</h6>
      <h6>Account Type: {user.isAdmin? 'Admin' : 'Customer'}</h6>
    </TabPane>
    <TabPane tab="Bookings" key="2">
      <Bookings />
    </TabPane>
  </Tabs>
    </div> );
}
 
export default Profilescreen;

export const Bookings = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  

  useEffect(()=>{
    setLoading(true);
    axios
    .post('/api/bookings/getbookingsbyuserid/', {userid : user._id})
    .then((response)=>{
      setBookings(response.data);
      setLoading(false);
    })
    .catch((errr)=>{
      console.log(errr);
      setLoading(false);
      setError(true);
    })
  },[])

  

  const cancelBooking = (bookingid , roomid) =>{
    
      setLoading(true);
      axios
      .post('/api/bookings/cancelbooking' , {bookingid, roomid})
      .then((response)=>{
        console.log(response);
        setLoading(false);
        Swal.fire('Congrats' , 'Your booking has been cancelled','success').then(response=>{
          window.location.reload();
        })
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      setError(true);
      Swal.fire('Oops' , 'Something went wrong','error')
      })
    
  }

    return ( 
      <div>
        <div className="row ">
          <div className="col-md-6">
            {loading && <Loader /> }
            {bookings && bookings.map(booking=>{
              return (
              <div className='bs mb-2' key={booking._id}>
                <h6>{booking.room}</h6>
                <p>Booking ID : {booking._id}</p>
                <p>Check IN : {booking.fromdate}</p>
                <p>Check OUT : {booking.todate}</p>
                <p>Amount : {booking.totalamount}</p>
                <p>Status : {booking.status === 'booked' ? <Tag color="green">CONFIRMED</Tag> : <Tag color="orange">CANCELLED</Tag> }
                
                </p>
                {booking.status === 'booked' &&
                <div className='text-right'>
                  <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id , booking.roomid)}}>CANCEL BOOKING</button>
                </div>
                }

              </div>
              )
              
            }) }
          </div>
        </div>
      </div>
     );
}
 
