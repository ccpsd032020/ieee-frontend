import React , {useState, useEffect}from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import { get_all_affiliations } from "../../controllers/affiliation.controller";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { update_member, get_specific_mem, change_password_By_admin, member_delete} from '../../controllers/memeber.controller'
import Config from '../../controllers/config.controller'

const MemberEdit = (props) => {

  const id = useParams()
  const { register, handleSubmit } = useForm();

 
  const newId = id.id
  
  const [member, setMember] = useState({ 

        fname : "" , 
        lname : ""  ,
        memberShipNo : "",
        email : "" ,
        selectaffiID: "",
        contactNo : "" ,
        nameAsMemberShip: "",
        ieeeMail: "",


    
  });

  useEffect(() => {
    onLoadMemebrer(newId);
}, []); 

function reload() {
  window.location.replace("/Admin/MemberList");
}



  const onLoadMemebrer = async (newId) => {
    const result = await get_specific_mem(newId)
  
    await setMember(result.data.data)
  }

  const removeMember = async (mem, state) => {
    var data = {
      memberShipNo: mem,
      state: state,
    };

  const res = await member_delete(data);
    if (res.code == 200) {
      Config.setToast(res.message);
      reload();
    }
  };


  const change_pw_req = async (data) =>{
    change_password_By_admin(data).then( response=>{
        if(response.code == 200){
          Config.setToast("successfully Reset")
        }else {
            alert('ssss', data)
        }
    })


  }

  const onSubmit =  async (e) => {

    e.preventDefault()
    const result = await update_member (member, id)

    if(result.code == 200)
    {
      Config.setToast("Update  successfully")
    }



  }

  //Affiliation--------------------------------------
  const handleAffChange = (e) => {
    setMember({ ...member, selectaffiID: e.value });
  };

  const [affiliations, setAffiliations] = useState([]);
  useEffect(() => {
    getAffData();
  }, []);

  async function getAffData() {
    var res = await get_all_affiliations();
    await setAffiliations(res.data.data);
  }

  const sel = affiliations.map((item) => {
    const container = {};

    container["value"] = item._id;
    container["label"] = item.affiliationname;
    return container;
  });

  const getcurrentAff = () => {
    return sel.find(i => i.value == member.selectaffiID)
  }

  const handleChange =  (e) =>  {
     setMember({...member, [e.target.name]: e.target.value });
  }



  return (<section className="content" style={{ display: props.display }}>
    <div className="container-fluid">


    <div className="card">
          <div className="card-header bg-dark">
             <h6>Update Member Profile - {member.memberShipNo}</h6>
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
                    value={member.fname}
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
                    value={member.lname}
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
                  name="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="mnumber">Membership Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="mnumber"
                    name="memberShipNo"
                    placeholder="Membership Number"
                    value={member.memberShipNo}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="affiliation">Affiliation</label>
                  <Select
        
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
                  name="nameAsMemberShip"
                  placeholder="Name as membership card"
                  onChange={handleChange}
                  value={member.nameAsMemberShip}
                />
              </div>

              <div className="form-group">
                <label for="oemail">IEEE Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="oemail"
                  name="ieeeMail"
                  placeholder="IEEE Email"
                  onChange={handleChange}
                  value={member.ieeeMail}
                />
              </div>

              <div className="form-group">
                <label for="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
           
                  name="contactNo"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  value={member.contactNo}
                />
              </div>


              <div className="float-right">
              <div className="form-row">

              <button type="button" className="btn btn-danger mr-1 my-2" onClick={ (data) =>change_pw_req(member.memberShipNo)} >
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
              onClick={() => removeMember(member.memberShipNo, false)}
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

export default MemberEdit;
