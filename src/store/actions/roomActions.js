import {
  LOADING,
  LOADED,
  CREATE_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  FETCH_ALL_ROOMS,
  FETCH_ROOM_BY_ID,
  SESSION_EXPIRED,
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Add new room
export const createRoom = (room) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/rooms/createRoom", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: room,
  })
    .then((response) => {
      dispatch({
        type: CREATE_ROOM,
        payload: response.data,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Room Successfully Created!");
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

// Fetch single room through roomId
export const fetchRoom = (roomId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/rooms/fetchRoom/" + roomId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ROOM_BY_ID,
        payload: response.data.room,
      });
      dispatch({
        type: LOADED,
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
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Update room.
export const updateRoom = (room) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/rooms/updateRoom", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: room,
  })
    .then((response) => {
      dispatch({
        type: UPDATE_ROOM,
        payload: response.data.room,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Room Successfully Updated!");
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

// Fetch all room as a list.
export const fetchRoomsList = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/rooms/fetchRoomsList", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_ROOMS,
        payload: response.data.rooms,
      });
      dispatch({
        type: LOADED,
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
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};


// Delete One answer.
export const removeRoom = (roomId) => (dispatch) => {
  axios(config.DOMAIN + "/rooms/removeRoom/" + roomId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE_ROOM,
        payload: response.data
      });
      toast.success(response.data.message);
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