import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
  } from "./../actions/types";
  let INITIAL_STATE = {
    isAuth:false,
    errors:[],
    username:''
  };
  export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return { ...state, isAuth:true,errors:[], username:action.payload };
        case LOGIN_FAILURE:
        return Object.assign({},state, {errors:action.payload})
        case LOGOUT:
          return Object.assign({},state, {isAuth:false, username:''})
      
      default:
        return state;
    }
  };