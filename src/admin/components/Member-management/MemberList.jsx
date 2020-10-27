import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Modal, Button  } from "react-bootstrap";
import {
  get_all_rewards,
  member_delete,
  get_past_designation
} from "../../controllers/memeber.controller";
import Config from "../../controllers/config.controller";

import "jquery/dist/jquery";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const MemberRequest = (props) => {
  const [selectMember, setSelectMember] = useState({
    addfname: "",
    addlname: "",
    addmname: "",
    addmnumber: "",
    addpemail: "",
    addoemail: "",
    addphone: "",
    addpassword: "",
    addcpassword: "",
    viewPastDes: false,
  });
  const [pastDesg, setpastDesg] = useState([]);

  const [members, Setmembers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var res = await get_all_rewards();
    await Setmembers(res.data);
    $("#memberTable").dataTable();
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const load_data = (data) =>{
         handleShow()
           get_past_designation(data).then( response =>{
             setpastDesg(response.data)
           })
         
  }
  const readydata = () => {
    return members.map(( row, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{row.member.memberShipNo}</td>
          <td>
            {row.member.fname}&nbsp;{row.member.lname}
          </td>
           <td>{row.affiliation}</td>
          <td>{row.member.contactNo}</td>
          <td>{row.member.email}</td>
          <td>{row.points}</td>
          <td className="project-actions text-center">
          <Link
              className="btn btn-warning btn-sm mr-1 my-2"
              onClick={(ds)=>load_data(row.member.memberShipNo)}
            >
              {" "}
              <i className="fa fa-info mr-1" />
              Info
            </Link>
            <Link
              to={`/Admin/MemberEdit/${row.member._id}`}
              type="button"
              className="btn btn-info btn-sm mr-1 my-2"
            >
              <i className="fa fa-pencil-square-o mr-1" />
              Update
            </Link>
          </td>
        </tr>
      );
    });
  };
  
  const readydata_pastdessg = () => {
    return pastDesg.reverse().map(( row, i) => {
      return (
        <tr key={i}>
          <td style={{margin:'2px', padding:'5px', fontWeight:'800'}}>{row.Year}</td>
          <td style={{margin:'2px', padding:'5px'}}>{row.title}</td>
          <td style={{margin:'2px', padding:'5px'}}>{row.affiliationTitle}</td>
        </tr>
      );
    });
  };

  return (


    <section className="content" style={{ display: props.display }}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header bg-dark">
          <h6>Active Members</h6>
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
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Points</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{readydata()}</tbody>
            </table>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Past Designations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
            {readydata_pastdessg()}
            </tbody>
          </table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <!-- /.container-fluid --> */}
      </div>
    </section>
  );
};

export default MemberRequest;
