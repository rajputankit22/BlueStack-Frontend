import {
  ADD_ADMIN,
  FETCH_EMPLOYEE_BY_ID,
  FETCH_ALL_EMPLOYEES,
  UPDATE_EMPLOYEE_PROFILE,
  DELETE_EMPLOYEE
} from "../actions/types";

const initialState = {
  allEmployees: [],
  employee: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ADMIN:
      console.log("action.payload.employee", action.payload.employee)
      return {
        ...state,
        allEmployees: [...state.allEmployees, action.payload.employee]
      };
    case UPDATE_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: action.payload,
        allEmployees: state.allEmployees.map(employee => { if (employee._id !== action.payload._id) return employee; else return action.payload })
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        allEmployees: state.allEmployees.filter(employee => employee._id !== action.payload.employeeId)
      };
    case FETCH_ALL_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
        allEmployees: action.payload
      };
    case FETCH_EMPLOYEE_BY_ID:
      console.log("Fetch Employee By Id", action.payload)
      return {
        ...state,
        isLoading: false,
        employee: action.payload
      };

    default:
      return state;
  }
}
