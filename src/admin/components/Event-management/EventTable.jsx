import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState ,useEffect} from 'react';
import {get_all_events,deleteEvent} from "../../controllers/event.controller";
import { add_activity } from '../../controllers/activity.controller'
import Config from "../../controllers/config.controller";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
import $ from "jquery"
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


function EventTable(props){

  const [events, setEvents] = useState([]);
  const [activity, setActivity] = useState({MemNo: "To be taken from redux", action: "Deleted an event",table: "Events",parameters: "not set",  datetime: ""});

    useEffect(() => {
      getData();
    }, []);
  
    //load event data and set the state
    async function getData() {
      var res = await get_all_events();
      await setEvents(res.data.data);
       //make the table a datatable
      $("#eventTable").dataTable();
    }

    //delete an event an fetch data agaain
    const onDelete = async (id,eName) => {
        const result = await deleteEvent(id)
        const date = new Date();
        activity.parameters = eName;
        activity.datetime = date.toLocaleString();
        await add_activity(activity)
        if(result.code == 200){
          Config.setToast(result.message)
          getData()
        }
      }

    var today = new Date();
    var status = null;

    //compare the current date with the event date to check the status of the event
    //return table rows based on the event state
    const loadData = () => {
      return events.map((events, index) => {
        var eventDate = new Date(events.eventDate);
        if(today <= eventDate)
          status = "Open";
        else
          status = "Closed";

          return (
           <tr key={index} >
           <td>{events.eventName}</td>
          <td >{events.hostingAffiliation}</td>
          <td>{(new Date(events.eventDate).toDateString())}</td>
          <td ><span className ={status == "Open" ? "badge badge-success" : "badge badge-danger"  }>{status}</span> </td>      
          <td className="project-actions text-center">   
              <Link to={"/Admin/EventView/"+events._id}  className="btn btn-primary btn-sm mr-1"><i className="fas fa-folder mr-1"/> View</Link> 
              <Link to={"/Admin/EventUpdate/"+events._id}  className="btn btn-info btn-sm mr-1 editEventBtn"><i className="fas fa-pencil-alt mr-1"/> Edit</Link> 
              <a className="btn btn-danger btn-sm mr-1" onClick={()=> onDelete(events._id,events.eventName)}> <i className="fas fa-trash mr-1" />Delete</a>
          </td>
      </tr>
        );
      }); 
        };


   return (      <div>
    <section className="content"  >
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <Link to="/admin/EventForm" type="button" id="addEventBtn" className="btn btn-success float-right add_btn ml-2"> Add Event</Link>
          <Link to="/Admin/EventReportTable" type="button" className="btn btn-info float-right add_btn"> Event Reports</Link>
          
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body">
          
        <table id="eventTable" className="table table-bordered table-striped dataTable">
            <thead>
            <tr>
              <th>Name</th>
              <th>Hosting Affiliation</th>
              <th style={{width: "15%"}}>Date</th>
              <th style={{width: "5%"}}>Status</th>
              <th style={{width: "25%"}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {loadData()}
            </tbody>
            <tfoot>
            <tr>
              <th>Name</th>
              <th>Hosting Affiliation</th>
              <th style={{width: "15%"}}>Date</th>
              <th style={{width: "5%"}}>Status</th>
              <th style={{width: "25%"}}>Action</th>
            </tr>
            </tfoot>
          </table>
        </div>
    </div>
    {/* <!-- /.container-fluid --> */}
    </div> 
 
  </section>
  </div> 
 );
}

export default EventTable;

