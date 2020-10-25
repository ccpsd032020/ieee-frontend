import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Config from "../../controllers/config.controller";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
import "jquery/dist/jquery"
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { useState ,useEffect} from 'react';
//importing the controller and the methods
import {addEventAttendanceAttended} from "../../controllers/event.attendance.attended.controller";
import {removeEventAttendanceConfirmed, getConfirmedMembersForAnEvent} from "../../controllers/event.attendance.confirmed.controller";

function EventAttendanceConfirmed(props) {
  //getting the parameters
  var { id } = useParams();

  //Onsubmit function used by the mark attendance button in the table
  async function Onsubmit (r)  {
    let data2 = {
      eventId:id, 
      responder:r,
    }
    //calling the method in the controller
    addEventAttendanceAttended(data2).then(response =>{
     if (response.code == 200) {
        //loading the table again
        getData(id);
        loadData()
       Config.setToast("Attended Member Added Successfully");
     }
   })
  };

  //OnRemove function used by the decline button in the table
  async function OnRemove (r)  {
    let data2 = {
      eventId:id, 
      responder:r,
    }
    //calling the method in the controller
    removeEventAttendanceConfirmed(data2).then(response =>{
     if (response.code == 200) {
      //loading the table again
      getData(id);
      loadData();
      Config.setToast("Confirmed Member Removed Successfully");
     }
    })
  };
  
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    getData(id);
  }, []);

  //getData function is used to get the confirmed members from the db
  async function getData(id) {
    var res = await getConfirmedMembersForAnEvent(id);
    await setResponses(res.data.data);
    $("#eventattCTable").dataTable();
  }


  //loadData function is used to load the data into the table
  const loadData = () => {
    return responses.map((responses, index) => {
        return (
         <tr key={index} >
          <td> {index+1}</td>
          <td name = {"responderT"+index}>{responses.responder}</td>
          <td className="project-actions text-center">   
          <a className="btn btn-info btn-sm mr-1" onClick = {(r)=> Onsubmit(responses.responder)} >  <i className="fas fa-calendar-check"/> Mark Attendance</a>
          <a className="btn btn-danger btn-sm mr-1" onClick={(r) => OnRemove(responses.responder)}> <i className="fas fa-trash mr-1"/>Remove</a>       
        </td>
    </tr>
      );
    }); 
  };

  return ( <section className="content" style={{display : props.display}}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
          </div>
          <div className="card-body">
          <Link to = {"/Admin/EventAttendanceRegistered/"+id} type="button" className="btn btn-success btn-sm float-right add_btn mr-2 my-2">Registered Members</Link>
          <Link to = {"/Admin/EventAttendanceAttended/"+id} type="button" className="btn btn-info btn-sm float-right add_btn mr-2 my-2">Attended Members</Link>

          <h5>Confirmed Members for the Event</h5>
            <table id="eventattCTable" className="table table-bordered table-striped dataTable">
              <thead>
              <tr>
              <th>No :</th>
                <th>Membership No/Email</th>
                <th>Manage</th>
              </tr>
              </thead>
              <tbody>
                {/* calling the method to load the data to the table */}
                {loadData()}
              </tbody>
              <tfoot>
              <tr>
                <th>No :</th>
                <th>Membership No/Email</th>
                <th>Manage</th>
              </tr>
              </tfoot>
            </table>
          </div>
      </div>
      </div>   
    </section>
    );
}


export default EventAttendanceConfirmed;