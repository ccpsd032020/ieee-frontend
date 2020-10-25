import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState ,useEffect} from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
import "jquery/dist/jquery"
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
//importing controllers
import Config from "../../controllers/config.controller";
import {get_responses} from "../../controllers/event.controller";
import {addEventAttendanceConfirmed} from "../../controllers/event.attendance.confirmed.controller";
import {get_specific_mem} from '../../controllers/memeber.controller'

 
function EventAttendanceRegistered(props) {
  //getting the parameters
  var { id } = useParams();
  
  //Onsubmit function used by the accept button in the table
  async function Onsubmit (r)  {
    let data2 = {
      eventId:id, 
      responder:r,
    }
    //calling the method in the controller
    addEventAttendanceConfirmed(data2).then(response =>{
     if (response.code == 200) {
      //loading the table again
      getData(id);
      loadData();
      Config.setToast("Confirmation email sent Successfully");
      Config.setToast("Confirmed Member Added Successfully");
     }
    })
  };

  //setting the responses
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    getData(id);
  }, []);

  //getData function is used to get the registered members from the db
  async function getData(id) {
    var res = await get_responses(id);
    if (res == null)
    {
      //checking the responses are null
      Config.setToast("There are no registered members for the event");
    }
    await setResponses(res.data.data);
    $("#eventattTable").dataTable();
  }

  //loadData function is used to load the data into the table
  const loadData = () => {
    return responses.map((responses, index) => {
        return (
         <tr key={index} >
           <td >{index+1}</td>
         <td name = {"responderT"+index} handle>{responses.responder}</td>
         <td className="project-actions text-center">   
        <a className="btn btn-info btn-sm mr-1" onClick = {(r)=> Onsubmit(responses.responder)} >  <i className="fas fa-pencil-alt mr-1"/>Accept </a>       
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
          <Link to = {"/Admin/EventAttendanceConfirmed/"+id} type="button" className="btn btn-success btn-sm float-right add_btn mr-2 my-2">Confirmed Members</Link>
          <Link to = {"/Admin/EventAttendanceAttended/"+id} type="button" className="btn btn-info btn-sm float-right add_btn mr-2 my-2">Attended Members</Link>
          <h5>Registered Members for the Event</h5>
            <table id="eventattTable" className="table table-bordered table-striped dataTable">
              <thead>
              <tr>
                <th>No : </th>
                <th>Membership Number/ Email</th>
                <th>Manage</th>
              </tr>
              </thead>
              <tbody>
                {/* calling the method to get the data in to the table view */}
                {loadData()}
              </tbody>
              <tfoot>
              <tr>
                <th>No : </th>
                <th>Membership Number / Email</th>
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



export default EventAttendanceRegistered;