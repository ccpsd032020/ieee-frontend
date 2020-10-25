import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import Select from 'react-select'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//controllers
import { update_designation, get_spec_designations } from '../../controllers/designation.controller'
import { get_all_affiliations, get_affiliation } from "../../controllers/affiliation.controller";
import { add_activity } from '../../controllers/activity.controller'
import Config from '../../controllers/config.controller'

const EditDesignation = (props) => {

    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //get passed parameters
    const id = useParams()
    const newId = id.desId

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
        //set parameters for activity variable
        var detAff = await setAffDetails(designation.affiliationNo)
        activity.parameters = detAff + " / " + designation.title + " / " + designation.type;
        //update designation
        const result = await update_designation(designation, id.desId)
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
