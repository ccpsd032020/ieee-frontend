import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser, SignOut } from "../Redux/Action/authAction";
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      loginState: false,
    };

    // this.check_auth()
  }

  signoutuser = () => {
    this.props.SignOut && this.props.SignOut();

    this.setState({
      loginState: false,
    });

    this.props.history.push("/");
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticatedweb) {
      this.setState({
        loginState: true,
      });
    }
  }

  render() {
    return (
      <nav className="mb-1 navbar navbar-expand-lg navbar-light scrolling-navbar">
        <Link to="/" className="navbar-brand ml-5" style={{ color: "white" }}>
          <img src="/images/ieee-icon.png" height="40" alt="IEEE logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent-333"
          aria-controls="navbarSupportedContent-333"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent-333"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink-333"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right dropdown-default"
                aria-labelledby="navbarDropdownMenuLink-333"
              >
                {this.state.loginState == true ? (
                  <Link
                    className="dropdown-item"
                    onClick={() => this.signoutuser()}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/MemberLogin">
                    Login
                  </Link>
                )}
                {this.state.loginState == true ? (
                  <Link className="dropdown-item" to="/UserProfile">
                    My Account
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/Registration">
                  Register
                </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  SignOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
