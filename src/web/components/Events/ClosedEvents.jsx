import React from 'react';
import {  Link } from "react-router-dom";
import {get_all_events} from "../../../admin/controllers/event.controller";
import { useState ,useEffect} from 'react';

function ClosedEvents() {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var res = await get_all_events();
    await setEvents(res.data.data);
  }
  
  var today = new Date();
  var status = null;

  const loadData = () => {
    var i = 0;
    return events.slice(0).reverse().map((events, index) => {

      var eventDate = new Date(events.eventDate);
        if(today <= eventDate)
          status = "Open"
        else
          status = "Closed"
          
      if(status != "Open" && i < 6){
        i++;
     return (
        <Link to={"/view/"+events._id} key={index} className="closed-event-card" style={{display:"block"}} >
               <div className="col">
          <div className="card mt-5">
            <div className="view closed-event-img">
              <img className="card-img-top" src={events.banner}
                alt="Card image cap" />
            </div>
            <div className="card-body">
              <h4 className="card-title">{events.eventName}</h4>
              <hr className="hr-dark mt-4"/>
              <div className="row">
          <div className="col-2 event-card-text">
              <i className="far fa-calendar-alt mr-2"></i>{(new Date(events.eventDate).toDateString())}
          </div>
          <div className="col-9 event-card-text">
              <i className="fas fa-map-marker-alt mr-2"></i>{events.venue}
          </div>
        </div>
            </div>
          </div>
          </div>
          </Link>
      );
      }
    }); 
      };


    return (
    <div className="container">

        <h1 className="text-center text-danger">CLOSED EVENTS</h1>
        <p className="text-center">These are the past events of the organization. Click on an event to view more details.</p>

        <div className="row row-cols-1 row-cols-md-2">
            {loadData()}
        </div>

        <div className="row mt-5">
    <div className="col text-center">
        <Link to="/allEvents" className="btn btn-outline-primary waves-effect mt-5" >All Events</Link>
    </div>
    </div>
        </div>
    );
 }

export default ClosedEvents;
