import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import {
  get_all_requsests,
  accept_or_reject,
} from "../../controllers/memeber.controller";
import Config from "../../controllers/config.controller";
import { get_affiliationview } from '../../controllers/affiliationview.controller';

import "jquery/dist/jquery"
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const MemberRequest = (props) => {
  
  const [selectMember, setSelectMember] = useState({

  
    addfname: "",
    addlname: "",
    addmname: "",
    addmnumber: "",
    addpemail: "",
    setAffiID:"",
    addoemail: "",
    addphone: "",
    addpassword: "",
    addcpassword: "",
  });
  const affiID = useParams();
  const newAffiID = affiID.affiID;
  const [members, Setmembers] = useState([]);
  useEffect(() => {
   
    onLoadMemebrer(newAffiID);
  }, []);

  
   
  

  const onLoadMemebrer = async (newAffiID) => {
    const result = await get_affiliationview(newAffiID)
    console.log(result.data.data);
  
   await console.log(members);
   Setmembers(result.data.data)
   $("#memberTable").dataTable();
  }

  

  const readydata = () => {
    return members.map((member, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{member.memberShipNo}</td>
          <td>{member.nameAsMemberShip}</td>
          <td>{member.affname}</td>
          <td className="project-actions text-center">
            {/* <a
              className="btn btn-info btn-sm mr-1 my-2"
              id="addMemberBtn"
              onClick={() => ace_or_rej(member.memberShipNo, true)}
            >
              {" "}
              <i className="fa fa-check mr-1" />
              Accept{" "}
            </a>
            <a
              className="btn bg-secondary btn-sm mr-1 my-2"
              onClick={() => ace_or_rej(member.memberShipNo, false)}
            >
              {" "}
              <i className="fas fa-trash mr-1" />
              Decline{" "}
            </a> */}
          </td>
        </tr>
      );
    });
  };

  return (
  
    <section className="content" style={{ display: props.display }}>
      <div className="container-fluid">

        <div className="card">
  
           
          <div className="card-header bg-dark">
             <h6>Requests</h6>
          </div>
   

          {/* <!-- /.card-header --> */}
          <div className="card-body">
            <table
              id="memberTable"
              className="table table-bordered table-striped dataTable"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Membership No.</th>
                  <th>Name</th>
                  <th>Affiliation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{readydata()}</tbody>
            </table>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </div>
    </section>
  );
};

export default MemberRequest;
