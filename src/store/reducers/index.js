import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import employeeReducer from "./employeeReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
  admin: adminReducer,
  employee: employeeReducer,
  room: roomReducer
});
