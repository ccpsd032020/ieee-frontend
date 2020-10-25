import React , {useState, useEffect}from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import NavBar from '../Common/NavBar';
import Footer from '../Common/Footer';
import Background from "../../images/Registration.jpg";
import Select from "react-select";
import { get_all_affiliations } from "../../../admin/controllers/affiliation.controller";

import { useForm } from "react-hook-form";

import { add_member_requset} from '../../controllers/memeber.controller'
import Config from '../../controllers/config.controller'
const Registration = (props) => {
  const { register, handleSubmit } = useForm();

 
  let [member, setMember] = useState({ 
    addfname : '' , 
    addlname : '' ,
    addmname : '' ,
    addmnumber : '' ,
    selectaffiID: "",
    addpemail : '' ,
    addoemail : '' ,
    addphone : '' ,
    addpassword : '' ,
    addcpassword : '' ,

  });


  const onSubmit =  async (e) => {

    // alert(JSON.stringify(member))
    e.preventDefault()
    const result = await add_member_requset (member)
    console.log(result);
    if(result.code == 200)
    {
      clear()
      Config.setToast("Request sent successfully")
    }



  }

  const add = () => {
    console.log("Add");
    setMember({
      addfname : 'Prabhasha' , 
      addlname : 'Amarathunga' ,
      addmname : 'Prabhasha Amarathunga' ,
      addmnumber : '20204646' ,
      addpemail : 'prabhasha.amarathunga@gmail.com' ,
      addoemail : 'prabhasha.amarathunga@ieee.com' ,
      addphone : '0716401842' ,
      addpassword : '1234' ,
      addcpassword : '1234' ,
    })
  }

  const clear = () => {
    console.log("Clear call");
    setMember({
      addfname : '' , 
      addlname : '' ,
      addmname : '' ,
      addmnumber : '' ,
      addpemail : '' ,
      addoemail : '' ,
      addphone : '' ,
      addpassword : '' ,
      addcpassword : '' ,
      selectaffiID : '',
    })
  }

  const handleChange =  (e) =>  {
     setMember({...member, [e.target.name]: e.target.value });
  }



//Affiliation--------------------------------------
const handleAffChange = (e) => {
    setMember({ ...member, selectaffiID: e.value });
    console.log(e);
 
};

const [affiliations, setAffiliations] = useState([]);
useEffect(() => {
  getAffData();
}, []);

async function getAffData() {
  var res = await get_all_affiliations();
  await setAffiliations(res.data.data);
  console.log("aff: " + affiliations);
}

const sel = affiliations.map((item) => {
  const container = {};

  container["value"] = item._id;
  container["label"] = item.affiliationname;
  console.log("sel: " + JSON.stringify(container));
  return container;
});

const getcurrentAff = () => {
    return sel.find(i => i.value == member.selectaffiID)
}

const validate = (data) =>{
    
  console.log(member.addpassword);
  if(member.addpassword == null || member.addpassword == ""){
   return Config.setToast("Plase provide password")
  }
  if(member.addcpassword.localeCompare(member.addpassword) != 0){
    return Config.setToast("Password did not match")
  }
  if(member.selectaffiID == null || member.selectaffiID ==""){
    return Config.setToast("Please select your Affiliation")
  }
  if(member.selectaffiID == null || member.selectaffiID ==""){
    return Config.setToast("Please select your Affiliation")
  }

}

  return (

  <section className="content" style={{ display: props.display }}>
    <NavBar/>
    <div >
    <div className="container-fluid" >
      
 
        <div className="card-header bg-dark">

          <b>Member Registration</b>

        </div>
        <div className="card">
        <div className="card-body">

        <section className="content" style={{ display: props.display }}>
      <div className="container">
  
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="fname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="addfname"
                    placeholder="First Name"
                    value={member.addfname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="addlname"
                    placeholder="Last Name"
                    value={member.addlname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="pemail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="pemail"
                  name="addpemail"
                  placeholder="Email"
                  value={member.addpemail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="mnumber">Membership Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mnumber"
                    name="addmnumber"
                    placeholder="Membership Number"
                    value={member.addmnumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="affiliation">Affiliation</label>
                  <Select
                    required
                    className="select2"
                    id="affiliation"
                    name="selectaffiID"
                    data-placeholder="Select affiliation"
                    onChange={handleAffChange}
                    options={sel}
                    value={getcurrentAff()}
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="mname">Full Name</label>
                <input
                  type="test"
                  className="form-control"
                  id="mname"
                  name="addmname"
                  placeholder="Name as membership card"
                  onChange={handleChange}
                  value={member.addmname}
                />
              </div>

              <div className="form-group">
                <label for="oemail">IEEE Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="oemail"
                  name="addoemail"
                  placeholder="IEEE Email"
                  onChange={handleChange}
                  value={member.addoemail}
                />
              </div>

              <div className="form-group">
                <label for="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="addphone"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  value={member.addphone}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="addpassword"
                    placeholder="Password"
                    onChange={handleChange}
                    value={member.addpassword}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="addcpassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={member.addcpassword}
                  />
                </div>
              </div>

              <div className="form-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clear}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary float-right" onClick={(data)=>validate(member.memberShipNo)}>
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={add}
                >
                  Demo
                </button>
              </div>
            </form>
      
      </div>
    </section>



      </div>
      </div>
    </div>
    </div>
    <Footer/>
  </section>
  );

}

export default Registration;
