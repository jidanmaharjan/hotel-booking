import { useState } from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Room({room , fromdate, todate}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return ( <div className="row bs align-items-center">
        <div className="col-md-5">
            <img src={room.imageurls[0]} className="smallimg" alt="" />
        </div>
        <div className="col-md-7 ">
            <h1>{room.name}</h1>
            <p>Max Count : {room.maxcount} </p>
            <p>Phone Number : {room.phonenumber} </p>
            <p>Type : {room.type} </p>
            <div>
                <button className="btn btn-primary" onClick={handleShow}> View Details</button>
                {(fromdate && todate)&&(
                <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-primary m-2"> Book Now</button>
                </Link>)
                }
            </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
        {room.imageurls.map(url =>{
            return <Carousel.Item key={url}>
            <img
              className="d-block w-100"
              src={url}
              alt="First slide"
            />
          </Carousel.Item>
          })}
      
    </Carousel>

            <p>{room.description}</p>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to={`/book/${room._id}`}>
          <Button variant="primary" onClick={handleClose}>
            Book Now
          </Button>
          </Link>
          
        </Modal.Footer>
      </Modal>

    </div> );
}

export default Room;