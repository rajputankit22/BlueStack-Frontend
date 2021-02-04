import {
  LOADING,
  LOADED,
  ADMIN_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  TOKEN_REFRESHED,
  TOKEN_REFRESHED_FAIL,
  SESSION_EXPIRED,
  AUTH_ERROR,
  OPEN_POPUP_OWN_PASSWORD,
  CLOSE_POPUP_OWN_PASSWORD
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  tokenExpired: false,
  openPasswordPopup: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOADED:
      return {
        ...state,
        isLoading: false
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.employee
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("authToken", action.payload.data.token);
      localStorage.setItem("name", action.payload.data.employee.firstName);
      localStorage.setItem(
        "User_data",
        JSON.stringify(action.payload.data.employee)
      );
      return {
        ...state,
        token: action.payload.data.token,
        user: action.payload.data.employee,
        isAuthenticated: true,
        isLoading: false
      };
    case TOKEN_REFRESHED:
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        tokenExpired: false
      };
    case TOKEN_REFRESHED_FAIL:
      localStorage.clear();
      return {
        ...state,
        tokenExpired: false
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        tokenExpired: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case OPEN_POPUP_OWN_PASSWORD:
      return {
        ...state,
        openPasswordPopup: true
      };
    case CLOSE_POPUP_OWN_PASSWORD:
      return {
        ...state,
        openPasswordPopup: false
      };
    default:
      return state;
  }
}
