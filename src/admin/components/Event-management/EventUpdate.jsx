import React,{useState, useEffect} from 'react';
import Config from '../../controllers/config.controller';
import { get_all_active_members} from '../../controllers/memeber.controller'
import { get_event, deleteForm} from '../../controllers/event.controller';
import {useParams } from "react-router-dom";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
import { Multiselect } from 'multiselect-react-dropdown';
import { add_activity } from '../../controllers/activity.controller'

function EventUpdate() {

  const [eventData,setEventData] = useState({eventName:'',eventDate:'',startTime:'',endTime:'',venue:'',description:'',hostingAffiliation:'',banner:null });
  const [activity, setActivity] = useState({MemNo: "To be taken from redux", action: "Updated an event",table: "Events",parameters: "not set",  datetime: ""});
  const [vols,setVols] = useState([]);
  const [members, Setmembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState();
  const [bannerChange, setBannerChange] = useState(false);
  let { eventId } = useParams();
  var memberIds = [];

    useEffect(() => {
      getData();
  }, []); 


    const getData = async () => {

        //fetch event and members data
        var eventResult = await get_event(eventId)
        var memberIdResult = await get_all_active_members()
        
        //set state of events and memeber
        setEventData(eventResult.data.data);
        Setmembers( setMemeberIds(memberIdResult.data.data))

        //turn the member names string into an array
        var selectedVolArr = eventResult.data.data.volunteers[0].split(',')
      
        setVols(selectedVolArr);
        setSelectedMembers(selectedVolArr);
    }

    //set member ids of fetched members
  function setMemeberIds(members){
    var i = 0;
    members.forEach(member => {
        memberIds[i] = member.memberShipNo
        i++;
    });
    return memberIds;
  }

  //handle change of a form field
  const handleChange = event =>
  { 
    setEventData({...eventData, [event.target.id] :event.target.value});
  };
    
  //set state when a member is selected
  function onSelect(selectedList, selectedMember) {
    vols.push(selectedMember);
    setSelectedMembers(vols);
  }

    //set state when a member is removed
  function onRemove(selectedList, selectedMember) {
    for( var i = 0; i < vols.length; i++)
    { if ( vols[i] === selectedMember) { vols.splice(i, 1); }}
    setVols(vols);
    setSelectedMembers(vols);
}

    //set state of banner
  const handleBanner = event =>
  {  setEventData({...eventData, banner : event.target.files[0] }); setBannerChange(true)};

  //clear state data when submitted
  const clear = () => {
  setEventData({eventName:'',eventDate:'',startTime:'',endTime:'',venue:'',description:'',hostingAffiliation:'',formLink:'',banner:null  })
  setVols([]);
  }

  const send = async event =>{
    event.preventDefault();
    const data = new FormData();
    data.append("eventId",eventId);
    data.append("eventName",eventData.eventName);
    data.append("eventDate",eventData.eventDate);
    data.append("startTime",eventData.startTime);
    data.append("endTime",eventData.endTime);
    data.append("venue",eventData.venue);
    data.append("description",eventData.description);
    data.append("hostingAffiliation",eventData.hostingAffiliation);
    data.append("volunteers",selectedMembers)
    data.append("formLink",eventData.formLink);
    data.append("banner",eventData.banner);
    try{
      const res = await Axios.post('/event/update',data, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });

      const date = new Date();
      activity.parameters = eventData.eventName;
      activity.datetime = date.toLocaleString();
      await add_activity(activity)

      if(res.status === 200)
      {
        clear()
        Config.setToast("Event Updated Successfully!")
      }
    }catch(err){
      if(err.response.status === 500)
          Config.setToast('There was a problem with then server');
        else
          console.log(err.response.data);
    }
  }

  return (    <div>
    {/* <ContentHeader pageName={props.page}/> */}
     <section className="content w-100" >
         {console.log(eventData)}
  <div className="container-fluid d-flex justify-content-center">
  <div className="card card-warning w-50">
  <div className="card-header">
    <h3 className="card-title">Event Update Form</h3>
  </div>
  <form id="eventUpdate"  method="post" onSubmit={send}>
    <div className="card-body">

      <div className="form-group">
        <label htmlFor="eventName">Event Name</label>
        <input type="text" value={eventData.eventName} onChange={handleChange}  className="form-control" id="eventName" placeholder="Enter event name" required/>
      </div>

      <div className="form-group">
        <label htmlFor="eventDate">Date</label>
        <input type="date" id="eventDate" value={eventData.eventDate.slice(0,10)} onChange={handleChange} className="form-control" required/>
      </div>

      <div className="form-group">
        <label htmlFor="eventTime">Start Time</label>
        <input type="time" id="startTime" value={eventData.startTime} onChange={handleChange} className="form-control" required />
      </div>

      <div className="form-group">
        <label htmlFor="eventTime">End Time</label>
        <input type="time" id="endTime" value={eventData.endTime} onChange={handleChange} className="form-control"/>
      </div>

      <div className="form-group">
        <label htmlFor="venue">Venue</label>
        <input type="text" value={eventData.venue} onChange={handleChange} className="form-control" id="venue" placeholder="Enter event venue" required/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
      <textarea id="description" value={eventData.description} onChange={handleChange} placeholder="Place some text here"
      style={{width: "100%", height: "200px", fontSize: "14px", lineHeight: "18px", border: "1px solid #dddddd", padding: "10px"}} />
      </div>

      <div className="form-group">
        <label htmlFor="hostingAffiliation">Hosting Affiliation</label>
        <input type="text" value={eventData.hostingAffiliation} onChange={handleChange}  className="form-control" id="hostingAffiliation" placeholder="Enter hosting affiliation" required/>
      </div>

      <div className="form-group">
        <label>Volunteers</label>
        <Multiselect options={members} selectedValues={vols} isObject={false} onSelect={onSelect} onRemove={onRemove}  displayValue="name"  />
      </div>

    <div class="form-group">
      <label for="banner">Event Banner</label>
      <img className="mb-4 shadow-lg bg-white rounded"  src={__dirname+"images/Events/"+eventData.banner} style={{ width:"100%", maxHeight:"300px", display :bannerChange && "none"}}/>
      <input type="file" class="form-control-file" id="banner" accept="image/*" onChange={handleBanner}/>
    </div>

    </div>
    {/* <!-- /.card-body --> */}

    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Update Event</button>
    </div>
  </form>
  <div className="d-none" id="dialog-confirm" title="Empty the recycle bin?">
  <p><span className="ui-icon ui-icon-alert" style={{float:"left", margin:"12px 12px 20px 0"}}></span>These items will be permanently deleted and cannot be recovered. Are you sure?</p>
</div>
</div>
</div>
</section>
</div>);


}

export default EventUpdate;


//https://tempusdominus.github.io/bootstrap-4/Usage/ - date and time picker