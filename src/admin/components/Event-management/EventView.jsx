import React from 'react';
import {useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import Config from '../../controllers/config.controller';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { get_event, deleteForm} from '../../controllers/event.controller';
import { add_activity } from '../../controllers/activity.controller'
import $ from "jquery";
import Axios from 'axios';

function EventView() {

    const [event, setEvent] = useState({event:['']});
    const [activity, setActivity] = useState({MemNo: "To be taken from redux", action: "Deleted an event form",table: "Events",parameters: "not set",  datetime: ""});
    const [formData, setFormData] = useState([]);
    let { eventId } = useParams();
    var i = 0,k=0;
    var responder;
  
    useEffect(() => {
      onLoadEvent(eventId);
  }, []); 
  
    //fetch event data and set state
    const onLoadEvent = async (eventId) => {
      const result = await get_event(eventId);//1
      await  setEvent(result.data.data);
    }

    //delete event form and fetch event data
    const onDelete = async (id,eName) => {
      const result = await deleteForm(id)
      const date = new Date();
      activity.parameters = eName;
      activity.datetime = date.toLocaleString();
      await add_activity(activity)
      if(result.code == 200){
        Config.setToast(result.message)
      }
      onLoadEvent(eventId)
    }

    //check if there is an registration form created for the event.
    //if not created show create form button eles append the form fields in the html
    const loadRegForm = () => {
      if(event.registrationForm == null)  
        return ( <div className="d-flex justify-content-center"><Link to={"/Admin/RegistrationForm/"+eventId} type="button" className="btn btn-outline-warning btn-block">Create Form</Link></div>);
      else{
        var adminRegFormBody = document.getElementById("adminRegFormBody");
        var count  = adminRegFormBody.childElementCount;
        if(count === 1){          
          $("#adminRegFormBody").append(event.registrationForm); 
          return(<button type='submit' style={{display : event.registrationForm == null && "none" }} className='btn btn-outline-primary btn-block'>Register</button>);
        }
      }
    };

    const sendData = async e =>{
      e.preventDefault();
     
      const data = new FormData();

      data.append("eventId", eventId);


      while(k < event.registrationForm.length){

        //if there is a selection field in the form add the selected option
        if(e.target[k].tagName === "SELECT")
          formData.push(e.target[k].options[e.target[k].selectedIndex].value);
        else
          formData.push(e.target[k].value)
      
        setFormData(formData)

        //MemberIDField & PublicField are predefined ids
        if(e.target[k].id ===  "MemberIDField" || e.target[k].id === "PublicField")
          responder = e.target[k].value;

        k++;
      }
      
      k = 0;

      data.append("formData", formData);
      data.append("responder", responder);

      try{
        const res = await Axios.post('https://ieeeserver.herokuapp.com/event/register',data);
  
        if(res.status === 201)
        {
          $('#adminRegForm').trigger("reset");
          Config.setToast("Registered Successfully!")
        }
      }catch(err){
        if(err.response.status === 500)
            Config.setToast('There was a problem with then server');
          else
            console.log(err.response.data);
      }
    }
    console.log(event.hostingAffiliation);
    console.log(event.eventName);
    // const id = event.eventName;
  return (  <div>
    {/* <ContentHeader pageName={props.page}/> */}
    <section className="content" >
  <div className="card">
    <div className="card-header">
    <div className="row">
    <div className="col-6">
      <h3 className="card-title">Event Details</h3>
      </div>
      <div className="col-6">
        
      <Link to= {`/Admin/EventReportForm/${event.eventName}/${eventId}/${event.hostingAffiliation}`}type="button" className="btn btn-info float-right add_btn ml-2">Add Report</Link>
      <Link to={"/Admin/EventAttendanceRegistered/"+eventId} type="button" className="btn btn-success float-right add_btn">Add Attendance</Link>
      </div>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-8 order-1 order-md-1">
        <div className="row">
        <img className="mb-4 shadow-lg bg-white rounded" alt="Event Banner" src={event.banner} style={{float:"left", width:"100%", maxHeight:"300px" }}/>
     </div>
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
         
          <h3 className="text-primary mt-3 mb-3">{event.eventName} </h3>
          <div className="text-muted">
            <p className="text-md"><i className="fas fa-bullhorn"></i> <b>{event.hostingAffiliation}</b>
            </p>
          </div>
          <p className="text-muted">{event.description}</p>
          
          <h5 className="mt-2 text-muted">Event Volunteers</h5>
          <ul className="list-unstyled">

             <li className="text-secondary" >{event.volunteers}</li>

          </ul>    
            </div>
          </div>
        </div>

        <div className="col-12 col-md-12 col-lg-4 order-2 order-md-2">
          
          <form id="adminRegForm"  method="post" onSubmit={sendData}>
            
            <div className="card-body" >
              
            <div className="container mb-3">
              <div className="row">
                <div className="col">
                  <Link to={"/Admin/Responses/"+eventId} type="button" className="btn btn-warning float-right btn-block text-white" style={{display : event.registrationForm == null && "none" }} id="responsesButton">View Responses</Link>
                </div>
                <div className="col">
                  <a className="btn btn-danger float-right btn-block text-white" id="deleteFormButton" onClick={()=> onDelete(eventId,event.eventName)} style={{display : event.registrationForm == null && "none" }}>Delete Form</a>
                </div>
              </div>
            </div>
         
            <div className="info-box bg-light" style={{display : event.registrationForm == null && "none" }}>
           
                <div className="info-box-content" id="adminRegFormBody" >
                  <div className="d-flex justify-content-center">
                      <h3 className="text-primary mt-3 mb-3">Event Registration Form </h3>
                  </div>
                </div>
            </div>
            </div>      
            <div className="card-footer" id="adminRegFormFooter">
            { loadRegForm()}
            </div>    
            </form>
           
          </div>
      </div>
    </div>
    {/* <!-- /.card-body --> */}
  </div>
  {/* <!-- /.card --> */}
</div>
</section>
</div>);
}

export default EventView;
