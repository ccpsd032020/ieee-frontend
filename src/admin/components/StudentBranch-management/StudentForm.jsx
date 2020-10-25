import React,{useState, useEffect} from 'react';
import Config from '../../controllers/config.controller';

import Axios from 'axios';

function StudentForm(props) {

  const [affiliationData,setAffiliationData] = useState({affiID:'',affiliationtype:'',affiliationname:'',affiliationno:'',date:'',status:'' });




    useEffect(() => {
      //getData();
  }, []); 


  // async function getData() {
  //   var res = await get_all_active_members()
  //   await   Setmembers(res.data.data);
  // }

  const handleChange = affiliation =>
  { 
    setAffiliationData({...affiliationData, [affiliation.target.id] :affiliation.target.value})
    // console.log(eventData.eventName+' '+eventData.eventDate+' '+eventData.startTime+' '+eventData.endTime+' '+eventData.venue+' '+eventData.description+' '+eventData.hostingAffiliation+' '+eventData.volunteers+' '+eventData.banner);
  };
    
  // const handleVolunteers = event =>
  // { 
  //   if(!vols.includes(event.target.value))
  //   {
  //     vols.push(event.target.value); 
  //     setEventData({...eventData, volunteers : vols}) 
  //   }else{
  //     if(vols.length === 1 ){
  //       vols.splice(0,vols.length)
  //     }else{
  //       var index = vols.indexOf(event.target.value);
  //       vols.splice(index,1);
  //     }
  //   }
  // };

  // const handleBanner = event =>
  // {  setEventData({...eventData, banner : event.target.files[0] })};

  const clear = () => {
  setAffiliationData({affiID:'',affiliationtype:'',affiliationname:'',affiliationno:'',date:'', status:'' })
  //setVols([]);
  }

  const send = async affiliation =>{
    affiliation.preventDefault();
    const data = new FormData();
    data.append("affiID",affiliationData.affiID);
    data.append("affiliationtype",affiliationData.affiliationtype);
    data.append("affiliationname",affiliationData.affiliationname);
    data.append("affiliationno",affiliationData.affiliationno);
    data.append("date",affiliationData.date);
    data.append("status",affiliationData.status);
    
    try{
      const res = await Axios.post('/affiliation/addAffiliation',data, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });

      if(res.status === 201)
      {
        clear()
        Config.setToast("Affiliation added successfully")
      }
    }catch(err){
      if(err.response.status === 500)
          console.log('There was a problem with then server');
        else
          console.log(err.response.data);
    }
  }

  

  return (    <div>
    {/* <ContentHeader pageName={props.page}/> */}
     <section className="content w-100" >
  <div className="container-fluid d-flex justify-content-center">
  <div className="card card-warning w-50">
  <div className="card-header">
    <h3 className="card-title">Student Form</h3>
  </div>
  <form id="s3tudentForm"  method="post" onSubmit={send}>
    <div className="card-body">

      <div className="form-group">
        <label htmlFor="affiID">Affiliation ID</label>
        <input type="text" value={affiliationData.affiID} onChange={handleChange}  className="form-control" id="affiID" placeholder="ID" required/>
      </div>

      <div className="form-group">
          <label>Affiliation Type</label>
              <select className="select" id="affiliationtype" name="affiliationtype" multiple="multiple" data-placeholder="Select affiliation" style={{ width: "100%" }} onChange={handleChange}>
                <option>Student Branch</option>
                <option>Women In Enginerring Affiliation</option>
                <option>Young Professionals Affiliation</option>
                <option>Technical Chapter</option>
              </select>
      </div>

      <div className="form-group">
        <label htmlFor="affiliationname">Affiliation Name</label>
        <input type="text" value={affiliationData.affiliationname} onChange={handleChange}  className="form-control" id="affiliationname" placeholder="Enter affiliation Name" required/>
      </div>

      <div className="form-group">
        <label htmlFor="affiliationno">IEEE Affiliation Number</label>
        <input type="text" value={affiliationData.affiliationno} onChange={handleChange}  className="form-control" id="affiliationno" placeholder="Enter IEEE affiliation number" required/>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date </label>
        <input type="date" id="date" value={affiliationData.date} onChange={handleChange} className="form-control" required/>
      </div>

      


      <div className="form-group">
          <label>Status</label>
              <select className="select" id="status" name="status" multiple="multiple" data-placeholder="Select status" style={{ width: "100%" }} onChange={handleChange}>
                <option>Available</option>
                <option>Not Available</option>
                
              </select>
      </div>

     
      {/* <div className="form-group">
        <label htmlFor="eventBanner">Event Banner</label>
            <input type="file" className="form-control" id="banner" name="banner" accept="image/*" onChange={handleBanner} />
      </div> */}


    </div>
    {/* <!-- /.card-body --> */}

    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Add Affiliation</button>
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


export default StudentForm;


//https://tempusdominus.github.io/bootstrap-4/Usage/ - date and time picker