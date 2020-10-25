import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Config from '../../controllers/config.controller'
import useForceUpdate from 'use-force-update';
import { useSelector } from "react-redux";

//controllers
import { addDesignation } from '../../controllers/designation.controller'
import { get_all_affiliations, get_affiliation } from "../../controllers/affiliation.controller";
import { add_activity } from '../../controllers/activity.controller'

const CreateDesignationForm = (props) => {

    var memshipid = useSelector(state => state.auth.user.memberShipNo);
    var memfname = useSelector(state => state.auth.user.fname);
    var memlname = useSelector(state => state.auth.user.lname);

    //for updating components
    const forceUpdate = useForceUpdate();

    //for getting date
    const [today, setToday] = useState(

    );
    const todayfucn = () => {
        let newDate = new Date()

        const today = newDate.toLocaleString();
        setToday(today)
    }

    useEffect(() => {
        let newDate = new Date()

        const today = newDate.toLocaleString();
        setToday(today)
        todayfucn()
    });

    //variable to store destinations
    let [designation, setDesignation] = useState({
        title: "not set",
        affiliationNo: "not set",
        type: "not set",
        created_at: today,


    });

    //variable to store activities
    let [activity] = useState({
        MemNo: memshipid + " - " + memfname + " " + memlname,
        action: "New Designation",
        table: "Designations",
        parameters: "not set",
        datetime: ""
    });

    //handle form changes - general
    const handleChange = (e) => {
        setDesignation({ ...designation, [e.target.name]: e.target.value });
    }

    //handle form changes - for affiliations select
    const handleAffChange = (e) => {
        setDesignation({ ...designation, "affiliationNo": e.value });
        window.selectedaff = setAffData(e.value);
        aff();
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
        const date = new Date();
        e.preventDefault()
        //validation 
        if (designation.affiliationNo == "not set") {
            Config.setToast("Enter affiliation")
        }
        else {
            //add designation to database
            const result = await addDesignation(designation)
            //set parameters for activity variable
            var detAff = await setAffDetails(designation.affiliationNo)
            const det = detAff + "/" + designation.title + "/" + designation.type
            activity.parameters = det;
            //set date for activity variable
            activity.datetime = date.toLocaleString();
            //add activity to database
            await add_activity(activity)
            if (result.code == 200) {
                clear()
                Config.setToast("Designation Added Successfully")
                forceUpdate();
            }
        }
    }

    //clears the form after inserting data to database
    const clear = () => {
        setDesignation({
            title: "not set",
            affiliationNo: "not set",
            type: "not set",
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

    //select for affiliations
    const aff = () => {
        return (
            <Select required value="" className="select2" id="affiliation" name="affiliationNo" placeholder={window.selectedaff} style={{ width: "100%" }} onChange={handleAffChange} options={sel} />
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
                                        <h3 class="card-title pb-1 mb-1" style={{ fontWeight: '600' }}>Add New Designation</h3>

                                    </div>

                                    <div class="card-body">

                                        <form onSubmit={onSubmit}>
                                            <div class="form-group">


                                                <label >Designation Title : </label>
                                                <input required type="text" id="title" name="title" class="form-control" onChange={handleChange} />
                                                
                                                <div className="form-group">
                                                    <label>Affiliation</label>
                                                    {aff() }
                                                </div>

                                                <div className="form-group">
                                                    <label>type</label>
                                                    <select required className="select2" id="type" name="type" data-placeholder="Select type" style={{ width: "100%" }} onChange={handleChange}>
                                                        <option value="" disabled selected hidden value = "">Select type</option>
                                                        <option value= "Normal">Normal</option>
                                                        <option value="Chair">Chair</option>
                                                    </select>
                                                </div>

                                                <div class="card-footer" style={{ padding: '0px ' }}>
                                                    <button type="submit" class="btn btn-info">Add Submission</button>
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

export default CreateDesignationForm;