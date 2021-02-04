import {
  CREATE_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  FETCH_ALL_ROOMS,
  FETCH_ROOM_BY_ID,
} from "../actions/types";

const initialState = {
  allRooms: [],
  room: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        allRooms: [...state.allRooms, action.payload.room]
      };
    case UPDATE_ROOM:
      return {
        ...state,
        room: action.payload,
        allRooms: state.allRooms.map(room => { if (room._id != action.payload._id) return room; else return action.payload })
      };
    case DELETE_ROOM:
      return {
        ...state,
        allRooms: state.allRooms.filter(room => room._id != action.payload.roomId)
      };
    case FETCH_ALL_ROOMS:
      return {
        ...state,
        isLoading: false,
        allRooms: action.payload
      };
    case FETCH_ROOM_BY_ID:
      return {
        ...state,
        isLoading: false,
        room: action.payload
      };

    default:
      return state;
  }
}
