import axios from "axios";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "./login.type";

export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    let response = await axios.post(` https://paypal-u76c.onrender.com/user/login`, data);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    alert("sucess")
  } catch (error) {
    dispatch({ type: LOGIN_ERROR });
  }
};






 