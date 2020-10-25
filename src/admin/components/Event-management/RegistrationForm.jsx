import React from 'react';
import {useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import ContentHeader from '../Dashboard/ContentHeader'
import { BrowserRouter as Router, Link } from "react-router-dom";
import {addRegistrationForm} from "../../controllers/event.controller";
import { add_activity } from '../../controllers/activity.controller'
import Config from "../../controllers/config.controller";
import $ from "jquery";
 import "../../../css/adminlte.css"

function RegistrationForm() {

    const [formFields, setformFields] = useState([]);
    const [activity, setActivity] = useState({MemNo: "To be taken from redux", action: "Added an event form",table: "Events",parameters: "not set",  datetime: ""});
    const [fieldName, setFieldName] = useState('');
    const [fieldNames, setFieldNames] = useState([]);
    const [eventType, setEventType] = useState();
    const [optionName, setOptionName] = useState();
    let { eventId } = useParams();
    var fieldId;

    //handle change of the field name field
    const handleChange = event =>
    { 
       setFieldName(event.target.value);
    };

    //handle change of the type field
    const handleTypeChange = event =>
    { 
       setEventType(event.target.value);
    };

    //handle change of the option field
    const handleOptionChange = event =>
    { 
      setOptionName(event.target.value);
    };

    //check if the added event is for membersOnly,public or none
    const addEventType = (event) => {
      event.preventDefault();
      if(eventType == "membersOnly"){

        fieldNames.push("Member ID");
        fieldId = fieldName.replace(/ /g, '');

        formFields.push("<div class='form-group'><label for='MemberIDField'>Member ID</label><br/><input type='text' class='form-control' id='MemberIDField' placeholder='Enter Member ID' required/></div>");
      }else if(eventType == "public"){

        fieldNames.push("Member ID or Email");
        fieldId = fieldName.replace(/ /g, '');

        formFields.push("<div class='form-group'><label for='PublicField'>Member ID (Enter Email if you are not a member)</label><br/><input type='text' class='form-control' id='PublicField' placeholder='Enter Member ID or Email' required/></div>");
      }else{
        return;
      }

      setformFields(formFields);
      setFieldNames(fieldNames)

      loadField();
      setFieldName('');
    };

    //add form fields based on fieldType
    const addField = (fieldType) =>{
        
        //remove the spaces from fieldName
        fieldId = fieldName.replace(/ /g, '');

        //reducre the size of the fieldId if it is too long
        if(fieldId.length > 30)
          fieldId = fieldId.substring(0,25);


        if(fieldType === "text")
          formFields.push("<div class='form-group'><label for='"+fieldId+"'>"+fieldName+"</label><br/><input type='text' class='form-control' id='"+fieldId+"' placeholder='Enter "+fieldName+"' required/></div>");
        else if(fieldType === "selection"){

          //convert the options string to an array
          var optionsArr = optionName.split(',');
          
          var optionsStr = '';

          optionsArr.forEach(option => {
            optionsStr = optionsStr.concat("<option value="+option+">"+option+"</option>")
        });

        if(fieldName == '')
          Config.setToast("Enter field name first!")
        else
          formFields.push("<div class='form-group'><label class='mr-sm-2' for='"+fieldId+"'>"+fieldName+"</label><select class='custom-select mr-sm-2' id='"+fieldId+"' required>"+optionsStr+"</select></div></div>");
        }
        else if(fieldType === "date")
          formFields.push("<div class='form-group'><label for='"+fieldId+"'>"+fieldName+"</label><br/><input type='date' class='form-control' id='"+fieldId+"'  required/></div>");
        else if(fieldType === "time")
          formFields.push("<div class='form-group'><label for='"+fieldId+"'>"+fieldName+"</label><br/><input type='time' class='form-control' id='"+fieldId+"'  required/></div>");
        else if(fieldType === "textArea")
          formFields.push("<div class='form-group'><label for='"+fieldId+"'>"+fieldName+"</label><br/><textarea class='form-control' id='"+fieldId+"' rows='3' required></textarea></div>");

        setformFields(formFields);
        fieldNames.push(fieldName);
        setFieldNames(fieldNames)

        loadField();
        setFieldName('');
        setOptionName('');
      }

      //append form fields to form preview section
    const loadField = () => {
        $("#previewRegFormBody").append($(formFields[formFields.length-1]))
    };

    //undo button
    const undo = () => {
      formFields.pop();
      setformFields(formFields);

      fieldNames.pop();
      setFieldNames(fieldNames)

      let previewRegFormBody = document.getElementById('previewRegFormBody');
      previewRegFormBody.removeChild(previewRegFormBody.lastElementChild);
    };

    const createForm =  async (e) => {
   
      const result = await addRegistrationForm (formFields, fieldNames ,eventId)

      const date = new Date();
      activity.parameters = eventId;
      activity.datetime = date.toLocaleString();
      await add_activity(activity)

      if(result.code == 200)
        Config.setToast("Registration Form Created Successfully!")
      else
        Config.setToast('There was a problem with then server');
      
    }

  return (  <div>
    {/* <ContentHeader pageName={props.page}/> */}
    <section className="content" >
  <div className="card">
    <div className="card-header">
    <div className="row">
    <div className="col-6">
      <h3 className="card-title">Create Event Registion Form</h3>
      </div>
      <div className="col-6">
        <Link to="/Admin/EventReportForm" type="button" className="btn btn-info float-right add_btn ml-2">Add Report</Link>
        <Link to="/Admin/EventAttendance" type="button" className="btn btn-success float-right add_btn">Add Attendance</Link>
      </div>
      </div>
    </div>

    <div className="card-body">
    <div className="row">
        <div className="col-12 col-md-12 col-lg-7 order-1 order-md-1">

        <div className="d-flex justify-content-center mb-3">
          <h2 className="m-0 text-dark">Event Form Preview</h2>
        </div>
        
        <form id="previewRegForm"  method="post" >
          
        <div className="info-box bg-light">
        <div className="info-box-content" >
        <div className="d-flex justify-content-center">  

        <div className="card-body" id="previewRegFormBody"> </div>

        </div></div></div>

        <button className='btn btn-outline-primary' disabled>Register</button>

        </form>
        </div>

        <div className="col-12 col-md-12 col-lg-5 order-2 order-md-2">
            
            <div className="card-body">

                <div className="form-group">
                <label htmlFor="eventTypeDropDown">Event Type</label>
                  <select class="custom-select" id="eventTypeDropDown" onChange={handleTypeChange} required>
                      <option selected>Select Event Type</option>
                      <option value="membersOnly">Members Only</option>
                      <option value="public">Public</option>
                      {/* <option value="none">none</option> */}
                    </select>
                </div>

                <button className="btn btn-primary mb-2" onClick={addEventType}>Add Field</button>

                <div className="form-group">
                    <label htmlFor="fieldName">Field Name</label>
                    <input type="text"  value={fieldName} onChange={handleChange} className="form-control" id="fieldName" placeholder="Enter Field name" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="selectionOptions">Option names (separate names by commas)</label>
                    <input type="text"  value={optionName} onChange={handleOptionChange} className="form-control" id="selectionOptions" placeholder="Enter option name" />
                </div>
              
                <button type="submit" className="btn btn-primary mb-2 mr-4" onClick={() => addField('text')}>Add Text Field</button>
                <button type="submit" className="btn btn-primary mb-2 mr-4" onClick={() => addField('date')}>Add Date Field</button>
                <button type="submit" className="btn btn-primary mb-2 mr-4" onClick={() => addField('time')}>Add Time Field</button> 
                <button type="submit" className="btn btn-primary mb-2" onClick={() => addField('selection')}>Add Selection Field</button>
                <button type="submit" className="btn btn-primary mb-2" onClick={() => addField('textArea')}>Add  Text Area Field</button>

                <button type="submit" className="btn btn-block btn-outline-danger mt-5" onClick={undo}>Undo</button>
                <button type="submit" className="btn btn-block btn-outline-warning" onClick={createForm}>Create From</button>
            </div>
            {/* <!-- /.card-body --> */}     
          

        </div>
      </div>
    </div>
    {/* <!-- /.card-body --> */}
  </div>
  {/* <!-- /.card --> */}

</section>
</div>);
}

export default RegistrationForm;