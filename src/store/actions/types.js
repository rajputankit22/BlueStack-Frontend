// Aunthentication Types
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const ADMIN_LOADED = "ADMIN_LOADED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";    // Employee login type
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SESSION_EXPIRED = "SESSION_EXPIRED";
export const TOKEN_REFRESHED = "TOKEN_REFRESHED";
export const TOKEN_REFRESHED_FAIL = "TOKEN_REFRESHED_FAIL";

// For update admin
export const ADD_ADMIN = "ADD_ADMIN";
export const UPDATE_OWN_PASSWORD = "UPDATE_OWN_PASSWORD";
export const UPDATE_OWN_PROFILE = "UPDATE_OWN_PROFILE";
export const OPEN_POPUP_OWN_PASSWORD = "OPEN_POPUP_OWN_PASSWORD";
export const CLOSE_POPUP_OWN_PASSWORD = "CLOSE_POPUP_OWN_PASSWORD";
export const REFRESH_CANCEL = "REFRESH_CANCEL";


// For employees
export const FETCH_ALL_EMPLOYEES = "FETCH_ALL_EMPLOYEES";
export const FETCH_EMPLOYEE_BY_ID = "FETCH_EMPLOYEE_BY_ID";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const UPDATE_EMPLOYEE_PROFILE = "UPDATE_EMPLOYEE_PROFILE";

// For rooms
export const CREATE_ROOM = "CREATE_ROOM";
export const FETCH_ALL_ROOMS = "FETCH_ALL_ROOMS";
export const FETCH_ROOM_BY_ID = "FETCH_ROOM_BY_ID";
export const DELETE_ROOM = "DELETE_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";