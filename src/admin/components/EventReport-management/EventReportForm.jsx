import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Config from "../../controllers/config.controller";
//importing the controller and the methods
import { add_event_report } from "../../controllers/event.report.controller";

const EventReportAdd = (props) => {
  //getting the parameters
  let { val } = useParams();
  let { id } = useParams();
  let { aff } = useParams();

  //seeting the report submission status
  const [submit, setSubmit] = useState({
    value1: "Not Submitted",
  });

  //setting the today date
  const [today, setToday] = useState();

  //function to get the today date
  const todayfucn = () => {
    let newDate = new Date();
    const today = moment(newDate).format("MMM Do YY");
    setToday(today);
  };


  useEffect(() => {
    let newDate = new Date();
    const today = moment(newDate).format("MMM Do YY");
    setToday(today);
    todayfucn();
  });

  //setting the event report details
  let [event, setEvent] = useState({
    eventId: id,
    eventname: val,
    hostingAffiliation: aff,
    submissionstate: "Not Submitted",
    date: moment(new Date()).format("MMM Do YY"),
    submissioncomment: "",
    file: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  //method to event report adding
  const onSubmit = async (e) => {
    e.preventDefault();

    //checking whether the file is selected
    if(event.file == "")
    {
      Config.setToast("Please select a file!!");
    }
    
    //calling the method from the controller
    else{
    const result = await add_event_report(event);
      if (result.code == 200) {
        clear();
        Config.setToast("Report Added Successfully");
      }
    }
      //else if(result.code == 403){
      //  Config.setToast("Already Added the report");
      //}
      //Commented part should added if one event only need one report
  };

  const clear = () => {
    setEvent({
      eventId: id,
      eventname: val,
      submissionstate: "Not Submitted",
      date: today,
      submissioncomment: "",
    });
  };

  const handleChangeFile = (e) => {
    if (e.target.files.length) {
      setEvent({ ...event, file: e.target.files[0] });
    }
  };

  return (
    <section className="content" style={{ display: props.display }}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <section class="content">
              <div class="row justify-content-md-center">
                <div class="col-md-12">
                  <div class="card card-primary">
                    <div class="card-header">
                      <h3
                        class="card-title pb-1 mb-1"
                        style={{ fontWeight: "600" }}
                      >
                        Add a New Report for an Event
                      </h3>
                      <p class="card-title" style={{ fontSize: "12px" }}>
                        Event Manager should submit an report after finishing an
                        event. He/She must include all the relevent information
                        about the event. The report should be in .pdf format.
                      </p>
                    </div>

                    <div class="card-body">
                      <form onSubmit={onSubmit}>
                        <div class="form-group">
                          <label for="inputFName">Report : </label>
                          <input
                            accept="application/pdf"
                            className="form-control"
                            id="inputReportName"
                            name="inputReportName"
                            type="file"
                            onChange={handleChangeFile}
                            required=""
                          />

                          <label for="inputEName">Event Name : </label>
                          <input
                            type="text"
                            id="inputEventName"
                            name="eventname"
                            class="form-control"
                            value={event.eventname}
                            readOnly
                          />

                          <label for="inputEName">Submission Status : </label>
                          <input
                            type="text"
                            name="submissionstate"
                            id="inputSubmissionStatus"
                            class="form-control"
                            readOnly
                            value={event.submissionstate}
                          />

                          <label>Date :</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="far fa-calendar-alt"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              value={event.date}
                              name="date"
                              class="form-control"
                              data-inputmask-alias="datetime"
                              data-inputmask-inputformat="dd/mm/yyyy"
                              data-mask
                            />
                          </div>

                          <div class="form-group">
                            <label for="inputSCmnt">
                              Submission Comments :{" "}
                            </label>
                            <input
                              type="text"
                              id="inputSComments"
                              class="form-control"
                              onChange={handleChange}
                              value={event.submissioncomment}
                              name="submissioncomment"
                              required
                            />
                          </div>

                          <div class="card-footer" style={{ padding: "0px " }}>
                            <button type="submit" class="btn btn-info">
                              Add Submission
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventReportAdd;
