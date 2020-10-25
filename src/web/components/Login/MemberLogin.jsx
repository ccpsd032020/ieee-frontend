import React, { Component } from "react";
import NavBar from "../Common/NavBar";
import Footer from "../Common/Footer";
import Background from "../../images/Login.jpg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { setCurrentUser } from "../Redux/Action/authAction";
import { connect } from "react-redux";
import { sign_controller } from "../../controllers/memeber.controller";
import { toast } from "react-toastify";
class MemberLogin extends Component {
  constructor() {
    super();

    this.state = {
      // user login details
      memberShipNo: "",
      uPass: "",
    };
  }

  setErrorToast(msg) {
    toast.error(msg, {
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  }

  formValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    sign_controller(this.state.memberShipNo, this.state.uPass)
      .then((result) => {
         this.props.setCurrentUser(result.data.data.details);
        this.props.history.push("/UserProfile");
      })
      .catch((err) => {
        console.log(err.code);
        this.setErrorToast("Invalid Credentials")
      });
  };

  render() {
    return (
      <div>
        <NavBar />

        <div>
          <body
            className="hold-transition login-page"
            style={{
              background: `url(${Background})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="login-box">
              <div className="login-logo">
               <Link to="/MemberLogin" style={{ color: "white" }}>
                  <b>Member Login</b>
               </Link>
              </div>

              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">IEEE - Sri Lanka Section</p>

                  <form onSubmit={(e) => this.onSubmitForm(e)}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Membership Number"
                        name="memberShipNo"
                        onChange={(e) => this.formValueChange(e)}
                        value={this.state.memberShipNo}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="uPass"
                        value={this.state.uPass}
                        onChange={(e) => this.formValueChange(e)}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">

                      <div className="col">
                        <button className= "btn btn-primary btn-block" type="submit"> Sign In</button>
                      </div>
                    </div>
                  </form>

                  {/* <p className="mb-2">
                    <br></br>
                   <Link to="">I forgot my password</Link>
                  </p> */}
                     <br></br>

                  <p className="mb-2">
                   <Link to="/Registration">Don't have an Accout? Create New</Link>
                  </p>
          
                </div>
              </div>
            </div>
          </body>
        </div>
        <Footer />
      </div>
    );
  }
}
export default connect(null, { setCurrentUser })(withRouter(MemberLogin));
