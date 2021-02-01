import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
class DashBoard extends Component {
  state = {
    inpArr: {},
  };
  async componentDidMount() {
    let token = localStorage.getItem("token");
    console.log(token);
  }
  handleLogOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    console.log(this.props);
    let name;
    if (this.props.data.userInfo !== undefined) {
      name = this.props.data.userInfo.name;
    }
    return (
      <div className="text-center">
        <h1 className="mt-3">DashBoard</h1>
        <h4 className="mt-3">Welcome {name}</h4>
        <button className="btn btn-danger" onClick={() => this.handleLogOut()}>
          Logout
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.userInfo,
  };
};

export default connect(mapStateToProps)(DashBoard);
