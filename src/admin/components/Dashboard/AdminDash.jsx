// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import { get_no_aff_type, get_active_mem_count, get_all_mem_count, get_pending_mem_count } from '../../controllers/designation.controller'
// import { get_all_events } from "../../controllers/event.controller";


// const AdminDash = (props) => {

//     let [open, SetOpen] = useState([]);
//     let [close, SetClose] = useState([]);
//     let [affwie, SetAffwie] = useState([]);
//     let [affsb, SetAffsb] = useState([]);
//     let [affyp, SetAffyp] = useState([]);
//     let [afftc, SetAfftc] = useState([]);
//     let [acmem, SetAcmem] = useState([]);
//     let [allmem, SetAllmem] = useState([]);
//     let [pendingmem, SetPendingmem] = useState([]);
//     const [eventso, setEventso] = useState([]);
//     const [eventsc, setEventsc] = useState([]);
//     useEffect(() => {
//         getDatao();
//         getDatac();
//     }, []);

//     async function getDatao() {
//         var res = await get_all_events();
//         await setEventso(res.data.data);
//     }

//     async function getDatac() {
//         var res = await get_all_events();
//         await setEventsc(res.data.data);
//     }

//     async function getactivemem() {
//         var result = await get_active_mem_count("1")
//         await SetAcmem(result.data.data)
//     }

//     async function getallmem() {
//         var result = await get_all_mem_count("1")
//         await SetAllmem(result.data.data)
//     }

//     async function getreqmem() {
//         var result = await get_pending_mem_count("1")
//         await SetPendingmem(result.data.data)
//     }

//     async function getaffwie(id) {
//         var result = await get_no_aff_type(id)
//         await SetAffwie(result.data.data)
//     }

//     async function getaffsb(id) {
//         var result = await get_no_aff_type(id)
//         await SetAffsb(result.data.data)
//     }

//     async function getaffyp(id) {
//         var result = await get_no_aff_type(id)
//         await SetAffyp(result.data.data)
//     }

//     async function getafftc(id) {
//         var result = await get_no_aff_type(id)
//         await SetAfftc(result.data.data)
//     }

//     const getaccmem = () => {
//         getactivemem()
//         return (acmem);
//     }

//     const getalmem = () => {
//         getallmem()
//         return (allmem);
//     }

//     const getrmem = () => {
//         getreqmem()
//         return (pendingmem);
//     }

//     const getnowie = () => {
//         getaffwie("Women In Enginerring Affiliation")
//         return (affwie);
//     }

//     const getnosb = () => {
//         getaffsb("Student Branch")
//         return (affsb);
//     }

//     const getnoyp = () => {
//         getaffyp("Young Professionals Affiliation")
//         return (affyp);
//     }

//     const getnotc = (id) => {
//         getafftc("Technical Chapter")
//         return (afftc);
//     }

//     async function loadOpenEvents() {
//         var today = new Date();
//         var o = 0;
//         await eventso.map((eventso, index) => {
//             var eventDate = new Date(eventso.eventDate);
//             if (today <= eventDate) {
//                 o = o + 1;
//             }
//         });
//         await SetOpen(o);
//         await console.log(open)
//     };

//     async function loadCloseEvents() {
//         var today = new Date();
//         var c = 0;
//         await eventsc.map((eventsc, index) => {
//             var eventDate = new Date(eventsc.eventDate);
//             if (today > eventDate) {
//                 c = c + 1;
//             }
//         });
//         await SetClose(c);
//     };

//     const getopen = () => {
//         loadOpenEvents()
//         return (open);
//     }

//     const getclose = () => {
//         loadCloseEvents()
//         return (close);
//     }

//     return (
//         <section className="content" >
//             <div class="container-fluid">
//                 <div class="card-header">
//                     <h3 class="card-title">Active Affiliations</h3>
//                 </div>
//                 <div class="row">
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-info"><i class="far fa fa-graduation-cap"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Student Branches</span>
//                                 <span class="info-box-number">{getnosb()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-info"><i class="far fa fa-female"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Women In Engineering</span>
//                                 <span class="info-box-number">{getnowie()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-info"><i class="far fa fa-child"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Young Professionals</span>
//                                 <span class="info-box-number">{getnoyp()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-info"><i class="far fa fa-cog"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Technical Chapters</span>
//                                 <span class="info-box-number">{getnotc()}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card-header">
//                     <h3 class="card-title">Member Details</h3>
//                 </div>
//                 <div class="row">{ /*
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-info"><i class="far fa fa-users"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">All Members</span>
//                                 <span class="info-box-number">{getalmem()}</span>
//                             </div>
//                         </div>
//                     </div> */}
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-success"><i class="far fa fa-user"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Active Members</span>
//                                 <span class="info-box-number">{getaccmem()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-danger"><i class="far fa fa-user-plus"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Requests</span>
//                                 <span class="info-box-number">{getrmem()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-success"><i class="far fa fa-calendar-o"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Upcomming Events</span>
//                                 <span class="info-box-number">{getopen()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-3 col-sm-6 col-12">
//                         <div class="info-box">
//                             <span class="info-box-icon bg-danger"><i class="far fa fa-calendar-o"></i></span>

//                             <div class="info-box-content">
//                                 <span class="info-box-text">Closed Events</span>
//                                 <span class="info-box-number">{getclose()}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
// export default AdminDash;