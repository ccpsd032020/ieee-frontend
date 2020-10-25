import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../Redux/Action/authAction";



class Sidebar extends Component {
  constructor(props) {
    super(props);
    let role  = (props.auth &&  
      props.auth.user &&  props.auth.user.role == "Chair") ? 1:0
    console.log(role)
    this.state = {
      loginState: false,
      user: "",
      uemail: "",
      role: role,
    };
  }

  check_auth = () => {
    const cheeck_auth = this.props.auth.isAuthenticated;
    console.log(cheeck_auth);
    if (!cheeck_auth) {
      this.props.history.push("/AdminLogin")
    }
  };

  componentWillMount() {
    this.check_auth();
  }

  componentDidMount = () => {
    console.log(this.props.auth.isAuthenticated);
    console.log(this.props.auth);
    this.setState({
      user: this.props.auth.user.fname,
      ulname: this.props.auth.user.lname,
    });
    if (this.props.auth.user.role != undefined) {
      if (this.props.auth.user.role == "Chair")
        this.setState({
          role: 1,
        });
    }
  };
  


  render() {
    return (
      <aside className="main-sidebar sidebar-dark-info elevation-4">
        {/*
          <!-- Brand Logo --> */}
        <Link className="brand-link">
          <img
            src="/images/ieee.png"
            alt="AdminLTE Logo"
            className="brand-image"
            style={{ opacity: "10" }}
          />
          <span className="brand-text font-weight-light">IEEE - Sri Lanka</span>
        </Link>

        {/*
          <!-- Sidebar --> */}
        <div className="sidebar">
          {/*
            <!-- Sidebar user panel (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/images/user.jpg" className="img-circle" alt="User" />
            </div>
            <div className="info">
              <a className="d-block">
                {this.state.user}&nbsp;{this.state.ulname}
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item pointer_cursor">
                <Link id="eventNav" className="nav-link" to="/Admin/EventTable">
                  <i className="nav-icon far fa-calendar-alt"></i>
                  Event Management
                  <span className="badge badge-info right"></span>
                </Link>
              </li>

              {this.state.role != 1 ? (
                <li class="nav-item has-treeview">
                  <Link
                    class="nav-link"
                    data-toggle="collapse"
                    data-target="#member"
                  >
                    <i class="nav-icon fas fa-users"></i>
                    <p>
                      Member Management
                      <i class="right fas fa-angle-left"></i>
                    </p>
                  </Link>

                  <div id="member" class="collapse">
                    <ul>
                      <li class="nav-item">
                        <Link className="nav-link" to="/Admin/MemberList">
                          <p>Active Members</p>
                        </Link>
                      </li>

                      <li class="nav-item">
                        <Link className="nav-link" to="/Admin/MemberRequest">
                          <p>Requests</p>
                        </Link>
                      </li>

                      <li class="nav-item">
                        <Link className="nav-link" to="/Admin/MemberAdd">
                          <p>Create Profile</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null}

              <li className="nav-item pointer_cursor">
                <Link
                  id="affiliationNav"
                  className="nav-link"
                  to="/Admin/AffiliationTable"
                >
                  <i className="nav-icon fas fa-handshake"></i>
                  Affiliation Management
                  <span className="badge badge-info right"></span>
                </Link>
              </li>

              <li className="nav-item pointer_cursor">
                <Link
                  id="affiliationNav"
                  className="nav-link"
                  to="/Admin/Affiliationview"
                >
                  <i className="nav-icon fas fa-user-graduate"></i>
                  Affiliation View
                  <span className="badge badge-info right"></span>
                </Link>
              </li>
                        {this.state.role != 1 ? (
              <li className="nav-item pointer_cursor">
                <Link
                  id="eventNav"
                  className="nav-link"
                  to="/Admin/DesignationAdmin"
                >
                  <i className="nav-icon fa fa-address-card"></i>
                  Designation Management
                  <span className="badge badge-info right"></span>
                </Link>
              </li>
                        ) : (
                       
            
              <li className="nav-item pointer_cursor">
                <Link
                  id="eventNav"
                  className="nav-link"
                  to="/Admin/DesignationChair"
                >
                  <i className="nav-icon fa fa-address-card"></i>
                  Designation Management
                  <span className="badge badge-info right"></span>
                </Link>
                        </li> )}
                    {this.state.role != 1 ? (
                            <li className="nav-item pointer_cursor">
                                <Link
                                    id="eventNav"
                                    className="nav-link"
                                    to="/Admin/ActivityLog"
                                >
                                    <i className="nav-icon fa fa-briefcase"></i>
                  Activity log
                  <span className="badge badge-info right"></span>
                                </Link>
                            </li>
                        ) : null}
              {this.state.role != 1 ? (
                <li class="nav-item has-treeview">
                  <Link
                    class="nav-link"
                    data-toggle="collapse"
                    data-target="#admin"
                  >
                    <i class="nav-icon fa fa-key"></i>
                    <p>
                      Admin
                      <i class="right fas fa-angle-left"></i>
                    </p>
                  </Link>

                  <div id="admin" class="collapse">
                    <ul>
                      <li class="nav-item">
                        <Link className="nav-link" to="/Admin/AdminList">
                          <p>Active Admins</p>
                        </Link>
                      </li>

                      <li class="nav-item">
                        <Link className="nav-link" to="/Admin/Admin">
                          <p>Add Admin</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                ""
              )}

            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth || {},
});


export default connect(mapStateToProps, null)(withRouter(Sidebar));
