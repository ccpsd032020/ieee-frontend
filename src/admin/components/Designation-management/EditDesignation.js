import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import Select from 'react-select'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//controllers
import { update_designation, get_spec_designations, get_spec_member, update_designation_mem, get_all_members } from '../../controllers/designation.controller'
import { get_all_affiliations, get_affiliation } from "../../controllers/affiliation.controller";
import { addPastDesignation } from '../../controllers/pastdes.controller'
import { add_activity } from '../../controllers/activity.controller'
import Config from '../../controllers/config.controller'

const EditDesignation = (props) => {

    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //get passed parameters
    const id = useParams()
    const newId = id.desId

    //variable to store past designations
    let [pastdes, setPastDes] = useState({
        title: "not set",
        affiliationNo: "not set",
        MemNo: "not set",
        Year: "not set",
        created_at: "not set",
    });

    //variable to store Designations
    const [assignment, setAssignment] = useState({
        MemNo: "",
    });

    //variable to store Designations
    const [designation, setDesignation] = useState({
        title: "",
        affiliationNo: "",
        type: "",
    });

    //variable to store activities
    let [activity, setActivity] = useState({
        MemNo: memshipid + " - " + memfname + " " + memlname,
        action: "Edit designation",
        table: "Designations",
        parameters: "not set",
        datetime: "not set"
    });

    //variable to store members
    const [member, setMember] = useState([]);
    useEffect(() => {
        getMemData();

    }, []);

    //get members specific to logged users affiliation from data base
    async function getMemData() {
        var res = await get_all_members();
        await setMember(res.data.data);
    }

    //handle form changes - general
    const handleMemChange = (e) => {
        //set MemNo for past designations variable
        setPastDes({ ...pastdes, MemNo: e.value });
        //set MemNo for designations variable
        setAssignment({ ...assignment, MemNo: e.value });
        window.selectedmem = setMemData(e.value);
        mem();
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

    //get members details from database
    async function getMemDet(id) {
        if (id == "") {
            window.selectedmem = "Select new member";
        }
        else {
            var res = await get_spec_member(id);
            if (res.data.data == null) {
                window.selectedmem = "Member has been removed";
            }
            else {
                window.selectedmem = res.data.data.memberShipNo + " - " + res.data.data.fname + " " + res.data.data.lname;
            }
        }
    }

    //get member data for a given _id
    const setMemData = (id) => {
        return member.map((member, index) => {
            if (id == member._id) {
                return (member.fname + " " + member.lname + " - " + member.memberShipNo);
            }
            else {
                return ("");
            }
        });
    };

    //set options for select to show members
    const selMem = member.map(item => {
        const container = {};
        container["value"] = item._id;
        container["label"] = item.memberShipNo + " - " + item.fname + " " + item.lname;
        return container;
    })

    useEffect(() => {
        onLoadMemebrer(newId);
    }, []);

    //get affiliation details from database
    async function getAffDet(id) {
        var res = await get_affiliation(id);
        if (res.data.data == null) {
            window.selectedaff = "Affiliation has been removed";
        }
        else {
            window.selectedaff = res.data.data.affiliationno + " - " + res.data.data.affiliationname;
        }
    }

    //runs when loading the form
    const onLoadMemebrer = async (newId) => {
        //get date info
        const date = new Date();
        //get designation data for a specific affiliation from database
        const result = await get_spec_designations(newId)
        await getAffDet(result.data.data.affiliationNo)
        //set data for activity log
        setActivity({
            ...activity,
            parameters: result.data.data.MemNo,
            datetime: date.toLocaleString()
        });
        //set data for designation
        setDesignation(result.data.data)
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

    //runs on submit
    const onSubmit = async (e) => {
        e.preventDefault()
        //get date info
        const date = new Date();
        const currentYear = new Date().getFullYear();
        setPastDes({
            ...pastdes,
            title: designation.title,
            affiliationNo: designation.affiliationNo,
            Year: currentYear.toString(),
            created_at: date.toLocaleString()
        });
        designation.MemNo = await assignment.MemNo
        pastdes.title = designation.title
        pastdes.affiliationNo = designation.affiliationNo
        pastdes.Year = currentYear.toString()
        pastdes.created_at = date.toLocaleString()
        await addPastDesignation(pastdes)
        //set parameters for activity variable
        var detAff = await setAffDetails(designation.affiliationNo)
        var detMem = await setMemDetails(assignment.MemNo)
        activity.parameters = detAff + " / " + designation.title + " / " + designation.type + "/" + detMem;
        //update designation
        const result = await update_designation(designation, id.desId)
        const resu = await update_designation_mem(designation, id.desId)
        //add activity to database
        await add_activity(activity)
        if (result.code == 200) {
            Config.setToast("Updated successfully")
        }
    }

    //variable to store affiliations
    const [affiliations, setAffiliations] = useState([]);
    useEffect(() => {
        getAffData();
    }, []);

    //get all the affiliations from the database
    async function getAffData() {
        window.selectedaff = "Select affiliaion";
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

    //set options for select to show affiliations
    const sel = affiliations.map(item => {
        const container = {};
        container["value"] = item._id;
        container["label"] = item.affiliationname + " - " + item.affiliationno;
        return container;
    })

    //handle form changes - for affiliations select
    const handleAffChange = (e) => {
        setDesignation({ ...designation, "affiliationNo": e.value });
        window.selectedaff = setAffData(e.value);
        aff();
    }

    //handle form changes - general
    const handleChange = (e) => {
        setDesignation({ ...designation, [e.target.name]: e.target.value });
    }

    //select for affiliations
    const aff = () => {
        return (
            <Select required value="" className="select2" id="affiliation" name="affiliationNo" placeholder={window.selectedaff} style={{ width: "100%" }} onChange={handleAffChange} options={sel} />
        )
    }

    //select for members
    const mem = () => {
        return (
            <Select required value="" className="select2" id="MemNo" name="MemNo" placeholder={window.selectedmem} style={{ width: "100%" }} onChange={handleMemChange} options={selMem} />
        )
    }

    //render form
    return (<section className="content" style={{ display: props.display }}>
        <div className="container-fluid">
            <h6>Update Designation</h6>
            <div className="card">
                <div className="card-header">

                </div>
                <div className="card-body">

                    <section className="content">
                        <div className="row justify-content-md-center">
                            <div className="col-md-6">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">Edit Designation</h3>
                                    </div>
                                    <form onSubmit={onSubmit}>


                                        <div className="card-body">
                                            <div className="form-group">
                                                <label >Title</label>
                                                <input type="text" className="form-control" required name="addfname"
                                                    value={designation.title}
                                                    name="title"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Affiliation</label>
                                                {aff()}
                                            </div>

                                            <div className="form-group">
                                                <label>Type</label>
                                                <select required value={designation.type} className="select2" id="type" name="type" data-placeholder="Select Type" style={{ width: "100%" }} onChange={handleChange}>
                                                    <option value="Normal">Normal</option>
                                                    <option value="Chair">Chair</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Member</label>
                                                {mem()}
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-success float-right" >Update Designation </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>

                                </div>


                            </div>
                        </div>

                    </section>


                </div>
            </div>
        </div>

    </section>);

}

export default EditDesignation;
