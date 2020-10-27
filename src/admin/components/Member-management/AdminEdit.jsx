import React , {useState, useEffect}from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation, useHistory} from "react-router-dom";

import { useForm } from "react-hook-form";
import Config from '../../controllers/config.controller'
import { update_admin, get_specific_admin, admin_delete ,} from '../../controllers/admin.controller';
import { update_password_By_admin} from '../../controllers/memeber.controller';
import { toast } from "react-toastify";

const AdminEdit = (props) => {

  const id = useParams()
  const { register, handleSubmit } = useForm();

 
  const newId = id.id
  
  const [admin, setAdmin] = useState({ 

        fname : "" , 
        lname : ""  ,
        memberShipNo : "",
        email : "" ,
        contactNo : "" ,
        nameAsMemberShip: "",
        ieeeMail: "",
        new_passord:"",
        cons_password:""

    
  });

  useEffect(() => {
    console.log(newId);
    onLoadAdmin(newId);
}, []); 



  const onLoadAdmin = async (newId) => {
    const result = await get_specific_admin(newId)
    // const newD = result.data.data
  
   await setAdmin(result.data.data)
  }

  const history = useHistory();

  function reload() {
    window.location.replace("/Admin/AdminList");
  }



  const onSubmit =  async (e) => {

    // alert(JSON.stringify(admin))
    e.preventDefault()
    const result = await update_admin (admin, id)
    if(result.code == 200)
    {
      Config.setToast("Update  successfully")
    }



  }

//  const getData = async  (id) =>{
//       const result = await
//  }

  const handleChange =  (e) =>  {
     setAdmin({...admin, [e.target.name]: e.target.value });
  }

  const removeAdmin = async (mem, state) => {
    var data = {
      memberShipNo: mem,
      state: state,
    };

const res = await admin_delete(data);
    if (res.code == 200) {
      Config.setToast(res.message);
      reload();
      
    }
  };

  const reset_pw = (data) =>{
    
    if(admin.new_passord == null || admin.new_passord == ""){
     return Config.setToast("Please provide a password")
    }
    if(admin.cons_password.localeCompare(admin.new_passord) != 0){
      return Config.setToast("Password didn't match")
    }

    update_password_By_admin(admin.memberShipNo,admin.new_passord ).then( response =>{
        if(response.code == 200){
          Config.setToast("Password Reset")
        }else{
          Config.setToast("Something went wrong")
        }
    })

  }

  return (<section className="content" style={{ display: props.display }}>
    <div className="container-fluid">
    <div className="card">
          <div className="card-header bg-dark">
             <h6>Update Admin Profile - {admin.memberShipNo}</h6>
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
                    name="fname"
                    placeholder="First Name"
                    value={admin.fname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    value={admin.lname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="pemail">Email</label>
                <input
                  type="pemail"
                  className="form-control"
                  id="pemail"
                  name="pemail"
                  placeholder="Email"
                  value={admin.email}
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
                    name="mnumber"
                    placeholder="Membership Number"
                    value={admin.memberShipNo}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

              <div className="form-group col-md-6">
                <label for="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
           
                  name="phone"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  value={admin.contactNo}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="new_passord">New Password</label>
                <input
                  type="password"
                  className="form-control"
           
                  name="new_passord"
                  placeholder=""
                  onChange={handleChange}
                  value={admin.new_password}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="cons_password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="cons_password"
                  placeholder=""
                  onChange={handleChange}
                  value={admin.cons_password}
                />
              </div>
              </div>

              <div className="float-right">
              <div className="form-row">

              <button type="button" className="btn btn-danger mr-1 my-2" onClick={(data)=>reset_pw(admin.memberShipNo)} >
                  Reset Password
              </button>
               
                <button type="submit" className="btn btn-primary mr-1 my-2">
                  Submit
                </button>
              </div>
              </div>
            </form>


            <Link
              className="btn btn-secondary btn-sm mr-1 my-2"
              onClick={() => removeAdmin(admin.memberShipNo, false)}
            >
              {" "}
              <i className="fas fa-trash mr-1" />
              Remove
            </Link>
          </div>
        </div>

    </div>
  
  </section>);

}

export default AdminEdit;
