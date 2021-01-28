import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
class Reg extends Component {
  state = {
    mainArray: { name: "", email: "", password: "" },
    validator: new SimpleReactValidator(),
  };
  handleChange = (e) => {
    const { currentTarget: inp } = e;
    let localArr = this.state.mainArray;
    localArr[inp.name] = inp.value;
    // console.log(localArr);
    this.setState({ mainArray: localArr });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    let localArr = this.state.mainArray;
    console.log(this.state.mainArray);
    if (this.state.validator.allValid()) {
      // console.log(response);
      try {
        let response = await axios.post(
          "http://192.168.43.62:2400/user/register",
          localArr
        );
        console.log(response);
        this.props.history.push("/login");
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 700) {
          alert(error.response.data.message);
        }
      }
    } else {
      this.state.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Registration Form</h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={this.state.mainArray.email}
            onChange={this.handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          {this.state.validator.message(
            "email",
            this.state.mainArray.email,
            "required|email",
            { className: "text-danger" }
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            name="name"
            value={this.state.mainArray.name}
            onChange={this.handleChange}
          />
          {this.state.validator.message(
            "name",
            this.state.mainArray.name,
            "required|alpha",
            { className: "text-danger" }
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={this.state.mainArray.password}
            onChange={this.handleChange}
          />
          {this.state.validator.message(
            "password",
            this.state.mainArray.password,
            "required|min:5",
            { className: "text-danger" }
          )}
        </div>
        <div className="mb-3" style={{ cursor: "pointer" }}>
          <Link to="/login"> Already Registered Please Signin</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Reg;
