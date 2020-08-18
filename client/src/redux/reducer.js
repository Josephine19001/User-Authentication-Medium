import jwt from "jsonwebtoken";

import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "./action-types";

export const isValidToken = (token) => {
  let decoded = jwt.decode(token);
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};
const initState = {
  currentUser: localStorage.getItem("USER-TOKEN")
    ? isValidToken(localStorage.getItem("USER-TOKEN"))
    : null,
  token: localStorage.getItem("USER-TOKEN")
    ? localStorage.getItem("USER-TOKEN")
    : null,
  error: "",
  loading: false,
  isAuthenticated: false,
};

const authenticationReducer = function (state = initState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentUser: null,
        isAuthenticated: false,
      };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
      };
    case SIGN_OUT_SUCCESS:
      localStorage.removeItem("USER-TOKEN");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        currentUser: null,
        token: "",
      };
    default:
      return { ...state };
  }
};

export default authenticationReducer;
