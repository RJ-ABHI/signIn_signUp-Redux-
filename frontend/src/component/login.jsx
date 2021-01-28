import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  state = {
    mainArray: { email: "", password: "" },
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
    if (this.state.validator.allValid()) {
      try {
        let response = await axios.post(
          "http://192.168.43.62:2400/user/login",
          this.state.mainArray
        );
        if (response.status === 200) {
          console.log(response);
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/dashboard");
        }
      } catch (error) {
        console.log(error.response);
        if (error.response && error.response.status === 404) {
          alert(error.response.data.messege);
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
        <h2>Login Form</h2>
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

          {this.state.validator.message(
            "email",
            this.state.mainArray.email,
            "required|email",
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
          <Link to="/registration"> Not Registered !!! Please Signup</Link>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
