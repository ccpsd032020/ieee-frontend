import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import Select from 'react-select'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//controllers
import { update_designation_mem, get_spec_designations, get_aff_spec_members, get_spec_member } from '../../controllers/designation.controller'
import { addPastDesignation } from '../../controllers/pastdes.controller'
import { add_activity } from '../../controllers/activity.controller'
import { get_affiliation } from '../../controllers/affiliation.controller'
import Config from '../../controllers/config.controller'

const EditAssignedMemberForm = (props) => {

    //get passed parameters
    const id = useParams()
    const newId = id.AssId
    var affil = useSelector(state => state.auth.user.affiID);
    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //variable to store Designations
    const [Designation, setDesignation] = useState({
        MemNo: "",
    });

    useEffect(() => {
        onLoadMemebrer(newId);
    }, []);

    //variable to store past designations
    let [pastdes, setPastDes] = useState({
        title: "not set",
        affiliationNo: "not set",
        MemNo: "not set",
        Year: "not set",
        created_at: "not set",
    });

    //variable to store activities
    let [activity, setActivity] = useState({
        MemNo: memshipid + " - " + memfname + " " + memlname,
        action: "New assignment",
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
        var res = await get_aff_spec_members(affil);
        await setMember(res.data.data);
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

    //runs when loading the form
    const onLoadMemebrer = async (newId) => {
        //get date info
        const date = new Date();
        const currentYear = new Date().getFullYear();
        //get designation data for the affiliation of the logged user
        const result = await get_spec_designations(newId)
        //set data for designations
        setDesignation(result.data.data)
        await getMemDet(result.data.data.MemNo)
        //set data for past records
        setPastDes({
            ...pastdes,
            title: result.data.data.title,
            affiliationNo: result.data.data.affiliationNo,
            Year: currentYear.toString(),
            created_at: date.toLocaleString()
        });
        //set data for activity log
        setActivity({
            ...activity,
            parameters: result.data.data.MemNo,
            datetime: date.toLocaleString()
        });
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

    //runs on submit
    const onSubmit = async (e) => {
        e.preventDefault()
        //set parameters for activity variable
        var detAff = await setAffDetails(Designation.affiliationNo)
        var detMem = await setMemDetails(Designation.MemNo)
        const det = detMem + " / " + Designation.title + " / " + detAff;
        activity.parameters = det;
        //update designation
        const result = await update_designation_mem(Designation, id.AssId)
        //add past record to record
        await addPastDesignation(pastdes)
        //add activity to database
        await add_activity(activity)
        if (result.code == 200) {
            Config.setToast("Assigned successfully")
        }
    }

    //handle form changes - general
    const handleChange = (e) => {
        //set parameters for activity variable
        setActivity({ ...activity, parameters: e.value });
        //set MemNo for past designations variable
        setPastDes({ ...pastdes, MemNo: e.value });
        //set MemNo for designations variable
        setDesignation({ ...Designation, MemNo: e.value });
        window.selectedmem = setMemData(e.value);
        mem();
    }

    //select for members
    const mem = () => {
        return (
            <Select required value="" className="select2" id="MemNo" name="MemNo" placeholder={window.selectedmem} style={{ width: "100%" }} onChange={handleChange} options={selMem} />
        )
    }

    //render form
    return (<section className="content" style={{ display: props.display }}>
        <div className="container-fluid">
            <h6>New Assignment</h6>
            <div className="card">
                <div className="card-header">

                </div>
                <div className="card-body">

                    <section className="content">
                        <div className="row justify-content-md-center">
                            <div className="col-md-6">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">Assign New Member </h3>
                                    </div>
                                    <form onSubmit={onSubmit}>


                                        <div className="card-body">

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

export default EditAssignedMemberForm;
