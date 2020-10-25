import React, { useState, useEffect } from "react";
import Config from "../../controllers/config.controller";
import { Link } from "react-router-dom";
import "jquery/dist/jquery"
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
//importing the methods and the controllers
import {
  get_all_reports,
  delete_report,
} from "../../controllers/event.report.controller";

const EventReportTable = (props) => {
  const [eventsReports, SetEventReports] = useState([]);

  useEffect(() => {
    //calling the  method to get the data into the table
    getData();
  }, []);

  //getData function is used to get the reports from the db
  async function getData() {
    var res = await get_all_reports();
    await SetEventReports(res.data.data);
    $("#eventReportTable").dataTable();
  }

  //delete an event report
  const delete_func = async (id) => {
    const res = await delete_report(id);
    if (res.code == 200) {
      Config.setToast("Report Deleted");
      getData();
      readydata();
    } else {
      Config.setToast("Something went wrong");
    }
  };

  //getting the file name
  const getFileName = (URL) => {
    let parts = URL.split("/");
    return parts.pop() || parts.pop();
  };

  //loading the data into the table
  const readydata = () => {
    return eventsReports.map((eventreport, i) => {
      return (   
        <tr key={i}>
          <td>{eventreport.eventName}</td>
          <td>{getFileName(eventreport.file_path)}</td>
          <td>{eventreport.hostingAffiliation}</td>
          {/* <td>{"Affiliation"}</td> */}
          <td className="project-actions text-center">
            <Link to={`/Admin/EventReportView/${eventreport._id}`} className="btn btn-primary btn-sm mr-1" style={{ color: "black" }}><i className="fas fa-folder mr-1" />View</Link>
            <a className="btn btn-danger btn-sm mr-1" onClick={() => delete_func(eventreport._id)}><i className="fas fa-trash mr-1" />Delete</a>
          </td>
        </tr>
      );
    });
  };

  return (
    <section className="content" style={{ display: props.display }}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
          </div>
          <div className="card-body">
            <table id="eventReportTable" className="table table-bordered table-striped dataTable">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Report Name</th>
                  <th>Affiliation</th>
                  <th style={{width: "25%"}}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {readydata()}
              </tbody>
              <tfoot>
                <tr>
                  <th>Event Name</th>
                  <th>Report Name</th>
                  <th>Affiliation</th>
                  <th style={{width: "25%"}}>Manage</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventReportTable;
