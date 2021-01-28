import React, { Component } from "react";
import axios from "axios";
class DashBoard extends Component {
  state = {
    inpArr: {},
  };
  async componentDidMount() {
    let token = localStorage.getItem("token");
    console.log(token);
    let response = await axios.get("http://192.168.43.62:2400/user", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: "admin " + token,
      },
    });
    console.log(response);
    this.setState({ inpArr: response.data });
  }
  handleLogOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="text-center">
        <h1 className="mt-3">DashBoard</h1>
        <h4 className="mt-3">Welcome {this.state.inpArr.name}</h4>
        <button className="btn btn-danger" onClick={() => this.handleLogOut()}>
          Logout
        </button>
      </div>
    );
  }
}

export default DashBoard;
