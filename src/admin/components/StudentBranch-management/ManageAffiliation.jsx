import React, { useState, useEffect } from 'react';
import Config from '../../controllers/config.controller';
import { get_affiliation } from '../../controllers/affiliation.controller';
import {useParams } from "react-router-dom";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
// import { Multiselect } from 'multiselect-react-dropdown';

function ManageAffiliation() {

  const [affiliationData,setAffiliationData] = useState({affiliationtype:'',affiliationname:'',affiliationno:'',date:'',status:'' });


  var id = useParams();


    useEffect(() => {
        getData(id.affiId);
  }, []); 


    const getData = async (id) => {

        var affiliationResult = await get_affiliation(id)
        console.log("id: " + id);
     
        setAffiliationData(affiliationResult.data.data);
        await console.log("affiliationData: " + JSON.stringify(affiliationData));
        
    }



  const handleChange = affiliation =>
  { 
    setAffiliationData({...affiliationData, [affiliation.target.id] :affiliation.target.value});
  };
    


 

  const clear = () => {
  setAffiliationData({affiliationtype:'',affiliationname:'',affiliationno:'',date:'',status:''  })
  //setVols([]);
  }

  const send = async affiliation =>{
    affiliation.preventDefault();
      const data = new FormData();
      data.append("affiID", id.affiId);
    data.append("affiliationtype",affiliationData.affiliationtype);
    data.append("affiliationname",affiliationData.affiliationname);
    data.append("affiliationno",affiliationData.affiliationno);
    data.append("date",affiliationData.date);
    data.append("status",affiliationData.status);
    
    try{
      const res = await Axios.post('/affiliation/update',data, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });

      if(res.status === 200)
      {
        clear()
        Config.setToast("Affiliation Updated Successfully!")
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
         {console.log(affiliationData)}
  <div className="container-fluid d-flex justify-content-center">
  <div className="card card-warning w-50">
  <div className="card-header">
    <h3 className="card-title">Affiliation Update Form</h3>
  </div>
  <form id="affiliationUpdate"  method="post" onSubmit={send}>
    <div className="card-body">


    <div className="form-group">
      <label htmlFor="affiliationtype">Affiliation Type</label>
      <select className="select"  name="affiliationtype"   style={{ width: "100%" }} value={affiliationData.affiliationtype} onChange={handleChange}  className="form-control" id="affiliationtype" placeholder="Enter Affiliation Type" required>
                <option>Student Branch</option>
                <option>Women In Enginerring Affiliation</option>
                <option>Young Professionals Affiliation</option>
                <option>Technical Chapter</option>
                
              </select>
      </div>

      {/* <div className="form-group">
        <label htmlFor="affiliationtype">Affiliation Type</label>
        <input type="text" value={affiliationData.affiliationtype} onChange={handleChange}  className="form-control" id="affiliationtype" placeholder="Enter Affiliation Type" required/>
      </div> */}


      <div className="form-group">
        <label htmlFor="affiliationname">Affiliation Name</label>
        <input type="text" value={affiliationData.affiliationname} onChange={handleChange} className="form-control" id="affiliationname" placeholder="Enter Affiliation Name" required/>
      </div>

      <div className="form-group">
        <label htmlFor="affiliationno">IEEE Affiliation Number</label>
        <input type="text" value={affiliationData.affiliationno} onChange={handleChange}  className="form-control" id="affiliationno" placeholder="Enter IEEE Affiliation number" required/>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" value={affiliationData.date.slice(0,10)} onChange={handleChange} className="form-control" required/>
      </div>

      
      {/* <div className="form-group">
        <label htmlFor="status">Status</label>
        <input type="text" value={affiliationData.status} onChange={handleChange}  className="form-control" id="status" placeholder="Enter the status" required/>
      </div> */}

      <div className="form-group">
      <label htmlFor="status">Status</label>
      <select className="select"  name="status"   style={{ width: "100%" }} value={affiliationData.status} onChange={handleChange}  className="form-control" id="status" placeholder="Enter the status" required>
                <option>Available</option>
                <option>Not Available</option>
                
              </select>
      </div>

      

    </div>
    {/* <!-- /.card-body --> */}

    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Update Affiliation</button>
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

export default ManageAffiliation;


//https://tempusdominus.github.io/bootstrap-4/Usage/ - date and time picker