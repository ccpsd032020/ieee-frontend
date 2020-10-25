import React, { useState, useEffect } from "react";
import useForceUpdate from 'use-force-update';
import 'jquery/dist/jquery.min.js';
import $ from "jquery"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//controllers
import { get_spec_aff_past_designations, remove_past_designation } from "../../controllers/pastdes.controller";
import { get_all_members, get_spec_member } from "../../controllers/designation.controller";
import { get_all_affiliations, get_affiliation } from "../../controllers/affiliation.controller";
import { add_activity } from '../../controllers/activity.controller';
import Config from '../../controllers/config.controller'

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


const PastSpecDesignations = (props) => {

    const aff = useSelector(state => state.auth.user.affiID);
    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //variable to store past designations
    const [pastdes, SetPastDes] = useState([]);

    //place holders for react-select-search
    window.selectedaff = "Select affiliaion";
    window.selectedmem = "Select member";

    //variable to store activities
    let [activity, setActivity] = useState({
        MemNo: memshipid + " - " + memfname + " " + memlname,
        action: "Delete record - Chair",
        table: "Records",
        parameters: "not set",
        datetime: "not set"
    });

    useEffect(() => {
        getData();
    }, []);

    //get past designations specific to affiliation from database
    async function getData() {
        var res = await get_spec_aff_past_designations(aff);
        await SetPastDes(res.data.data);
        $("#PastSpecDes").dataTable();
    }

    //remove assigned designation
    const delete_func = async (id ,title, mem, year, aff) => {
        addActivity(title, mem, year, aff)
        const res = await remove_past_designation(id)
        if (res.code == 200) {
            Config.setToast("Record removed")
            //refresh page
            await getData();
        } else {
            Config.setToast("Something went wrong")
            //refresh page
            await getData();
        }
    }

    //get member name relevent to a given _id
    async function setMemDetails(id) {
        var result = await get_spec_member(id)
        if (result.data.data == null) {
            return ("Member not found")
        }
        else {
            return (result.data.data.memberShipNo + " - " + result.data.data.fname + " " + result.data.data.lname)
        }
    }

    //get affiliation name relevent to a given _id
    async function setAffDetails(id) {
        var result = await get_affiliation(id)
        if (result.data.data == null) {
            return ("Affiliation not found")
        }
        else {
            return (result.data.data.affiliationno + " - " + result.data.data.affiliationname)
        }
    }

    //add activity log about deleted past designation
    const addActivity = async (title, mem, year, aff) => {
        const date = new Date();
        //set parameters for activity variable
        var detAff = await setAffDetails(aff)
        var detMem = await setMemDetails(mem)
        activity.parameters = title + " / " + detMem + " / " + year + " / " + detAff;
        //set date for activity variable
        activity.datetime = date.toLocaleString();
        //add activity to database
        await add_activity(activity)
    }

    //variable to store members
    const [member, setMember] = useState([]);
    useEffect(() => {
        getMemData();

    }, []);

    //get all members from data base
    async function getMemData() {
        var res1 = await get_all_members();
        await setMember(res1.data.data);
    }

    //get member data for a given _id
    const setMemData = (id) => {
        return member.map((member, index) => {
            if (id == member._id) {
                return (member.fname + " " + member.lname);
            }
        });
    };

    //get membership no for a given _id
    const setMemNo = (id) => {
        return member.map((member, index) => {
            if (id == member._id) {
                return (member.memberShipNo);
            }
        });
    };

    //variable to store affiliations
    const [affiliations, setAffiliations] = useState([]);
    useEffect(() => {
        getAffData();
    }, []);

    //get all the affiliations from the database
    async function getAffData() {
        var res = await get_all_affiliations();
        await setAffiliations(res.data.data);
    }

    //get affiliation data for a given _id
    const setAffData = (id) => {
        return affiliations.map((affiliations, index) => {
            if (id == affiliations._id) {
                return (affiliations.affiliationno + " - " + affiliations.affiliationname);
            }
        });
    };

    //load table data
    const readydata = () => {
        return pastdes.map((pastdes, i) => {
            return (
                <tr key={i}>
                    <td>{pastdes.title}</td>
                    <td>{setMemNo(pastdes.MemNo)}</td>
                    <td>{setMemData(pastdes.MemNo)}</td>
                    <td>{pastdes.Year}</td>
                    <td className="project-actions text-center">
                        <Link to={`/Admin/EditPastDesForAff/${pastdes._id}`} className="btn btn-primary btn-sm mr-1" style={{ color: 'black' }}>
                            {" "}
                            <i className="fas fa-folder mr-1" />
                             Update{" "}
                        </Link>
                        <a className="btn btn-danger btn-sm mr-1" onClick={() => delete_func(pastdes._id, pastdes.title, pastdes.MemNo, pastdes.Year, pastdes.affiliationNo)}>
                            {" "}
                            <i className="fas fa-trash mr-1" />Remove{" "}
                        </a>
                    </td>
                </tr>
            );
        });
    };

    //render table
    return (
        <section className="content" style={{ display: props.display }}>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <Link to={`/Admin/AddPastDesignationForAff/${aff}`} type="button" className="btn btn-info float-right add_btn">Add Record</Link>
                    </div>
                    <div className="card-body">
                        <table
                            id="PastSpecDes"
                            className="table table-bordered table-striped dataTable"
                        >
                            <thead>
                                <tr>
                                    <th>Designation Title</th>
                                    <th>Member ID</th>
                                    <th>Member Name</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>{readydata()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PastSpecDesignations;
