import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "../Common/NavBar";
import Footer from "../Common/Footer";
import { Modal } from "react-bootstrap";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import { toast } from "react-toastify";
import {
  uploadProfilePic,
  change_password,
} from "../../controllers/memeber.controller";
import { get_pastdes_member } from "../../controllers/memeber.controller";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import img_default from "../../images/img.jpg";
import Config from "../../controllers/config.controller";
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      addfname: "",
      addlname: "",
      addmname: "",
      addmnumber: "",
      addpemail: "",
      addoemail: "",
      addphone: "",
      addpassword: "",
      addcpassword: "",
      finalProflilePic: null,
      showProfilepicModal: false,
      files: null,
      profilepic: null,
      picsrc: "",
      pasdes: [],


      c_password: "",
      n_password: "",
      con_password: "",
    };
  }

  check_auth = () => {
    const cheeck_auth = this.props.auth.isAuthenticatedweb;
    console.log(cheeck_auth);
    if (!cheeck_auth) this.props.history.push("/MemberLogin");
  };

  componentDidMount() {
    console.log(this.props.auth);
    get_pastdes_member(this.props.auth.user.memberShipNo)
      .then((data) => {
        this.setState({ pasdes: data.data });
      })
      .catch((err) => {
        console.log(err);
      }
      
     );
  }
  componentWillMount() {
    this.check_auth();
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  showProfilePicModal() {
    this.setState({ showProfilepicModal: true });
  }
  setErrorToast(msg) {
    toast.error(msg, {
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  }

  setToast(msg) {
    toast(msg, {
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  }

  formValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleProfilePic(e) {
    e.preventDefault();
    if (this.state.files != null || this.state.files != undefined) {
      console.log(this.state.files[0]);
      var status = await uploadProfilePic(
        this.state.files[0],
        this.props.auth.user.memberShipNo
      );
      switch (status) {
        case 200:
          await this.setState({ showProfilepicModal: false });
          await this.check_auth();
          this.setToast("Updated");

          return 0;
        case 401:
          this.setErrorToast("Something went wrong");
          break;
        default:
          this.setErrorToast("Something went wrong");
          break;
      }
    } else {
      alert("Please select profile picture");
    }
  }

  change_password_submirt = async (e) => {
    e.preventDefault();
    var data = {
      id: this.props.auth.user._id,
      c_password: this.state.c_password,
      n_password: this.state.n_password,
    };
    console.log(data);

    console.log(this.state.con_password.localeCompare(this.state.n_password));
    if (
      this.state.con_password.localeCompare(this.state.n_password) == -1 ||
      this.state.con_password.localeCompare(this.state.n_password) == 1
    ) {
      return alert("Password can not match");
    }

    change_password(data)
      .then((response) => {
        console.log(response);
        if (response.code == 200) {
          this.setState({
            c_password: "",
            n_password: "",
            con_password: "",
          });
          this.setToast("Password Update");
        }
      })
      .catch((err) => {
        this.setErrorToast("Current password is incorrect");
        this.setState({
          c_password: "",
          n_password: "",
          con_password: "",
        });
        console.log(err);
      });
  };

  render() {
    const user = this.props.auth.user;

    return (
      <section className="content">
        <NavBar />
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-8 order-lg-2">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    href
                    data-target="#profile"
                    data-toggle="tab"
                    className="nav-link active"
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href
                    data-target="#messages"
                    data-toggle="tab"
                    className="nav-link"
                  >
                    Activity
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href
                    data-target="#edit"
                    data-toggle="tab"
                    className="nav-link"
                  >
                    Change Password
                  </a>
                </li>
              </ul>
              <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                  <h5 className="mb-3">User Profile</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Membership Number</h6>
                      <p>
                        <input
                          disabled
                          value={user.memberShipNo}
                          className="form-control"
                          type="text"
                        />
                      </p>
                      <h6>Name</h6>
                      <p>
                        <input
                          disabled
                          className="form-control"
                          value={user.fname + "  " + user.lname}
                          type="text"
                        />
                      </p>
                      <h6>Affiliation</h6>
      
                      <p>
                        <input
                          disabled
                          className="form-control"
                          value={user.affiID}
                          type="text"
                        />
                      </p>
               
                      <h6>Email</h6>
                      <p>
                        <input
                          disabled
                          className="form-control"
                          value={user.email}
                          type="text"
                        />
                      </p>
                      <h6>Contact No.</h6>
                      <p>
                        <input
                          disabled
                          className="form-control"
                          value={user.contactNo}
                          type="text"
                        />
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6>Reward Points</h6>
                      <h2>
                      <a className="badge badge-pill green">
                        {this.calcRewards(this.state.pasdes)} 
                      </a>
                      </h2>
                      <hr />
                    </div>
                  </div>
                  {/*/row*/}
                </div>
                <div className="tab-pane" id="messages">
                  <div className="col-md-12">
                    <div className="mt-2">
                      <div className="col-md-12">
                        <div className="mt-2">
                        </div>
                        <table className="table table-sm table-hover table-striped">
                          <tbody>
                            {this.state.pasdes.map((row, i) => (
                              <tr>
                                <td key={i}>
                                  <strong>{user.fname}</strong> was the{" "}
                                  {row.title} of{" "}
                                  <strong>{row.affiliationTitle}</strong> -{" "}
                                  {row.Year}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="tab-pane" id="edit">
                    <form onSubmit={(e) => this.change_password_submirt(e)}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">
                          Membership Number
                        </label>
                        <div className="col-lg-9">
                          <input
                            disabled
                            value={user.memberShipNo}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">
                          Current password
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            value={this.state.c_password}
                            required
                            type="password"
                            name="c_password"
                            onChange={(e) => this.formValueChange(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">
                          New Password
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            value={this.state.n_password}
                            required
                            type="password"
                            name="n_password"
                            onChange={(e) => this.formValueChange(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label  form-control-label">
                          Confirm password
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            value={this.state.con_password}
                            required
                            type="password"
                            name="con_password"
                            onChange={(e) => this.formValueChange(e)}
                          />
                        </div>
                      </div>
                      {/*====================================================================*/}
                      {/*============================== Models ==============================*/}
                      {/*====================================================================*/}

                      {/*===============================================*/}
                      {/*=============== Profile Picture ===============*/}
                      {/*===============================================*/}
                      <Modal
                        size="lg"
                        show={this.state.showProfilepicModal}
                        centered
                        onHide={() =>
                          this.setState({ showProfilepicModal: false })
                        }
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Change Profile Picture</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <form>
                            <div className="IS_UI_ProfilepicModal">
                              <p>
                                Select a photo of you to set as your profile
                                picture.
                              </p>
                              <center>
                                <FilePond
                                  ref={(ref) => (this.pond = ref)}
                                  files={this.state.files}
                                  allowMultiple={false}
                                  allowImageCrop={false}
                                  // imageCropAspectRatio="1:1"
                                  acceptedFileTypes={["image/*"]}
                                  oninit={() => this.handleInit()}
                                  onupdatefiles={(fileItems) => {
                                    // Set currently active file objects to this.state
                                    this.setState({
                                      files: fileItems.map(
                                        (fileItem) => fileItem.file
                                      ),
                                    });
                                  }}
                                ></FilePond>
                                <button
                                  className="btn btn-success"
                                  onClick={(e) => this.handleProfilePic(e)}
                                >
                                  Set as Profile Picture
                                </button>
                              </center>
                            </div>
                          </form>
                        </Modal.Body>
                      </Modal>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label" />
                        <div className="col-lg-9">
                          <input
                            type="reset"
                            className="btn btn-secondary"
                            defaultValue="Cancel"
                          />
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
               
              </div>
              </div>
              <div className="col-lg-4 order-lg-1 text-center">
                <img
                  src={
                    user.profilepic == undefined
                      ? img_default
                      : `${Config.host}${Config.port}/${user.profilepic}`
                  }
                  style={{ width: "50%" }}
                  className="mx-auto img-fluid img-circle d-block"
                  alt="avatar"
                />

                <h6 className="mt-2">Upload a different photo</h6>
                <label className="custom-file">
                  <button
                    onClick={() => this.showProfilePicModal()}
                    className="btn btn-success"
                  >
                    {" "}
                    <span className="custom-file-control">
                      Choose file
                    </span>{" "}
                  </button>
                </label>
              </div>
            
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  calcRewards = (data = []) => {
    return data.reduce((prev, current) => {
      return prev + this.getRewardPoints(current.title);
    }, 0);
  };

  getRewardPoints = (title) => {
    switch (title.toLowerCase()) {
      case "president":
        return 5;
      case "secretary":
        return 3;
      case "chairman":
        return 10;
      case "chair":
        return 10;
      case "leader":
        return 5;
      case "treasurer":
        return 2;
      default:
        return 0;
    }
  };
}

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(UserProfile));
