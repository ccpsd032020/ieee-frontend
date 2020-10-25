import React, { useState, useEffect } from "react";
import { get_all_activities, delete_report } from "../../controllers/activity.controller";
import Config from '../../controllers/config.controller'
//import EventReportView from './EventReportView'
import { Link } from "react-router-dom";

import useForceUpdate from 'use-force-update';
import 'jquery/dist/jquery.min.js';
import $ from "jquery"
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


const ActivityTable = (props) => {
    const [activity, SetActivities] = useState([]);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        var res = await get_all_activities();
        await SetActivities(res.data.data);
        $("#activityTable").dataTable();
    }

    const readydata = () => {
        return activity.map((activity, i) => {
            return (
                <tr key={i}>
                    <td>{activity.MemNo}</td>
                    <td>{activity.action}</td>
                    <td>{activity.table}</td>
                    <td>{activity.datetime}</td>
                    <td>{activity.parameters}</td>
                </tr>
            );
        });
    };

    return (
        <section className="content" style={{ display: props.display }}>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        {/* <!-- <h3 className="card-title">DataTable with default features</h3> --> */}
                        {/*<button type="button" onClick={() => {props.onClick("EReport"); }} className="btn btn-success float-right add_btn" >Repport Management</button>*/}
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <table
                            id="activityTable"
                            className="table table-bordered table-striped dataTable"
                        >
                            <thead>
                                <tr>
                                    <th>Member ID</th>
                                    <th>Action</th>
                                    <th>Table Title</th>
                                    <th>Date & Time</th>
                                    <th>Parameters</th>
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

export default ActivityTable;
