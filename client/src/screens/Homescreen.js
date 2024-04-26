import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Room from "../components/Room";
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";


function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { RangePicker } = DatePicker;
  const[fromdate,setFromDate] = useState('');
  const[todate,setToDate] = useState('');
  const [duplicaterooms,setDuplicateRooms] = useState([]);
  const [searchkey,setSearchKey] = useState('');
  const [type,setType] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/rooms/getallrooms")
      .then((response) => {
        setRooms(response.data);
        setDuplicateRooms(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filterByDate = (dates) =>{
    
    setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
    setToDate(moment(dates[1]).format('DD-MM-YYYY'));

    let temprooms = []
    
    for(const room of duplicaterooms)
    {
      let availability = false;
      if(room.currentbookings.length>0){
        for(const booking of room.currentbookings){
          if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)&&
          !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate))
          {
            if(
            moment(dates[0]).format('DD-MM-YYYY')!==booking.fromdate &&
            moment(dates[0]).format('DD-MM-YYYY')!==booking.todate &&
            moment(dates[1]).format('DD-MM-YYYY')!==booking.fromdate &&
            moment(dates[1]).format('DD-MM-YYYY')!==booking.todate
            ){
              availability = true;
            }
          }
        }
      }
      if(availability === true || room.currentbookings.length===0)
      {
        temprooms.push(room);
        
      }
      setRooms(temprooms);
    }

  }

  const filterbysearch = () =>{
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms);
  }

  const filterByType = (e) =>{
    setType(e);
    if(e === 'all')
    {
      setRooms(duplicaterooms);
    }
    else{
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase() === e.toLowerCase())
    setRooms(temprooms);
    }
    
  }

  return (
    <div className="container">
      <div className="row mt-5 bs filter-div">
        <div className="col-md-4">
        <RangePicker format='DD-MM-YYYY' onChange={filterByDate}  />
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="search rooms" value={searchkey} onChange={(e)=>setSearchKey(e.target.value)} onKeyUp={filterbysearch} />
        </div>
        <select value={type} onChange={(e)=>filterByType(e.target.value)} className="col-md-3">
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-delux</option>
        </select>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1> <Loader/> </h1>
        ) : 
        rooms.map((room) => {
            return <div className="col-md-9 mt-2" key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          }) }
      </div>
    </div>
  );
}

export default Homescreen;
