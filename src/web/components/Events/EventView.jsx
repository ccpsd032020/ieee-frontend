import React from 'react';
import {get_event} from "../../../admin/controllers/event.controller";
import { useState,useEffect } from 'react';
import {useParams } from "react-router-dom";
import NavBar from '../Common/NavBar';
import Footer from '../Common/Footer';
import $ from "jquery";
import Axios from 'axios';
import Config from '../../controllers/config.controller';

function EventView() {

    const [event, setEvent] = useState({event:['']});
    const [formData, setFormData] = useState([]);
    let { eventId } = useParams();
    var k=0;
    var responder;

    useEffect(() => {
      onLoadEvent(eventId);
  }, []); 

    const onLoadEvent = async (eventId) => {
      const result = await get_event(eventId);
      await  setEvent(result.data.data);
    }

    const loadRegForm = () => {
      if(event.registrationForm == null)  
        return ( <div className="d-flex justify-content-center"><h3 className="text-primary mt-3 mb-3">No Event Form</h3></div>);
      else{
        var RegFormBody = document.getElementById("regFormBody");
        var count  = RegFormBody.childElementCount;
        if(count === 1){          
          $("#regFormBody").append(event.registrationForm); 
          return(<button type='submit' style={{display : event.registrationForm == null && "none" }} className='btn btn-outline-primary btn-block'>Register</button>);
        }
      }
    };

    const sendData = async e =>{
      e.preventDefault();
     
      const data = new FormData();

      data.append("eventId", eventId);

      while(k < event.registrationForm.length){

        formData.push(e.target[k].value)
        setFormData(formData)
  
        if(e.target[k].id ===  "MemberIDField" || e.target[k].id === "PublicField")
          responder = e.target[k].value;

        k++;
      }
      
      k = 0;

      data.append("formData", formData);
      data.append("responder", responder);

      try{
        const res = await Axios.post('/event/register',data);
  
        if(res.status === 201)
        {
          $('#regForm').trigger("reset");
          Config.setToast("Registered Successfully!")
        }
      }catch(err){
        if(err.response.status === 500)
            console.log('There was a problem with then server');
          else
            console.log(err.response.data);
      }
    }

    return (<div>
        <NavBar/>
        <section className="content" >
      <div className="card">
        <div className="card-header">
        <div className="row">
        <div className="col-6">
          <h3 className="card-title">Event Details</h3>
          </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-1 order-md-1">
            <img className="mb-4 shadow-lg bg-white rounded w-100" alt="Event Banner" src={__dirname+"images/Events/"+event.banner} style={{float:"left", maxWidth:"100%", maxHeight:"300px" }} />
         
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Date<i className="far fa-calendar-alt ml-2"></i></span>
                        <span className="info-box-number text-center text-muted mb-0">{(new Date(event.eventDate).toDateString())}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Time<i className="far fa-clock ml-2"></i></span>
                      <span className="info-box-number text-center text-muted mb-0">{event.startTime} to {event.endTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-12 col-sm-12">
                  <div className="info-box bg-light">
                    <div className="info-box-content">
                      <span className="info-box-text text-center text-muted">Venue<i className="fas fa-map-marker-alt ml-2"></i></span>
                      <span className="info-box-number text-center text-muted mb-0">{event.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row info-box bg-light">
                <div className="col-12 px-4">
             
              <h3 className="text-primary mt-3 mb-3">{event.eventName}</h3>
              <div className="text-muted">
                <p className="text-md"><i className="fas fa-bullhorn"></i> <b>{event.hostingAffiliation}</b>
                </p>
              </div>
              <p className="text-muted" style={{lineHeight:"2"}}>
              {event.description}
              </p>
              
                </div>
              </div>
            </div>
    
            <div className="col-12 col-md-12 col-lg-4 order-2 order-md-2">
            
            <form id="regForm"  method="post" onSubmit={sendData}>
            
            <div className="card-body" >
              
            <div className="info-box bg-light" style={{display : event.registrationForm == null && "none" }}>
           
                <div className="info-box-content" id="regFormBody" >
                  <div className="d-flex justify-content-center">
                      <h3 className="text-primary mt-3 mb-3">Event Registration Form </h3>
                  </div>
                </div>
            </div>
            </div>      
            <div className="card-footer" id="regFormFooter">
            { loadRegForm()}
            </div>    
            </form>

            </div>
          </div>
        </div>
        {/* <!-- /.card-body --> */}
      </div>
      {/* <!-- /.card --> */}
    
    </section>
    <Footer />
    </div>
    );
 }

export default EventView;
