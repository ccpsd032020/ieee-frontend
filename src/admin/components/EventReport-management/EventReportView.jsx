import React, { useState, useEffect } from "react";
import moment from "moment";
import Config from "../../controllers/config.controller";
import { useLocation, useParams } from "react-router-dom";
//importing the methods and the controllers
import { get_spec_report } from "../../controllers/event.report.controller";

const EventReportView = (props) => {
  //getting the parameters
  const params = useParams();
  const id = params.id;

  //setting the event report details
  const [eventsReports, SetEventReports] = useState({
    eventName: "",
    created_at: "",
    submissionComment: "",
    submssionState: "Submited",
    file_path: "",
  });

  useEffect(() => {
    //calling the method to get the data from the db
    eventReportDetails(id);
  }, []);

  //method to get the data from the db
  const eventReportDetails = async (id) => {
    //calling the method from the controller
    const result = await get_spec_report(id);
    SetEventReports(result.message.data);
  };

  //getting the file name
  const getFileName = (URL) => {
    let parts = URL.split("/");
    return parts.pop() || parts.pop();
  };

  return (
    <section className="content" style={{ display: props.display }}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
          </div>
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
                        Report for an Event
                      </h3>
                    </div>

                    <div class="card-body">
                      <form>
                        <div class="form-group">
                          <label for="inputFName">Report Name : </label>
                          <input
                            type="text"
                            id="inputReportNameView"
                            readOnly
                            value={getFileName(eventsReports.file_path)}
                            class="form-control"
                          />

                          <label for="inputEName">Event Name : </label>
                          <input
                            type="text"
                            id="inputEventNameView"
                            name="eventname"
                            class="form-control"
                            value={eventsReports.eventName}
                            readOnly
                          />

                          <label for="inputEName">Submission Status : </label>
                          <input
                            type="text"
                            name="submissionstate"
                            id="inputSubmissionStatus"
                            value="Submited"
                            class="form-control"
                            readOnly
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
                              name="date"
                              class="form-control"
                              readOnly
                              data-inputmask-alias="datetime"
                              data-inputmask-inputformat="dd/mm/yyyy"
                              data-mask
                              value={eventsReports.created_at}
                            />
                          </div>

                          <div class="form-group">
                            <label for="inputSCmnt">
                              Submission Comments :{" "}
                            </label>
                            <input
                              type="text"
                              id="inputSCommentsView"
                              class="form-control"
                              readOnly
                              value={eventsReports.submissionComment}
                              name="submissioncomment"
                            />
                          </div>
                          <div>
                            <a
                              href={eventsReports.file_path}
                              className="card-link m-3"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="far fa-file-pdf"></i>
                              <span className="ml-4">
                                {getFileName(eventsReports.file_path)}
                              </span>
                            </a>
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

export default EventReportView;
