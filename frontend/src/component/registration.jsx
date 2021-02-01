import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../redux/action/userAction";
import { Link } from "react-router-dom";
const Registration = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.userInfo;
  });

  const { userInfo, error } = state;
  console.log(state);
  console.log(error);
  const [userState, setState] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dispatch(registerUserAction(userState)));
    console.log(error);
    console.log(state);
    // console.log(props);
    if (window.localStorage.getItem("token")) {
      props.history.push("/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <div>
        {state.error ? (
          <div className="alert alert-danger" role="alert">
            {error}{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>

        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          value={userState.email}
          onChange={handleChange}
        />
        {/* {this.userState.validator.message(
          "email",
          this.userState.mainArray.email,
          "required|email",
          { className: "text-danger" }
        )} */}
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail2">Email address</label>

        <input
          type="name"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter Name"
          name="name"
          value={userState.name}
          onChange={handleChange}
        />
        {/* {this.userState.validator.message(
          "email",
          this.userState.mainArray.email,
          "required|email",
          { className: "text-danger" }
        )} */}
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          value={userState.password}
          onChange={handleChange}
        />
        {/* {this.state.validator.message(
          "password",
          this.state.mainArray.password,
          "required|min:5",
          { className: "text-danger" }
        )} */}
      </div>
      <div className="mb-3" style={{ cursor: "pointer" }}>
        <Link to="/login"> Already Registered Please Signin</Link>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.userInfo,
  };
};
export default connect(mapStateToProps)(Registration);
