import React from 'react';
import { useState ,useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {get_responses, get_event} from "../../controllers/event.controller";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

function ResponsesView(){

    const [responses, setResponses] = useState([]);  
    const [event, setEvent] = useState({event:['']});  
    let { eventId } = useParams();

    useEffect(() => {
      getData();
    }, []);
  
    async function getData() {
      var responseResults = await get_responses(eventId);
      var eventResults = await get_event(eventId);
      setResponses(responseResults.data.data);
      setEvent(eventResults.data.data);
    }


    const loadFields = () => {
      if(event.fieldNames != null){
      return event.fieldNames.map((field, index) => {

          return (
            <div className="card " key={index}>
            <div className="card-header bg-success" style={{fontWeight:"bold"}}>
              {field}
              <button className="btn btn-secondary float-right" type="button" data-toggle="collapse" data-target={"#responseList"+index} aria-expanded="false" aria-controls={"responseList"+index}><i className="fas fa-arrows-alt-v"></i></button>
            </div>
            <ul className="list-group list-group-flush" id={"responseList"+index}>
                {loadResponses(index)}
            </ul>
          </div>
        );
      }); 
    }
    };

    const loadResponses = (number) => {
      return responses.map((response, index) => {

          return (
          <li className="list-group-item" key={index}>{response.formData[number]}</li> 
        );
      }); 
    };

   return (<div className="container">
   
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{responses.length}</h3>
                <p>User Responses</p>
                    <Link to={"/Admin/IndividualResponses/"+eventId}  className="btn btn-info btn-md"><i className="fas fa-folder mr-1"/> View Individual</Link> 
                 </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a href="#" className="small-box-footer"></a>
            </div>
          {loadFields()}
   </div>
 );
}

export default ResponsesView;

