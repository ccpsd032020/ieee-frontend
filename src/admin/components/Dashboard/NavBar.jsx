import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { setCurrentUser, SignOut } from "../Redux/Action/authAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";



class NavBar extends Component {
  constructor(props) {
    super(props);
  }


  signoutuser = () => {
    this.props.SignOut && this.props.SignOut();
  
    this.setState({
      loginState: false,
    });
    this.props.history.push("/AdminLogin");
  };
  render() {
   return (
     <div className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">Home</a>
        </li>
      </ul>


      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
     
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown">
          <i class="fas fa-angle-down"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
            <button className="dropdown-item" onClick={() => this.signoutuser()}>
               <i class="fas fa-sign-out-alt"> &emsp;</i>
               Logout
            </button>
  
          </div>
        </li>
      </ul>
    </div>);
}
}


const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  SignOut,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));

