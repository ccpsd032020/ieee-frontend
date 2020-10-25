import React , {useState, useEffect}from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Select from 'react-select'

import { useForm } from "react-hook-form";

import { add_admin} from '../../controllers/admin.controller';
import Config from '../../controllers/config.controller'
const AdminAdd = (props) => {
  const { register, handleSubmit } = useForm();


 
  let [admin, setMember] = useState({ 
    fname : '' , 
    lname : '' ,
    addmnumber : '' ,
    addpemail : '' ,
    addphone : '' ,
    addpassword : '' ,
    addcpassword : '' ,
    
  });


  const onSubmit =  async (e) => {

    // alert(JSON.stringify(admin))
    e.preventDefault()
    const result = await add_admin (admin)
    console.log(result);
    if(result.code == 200)
    {
      clear()
      Config.setToast("Admin Created successfully")
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
        fname : '' , 
        lname : '' ,
        addmnumber : '' ,
        addpemail : '' ,
        addphone : '' ,
        addpassword : '' ,
        addcpassword : '' ,
    })
  }

  const handleChange =  (e) =>  {
     setMember({...admin, [e.target.name]: e.target.value });
  }

  return (<section className="content" style={{ display: props.display }}>
    <div className="container-fluid">
   
      <div className="card">
      <div className="card-header bg-dark">
          <h6>Create Admin</h6>
          </div>
        <div className="card-body">

    

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
                    value={admin.addfname}
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
                    value={admin.addlname}
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
                  value={admin.addpemail}
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
                    value={admin.addmnumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                <label for="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="addphone"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  value={admin.addphone}
                />
                </div>
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
                    value={admin.addpassword}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={admin.addcpassword}
                  />
                </div>
              </div>

              <div className="float-right">
              <div className="form-row">
                <button
                  type="button"
                  className="btn btn-secondary  mr-1 my-2"
                  onClick={clear}
                >
                  Cancel
                </button>
                
                <button
                  type="button"
                  className="btn btn-secondary  mr-1 my-2"
                  onClick={add}
                >
                  Demo
                </button>

                <button type="submit" className="btn btn-primary  mr-1 my-2">
                  Submit
                </button>
              </div>
              </div>
            </form>


        </div>
      </div>
    </div>
  
  </section>);

}

export default AdminAdd;
