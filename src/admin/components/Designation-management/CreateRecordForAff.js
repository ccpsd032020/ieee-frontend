import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import Select from 'react-select'
import moment from 'moment';
import Config from '../../controllers/config.controller'
import useForceUpdate from 'use-force-update';
import { useSelector } from "react-redux";

//controllers
import { addPastDesignation } from '../../controllers/pastdes.controller'
import { get_all_affiliations, get_affiliation } from "../../controllers/affiliation.controller";
import { get_aff_spec_members, get_spec_member } from "../../controllers/designation.controller";
import { add_activity } from '../../controllers/activity.controller'

const CreateRecord = (props) => {

    //for updating components
    const forceUpdate = useForceUpdate();

    //get passed parameters
    const id = useParams()
    const aff = id.aff

    //affiliation id of logged in user
    var affil = useSelector(state => state.auth.user.affiID);
    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //for getting date
    const [today, setToday] = useState(

    );
    const todayfucn = () => {
        let newDate = new Date()

        const today = moment(newDate).format("MMM Do YY");
        setToday(today)
    }

    useEffect(() => {
        let newDate = new Date()

        const today = moment(newDate).format("MMM Do YY");
        setToday(today)
        todayfucn()
    });

    //variable to store activities
    let [activity] = useState({
        MemNo: memshipid + " - " + memfname + " " + memlname,
        action: "New Record - Chair",
        table: "Records",
        parameters: "not set",
        datetime: ""
    });

    //variable to store past destinations
    let [pastdes, setPastDes] = useState({
        title: "",
        affiliationNo: "",
        MemNo: "",
        Year: "",
        created_at: today,


    });

    //variable to store members
    const [member, setMember] = useState([]);
    useEffect(() => {
        getMemData();

    }, []);

    //get members specific to the logged users affiliation from data base
    async function getMemData() {
        window.selectedaff = "Select affiliaion";
        window.selectedmem = "Select member";
        var res = await get_aff_spec_members(affil);
        await setMember(res.data.data);
    }

    //get member data for a given _id
    const setMemData = (id) => {
        return member.map((member, index) => {
            if (id == member._id) {
                return (member.fname + " " + member.lname + " - " + member.memberShipNo);
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

    //handle form changes - for member select
    const handleMemChange = (e) => {
        setPastDes({ ...pastdes, "MemNo": e.value });
        window.selectedmem = setMemData(e.value);
        mem();
    }

    //handle form changes - general
    const handleChange = (e) => {
        setPastDes({ ...pastdes, [e.target.name]: e.target.value, affiliationNo: aff });
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
            return ("Affiliation not foound")
        }
        else {
            return (result.data.data.affiliationno + " - " + result.data.data.affiliationname)
        }
    }

    //runs on submit
    const onSubmit = async (e) => {
        const date = new Date();
        e.preventDefault()
        //validation
        if (pastdes.MemNo == "") {
            Config.setToast("Select Member")
        }
        else {
            //add past designation to database
            const result = await addPastDesignation(pastdes)
            //set parameters for activity variable
            var detMem = await setMemDetails(pastdes.MemNo)
            var detAff = await setAffDetails(pastdes.affiliationNo)
            const det = pastdes.title + "/" + detMem + "/" + pastdes.Year + " / " + detAff
            activity.parameters = det;
            //set date for activity variable
            activity.datetime = date.toLocaleString();
            //add activity to database
            await add_activity(activity)
            if (result.code == 200) {
                clear()
                Config.setToast("Record Added Successfully")
                forceUpdate();
            }
        }
    }

    //clears the form after inserting data to database
    const clear = () => {
        setPastDes({
            title: "",
            affiliationNo: "",
            MemNo: "",
            Year: "",
            created_at: today,
        })
    }

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

    //set options for select to show affiliations
    const loadAffData = () => {
        return affiliations.map((affiliations, index) => {
            return (
                <option value={affiliations._id }>{affiliations.affiliationname}</option>
            );
        });
    };

    //get affiliation data for a given _id
    const setAffData = (id) => {
        return affiliations.map((affiliations, index) => {
            if (id == affiliations._id) {
                return (affiliations.affiliationno + " - " + affiliations.affiliationname);
            }
        });
    };

    //select for members
    const mem = () => {
        return (
            <Select required value="" className="select2" id="MemNo" name="MemNo" placeholder={window.selectedmem} style={{ width: "100%" }} onChange={handleMemChange} options={selMem} />
        )
    }

    //render form
    return (<section className="content" style={{ display: props.display }}>
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                </div>
                <div className="card-body">

                    <section class="content">
                        <div class="row justify-content-md-center">
                            <div class="col-md-12">
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title pb-1 mb-1" style={{ fontWeight: '600' }}>Add Record</h3>

                                    </div>

                                    <div class="card-body">

                                        <form onSubmit={onSubmit}>
                                            <div class="form-group">

                                                <div className="form-group">
                                                    <select hidden className="select2" id="affiliationNo" name="affiliationNo" data-placeholder="Select affiliation" style={{ width: "100%" }} onChange={handleChange} disabled>
                                                        {loadAffData()}
                                                    </select>
                                                </div>

                                                <label for="inputFName"> Designation Title : </label>
                                                <input required type="text" id="title" name="title" class="form-control" onChange={handleChange} />

                                                <div className="form-group">
                                                    <label>Member</label>
                                                    { mem()}
                                                </div>

                                                <label for="inputFName">Year : </label>
                                                <input required type="text" id="Year" name="Year" class="form-control" onChange={handleChange} />

                                                <div class="card-footer" style={{ padding: '0px ' }}>
                                                    <button type="submit" class="btn btn-info">Add Record</button>
                                                </div>
                                            </div>


                                        </form>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
        {console.log("bye")}
    </section>);
}

export default CreateRecord;