import {
  LOADING,
  LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  UPDATE_OWN_PROFILE,
  UPDATE_OWN_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  TOKEN_REFRESHED,
  TOKEN_REFRESHED_FAIL,
  SESSION_EXPIRED,
  OPEN_POPUP_OWN_PASSWORD,
  CLOSE_POPUP_OWN_PASSWORD,
} from "./types";
import axios from "axios";
import { authenticate, refreshtoken } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";
import { fetchEmployeeById } from "../../store/actions/adminActions";

export const loadEmployee = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  if (authenticate()) {
    axios
      .get(config.DOMAIN + "/employees/loadEmployee", {
        headers: {
          "content-type": "application/json",
          Authorization: authenticate(),
        },
      })
      .then((response) => {
        dispatch({
          type: ADMIN_LOADED,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADED,
        });
        if (err.response.status === 403) {
          dispatch({
            type: SESSION_EXPIRED,
          });
        } else {
          if (err.response.data.error) {
            toast.error(err.response.data.error);
          } else if (err.response.data.errors.length > 0) {
            err.response.data.errors.map((msg) => {
              return toast.error(msg.msg);
            });
          } else {
            toast.error("Server is not connected!");
          }
        }
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({
      type: LOADED,
    });
  }
};

export const refreshToken = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios
    .get(config.DOMAIN + "/employees/refreshToken", {
      headers: {
        "content-type": "application/json",
        Authorization: refreshtoken(),
      },
    })
    .then((response) => {
      dispatch({
        type: TOKEN_REFRESHED,
        payload: response.data,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
      dispatch({
        type: TOKEN_REFRESHED_FAIL,
      });
    });
};

export const signIn = (admin) => (dispatch) => {
  axios(config.DOMAIN + "/employees/signIn", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: admin,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/employees/signOut", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      toast.success(response.data.message);
    })
    .catch((err) => {
      console.log("SignOut Error----", err)
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors.length > 0) {
        err.response.data.errors.map((msg) => {
          toast.error(msg.msg);
        });
      } else {
        toast.error("Server is not connected!");
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Function to update employee profile
export const updateEmployeeProfile = (adminData) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/employees/updateProfile", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: adminData,
  })
    .then((response) => {
      dispatch({
        type: UPDATE_OWN_PROFILE,
      });
      const admin = JSON.parse(localStorage.getItem("User_data"));
      dispatch(fetchEmployeeById(admin._id))
      localStorage.setItem("User_data", JSON.stringify(response.data.employee));
      toast.success("Profile Successfully Updated!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Function for update admins password
export const updateOwnPassword = (data) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/employees/updatePassword", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: data,
  })
    .then((response) => {
      dispatch({
        type: UPDATE_OWN_PASSWORD,
      });
      dispatch({
        type: CLOSE_POPUP_OWN_PASSWORD,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Password Successfully Updated!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

export const openPopup = () => (dispatch) => {
  dispatch({
    type: OPEN_POPUP_OWN_PASSWORD,
  });
};

export const closePopup = () => (dispatch) => {
  dispatch({
    type: CLOSE_POPUP_OWN_PASSWORD,
  });
};
