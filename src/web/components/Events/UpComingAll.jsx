import React from 'react';
import {  Link } from "react-router-dom";
import {get_all_events} from "../../../admin/controllers/event.controller";
import { useState ,useEffect} from 'react';
import NavBar from '../Common/NavBar';
import Footer from '../Common/Footer';

function UpComingAll() {

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
      return events.slice(0).reverse().map((events, index) => {

        var eventDate = new Date(events.eventDate);
        if(today <= eventDate)
          status = "Open"
        else
          status = "Closed"

        if(status == "Open"){
        return (
         <Link to={"/view/"+events._id} key={index} style={{display:"block"}} >
         <div className="card d-flex mt-5 justify-content-center event-card " >
             <img className="card-img-top h-75 d-inline-block event-card-img" src={__dirname+"images/Events/"+events.banner} alt="Card image cap"/>
             <div className="card-body event-card-body">
               <h4 className="card-title">{events.eventName}</h4>
               <hr className="hr-dark mt-4"/>
               {/* <p className="card-text" >Some quick e.</p> */}
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
           </Link>
        );
        }
      }); 
        };

   return ( 
     <div>
         <NavBar/>
   <div className="container mt-5">
   <h1 style={{color:"#1DA1F2"}} className="text-center">ALL UPCOMING EVENTS</h1>
   <p className="text-center">These are the upcoming events of the organization. Click on an event to view more details and register.</p>

   {loadData()}
    </div>
    <Footer />
   </div>);
}

export default UpComingAll;
