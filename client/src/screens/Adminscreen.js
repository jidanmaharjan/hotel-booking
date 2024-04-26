import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Tag } from "antd";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
const { TabPane } = Tabs;

const Adminscreen = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
    .post(`/api/users/checkadmin/${user._id}`)
    .then((response)=>{
        
       if (!(response.data === true)) {
      history("/");
      
    } 
    })
    .catch((error)=>{
        console.log(error);
        setLoading(false);
    })

    
  });

  return (
    <div>
      <h6 className="ml-3 mt-3">Dashboard</h6>
      <Tabs defaultActiveKey="1" className="ml-3 mt-3">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Users" key="3">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Adminscreen;

export const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("api/bookings/getallbookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
        
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered ">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Room Name</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>
                      {booking.status === "booked" ? (
                        <Tag color="green">CONFIRMED</Tag>
                      ) : (
                        <Tag color="orange">CANCELLED</Tag>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Rooms = () => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [roomname,setRoomName] = useState();
  const [rentperday,setRenyPerDay] = useState();
  const [maxcount,setMaxCount] = useState();
  const [phonenumber,setPhoneNumber] = useState();
  const [type,setType] = useState('Delux');
  const [description,setDescription] = useState();
  const [imgurl1,setImgurl1] = useState();
  const [imgurl2,setImgurl2] = useState();
  const [imgurl3,setImgurl3] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get("api/rooms/getallrooms")
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  },[]);

  const resetFields = ()=>{
setRoomName('');
setDescription('');
setMaxCount('');
setPhoneNumber('');
setRenyPerDay('');
setImgurl1('');
setImgurl2('');
setImgurl3('');
setType('Delux');
  }

  const addNewRoom = () => {
    const newroom ={
        name: roomname,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type: type,
        imageurls:[imgurl1, imgurl2, imgurl3]

    }
    setLoading(true);
    axios
    .post('/api/rooms/addroom', newroom)
    .then((response)=>{
        console.log(response);
        
        setLoading(false);
        Swal.fire('Congrats' , 'New room added successfully','success').then(response=>{
        resetFields();
        handleClose();
        }
           
        )
    })
    .catch((error)=>{
        console.log(error);
        setLoading(false);
        Swal.fire('Oops' , 'Something went wrong','error')
    })
    
  };

  const deleteRoom = (id) =>{
    setLoading(true);
    axios
    .delete(`/api/rooms/${id}`)
    .then((response)=>{
        console.log(response);
        setLoading(false);
        Swal.fire('Done' , 'Room deleted successfully','success')
           
        
    })
    .catch((error)=>{
        console.log(error);
        setLoading(false);
        Swal.fire('Oops' , 'Something went wrong','error')
    })
  }

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        <button className="btn btn-success mb-2" onClick={handleShow}>
          Add New Room
        </button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>
              <h6>Enter Room Details</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading && <Loader/>}
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Name"
                  required
                  
                  value={roomname}
                  onChange={(e)=>{setRoomName(e.target.value)}}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rent per day"
                  required
                  value={rentperday}
                  onChange={(e)=>{setRenyPerDay(e.target.value)}}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max count"
                  required
                  maxlength="2"
                  value={maxcount}
                  onChange={(e)=>{setMaxCount(e.target.value)}}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  required
                  minlength="10"
                  maxlength="10"
                  value={phonenumber}
                  onChange={(e)=>{setPhoneNumber(e.target.value)}}
                />
                <select value={type}
                  onChange={(e)=>{setType(e.target.value)}} required>
                  <option value="Delux">Delux</option>
                  <option value="Non-delux">Non-Delux</option>
                </select>
              </div>
              <div className="col-md-6">
                <textarea
                  
                  className="form-control"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image Url 1"
                  required
                  value={imgurl1}
                  onChange={(e)=>{setImgurl1(e.target.value)}}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image Url 2"
                  required
                  value={imgurl2}
                  onChange={(e)=>{setImgurl2(e.target.value)}}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image Url 3"
                  required
                  value={imgurl3}
                  onChange={(e)=>{setImgurl3(e.target.value)}}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-dark" onClick={handleClose}>
              Close
            </Button>

            <Button className="btn btn-success" onClick={addNewRoom}>
              Confirm Add
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table table-bordered ">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>

                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                    <td>
                      {room.type === "Delux" ? (
                        <Tag color="gold">DELUX</Tag>
                      ) : (
                        <Tag color="lime">NON-DELUX</Tag>
                      )}
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={()=>deleteRoom(room._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Users = () => {
  const [loading, setLoading] = useState(false);
  const [userlist, setUserList] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("api/users/getallusers")
      .then((response) => {
        setUserList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered ">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Type</th>
            </tr>
          </thead>
          <tbody>
            {userlist.length &&
              userlist.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin === true ? (
                        <Tag color="purple">ADMIN</Tag>
                      ) : (
                        <Tag color="blue">CUSTOMER</Tag>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
