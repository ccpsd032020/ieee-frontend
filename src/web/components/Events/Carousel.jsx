import React from 'react';
import {get_all_events} from "../../../admin/controllers/event.controller";
import { useState ,useEffect} from 'react';

function Carousel() {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var res = await get_all_events();
    await setEvents(res.data.data);
  }

  var today = new Date();
  var status = null;

  const loadData = () => {
    var i = 0;
    return events.slice(0).reverse().map((events, index) => {

      var eventDate = new Date(events.eventDate);
      if(today <= eventDate)
        status = "Open"
      else
        status = "Closed"

      if(status == "Open" && i < 3){
        i++;
        if(i == 1){   return (
          <div className="carousel-item active" key={index}>
            <div className="view">
              <img className="d-block w-100" src={events.banner}
                alt="Third slide" />
              <div className="mask rgba-black-slight"></div>
            </div>
            <div className="carousel-caption">
            </div>
          </div>
        );}else{
          return (
            <div className="carousel-item" key={index}>
              <div className="view">
                <img className="d-block w-100" src={events.banner}
                  alt="Third slide" />
                <div className="mask rgba-black-slight"></div>
              </div>
              <div className="carousel-caption">
              </div>
            </div>
          )
        }
   
      }
    }); 
      };

   return (<div id="carousel-example-2" className="carousel slide carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carousel-example-2" data-slide-to="0" className="active"></li>
        <li data-target="#carousel-example-2" data-slide-to="1"></li>
        <li data-target="#carousel-example-2" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" role="listbox" style={{maxHeight:"400px"}}>

        {loadData()}

      </div>
      
      <a className="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      
    </div>
    );
}

export default Carousel ;
