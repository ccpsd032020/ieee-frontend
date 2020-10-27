import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState ,useEffect} from 'react';
import {get_all_affiliations,deleteAffiliation} from "../../controllers/affiliation.controller";
import Config from "../../controllers/config.controller";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import 'jquery/dist/jquery.min.js';
import $ from "jquery"
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

function AffiliationTable(props){

  const initialValue = {affiliations : ['']}; 
  const [size,setSize] = useState('10');   

    for(var i = 0; i < size; i++) {
      initialValue.affiliations.push('');
  }

    const [affiliations, setAffiliations] = useState([]);
    useEffect(() => {
      getData();
    }, []);
  
    async function getData() {
      var res = await get_all_affiliations();
      await setAffiliations(res.data.data);
      $("#affiliationTable").dataTable();
    }

    const onDelete = async (id) => {
        const result = await deleteAffiliation(id)
        if(result.code == 200){
          Config.setToast(result.message)
          getData()
        }
      }

    var today = new Date();
    var status = null;

    const loadData = () => {

        return affiliations.map((affiliations, index) => {
        var date = new Date(affiliations.date);
     

          return (
           <tr key={index} >
          <td>{affiliations.affiID}</td> 
          
          <td >{affiliations.affiliationtype}</td>
          <td >{affiliations.affiliationname}</td>
          <td >{affiliations.affiliationno}</td>
          <td>{(new Date(affiliations.date).toDateString())}</td>
          <td ><span className ={affiliations.status == "Available" ? "badge badge-success" : "badge badge-danger"  }>{affiliations.status}</span> </td>      
          <td className="project-actions text-center">       
          <Link to={`/Admin/ViewMembers/${affiliations._id}`}  className="btn btn-primary btn-sm mr-1"><i className="fas fa-folder mr-1"/> View </Link>
              <Link to={`/Admin/ManageAffiliation/${affiliations._id}`}  className="btn btn-info btn-sm mr-1 editaffiliationbtn"><i className="fas fa-pencil-alt mr-1"/> Edit</Link>
              {/* <a className="btn btn-danger btn-sm mr-1" onClick={()=> onDelete(affiliations._id)}> <i className="fas fa-trash mr-1" />Delete</a> */}
              <a className="btn btn-danger btn-sm mr-1" onClick={()=> {if(window.confirm('Are you sure to delete this record?')){ onDelete(affiliations._id)};}}> <i className="fas fa-trash mr-1" />Delete</a>
          </td>
      </tr>
        );
      }); 
        };

   return (      <div>
    <section className="content"  >
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <Link to="/admin/StudentForm" type="button" id="addaffiliationBtn" className="btn btn-success float-right add_btn ml-2"> Add Affiliation</Link>
          
          
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body">
          
        <table id="affiliationTable" className="table table-bordered table-striped dataTable" >
            <thead>
            <tr>
              <th>Affiliation ID</th>
              <th>Affiliation Type</th>
              <th>Affiliation Name</th>
              <th>IEEE Affiliation Number</th>
              <th style={{width: "15%"}}>Date</th>
              <th style={{width: "5%"}}>Status</th>
              <th style={{width: "25%"}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {loadData()}
            </tbody>
            <tfoot>
            <tr>
            <th>Affiliation ID</th>
              <th>Affiliation Type</th>
              <th>Affiliation Name</th>
              <th>IEEE Affiliation Number</th>
              <th style={{width: "15%"}}>Date</th>
              <th style={{width: "5%"}}>Status</th>
              <th style={{width: "25%"}}>Action</th>
            </tr>
            </tfoot>
          </table>
           
            
        </div>
    </div>
    {/* <!-- /.container-fluid --> */}
    </div> 
  </section>
  </div> 
 );

}

export default AffiliationTable;



