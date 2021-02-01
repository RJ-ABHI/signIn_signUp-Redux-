import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
} from "./actionType";

const registerUserAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      //MAKE ACTUALL CALL
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      const { data } = await axios.post(
        "http://192.168.43.62:2400/user/register",
        userData
      );
      console.log(data);
      console.log(dispatch);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

//Login action

const userLoginAction = (userData) => {
  console.log(userData);
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://192.168.43.62:2400/user/login",
        userData,
        config
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.messege,
      });
    }
  };
};

const getUser = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });
    const { data } = await axios.get("http://192.168.43.62:2400/user", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: "admin " + token,
      },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response && error.response.data.messege,
    });
  }
};

//Logout action
const logoutUserAction = () => async (dispatch) => {
  try {
    //Remove user from storage
    localStorage.removeItem("token");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (error) {}
};

export { registerUserAction, userLoginAction, logoutUserAction, getUser };
