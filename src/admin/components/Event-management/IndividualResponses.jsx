import React from 'react';
import { useState ,useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {get_responses, get_event} from "../../controllers/event.controller";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

function IndividualResponses(){

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

    const loadResponses = (number) => {
      return responses.map((response, index) => {
          return (
          <div className="card " key={index}>
          <div className="card-header bg-success" style={{fontWeight:"bold"}}>
            {response.formData[0]}
          </div>
          <ul className="list-group list-group-flush" id={"responseList"+index}>
            {   response.formData.map((answer, i) => { return(
                event.fieldNames != undefined && <li className="list-group-item" key={i}>{event.fieldNames[i] + " : " + answer}</li> 
            );
            } )
            }

          </ul>
        </div>
        );
      }); 
    };

   return (<div className="container">
   
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{responses.length}</h3>
                <p>User Responses</p>
             </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a href="#" className="small-box-footer"></a>
            </div>
          {loadResponses()}
   </div>
 );
}

export default IndividualResponses;

