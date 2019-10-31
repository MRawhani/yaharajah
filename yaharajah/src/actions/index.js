import {
  FETCH_RENTALS,
  FETCH_RENTAL_By_ID,
  FETCH_RENTAL_By_ID_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,LOGOUT
} from "./types";
import axios from "axios";
import  authService from '../services/auth-service';
import  axiosService from '../services/axios-service';
const apiUrl = "http://localhost:3001/api/v1";
const axiosInstance = axiosService.getInstance();
/// Rentals
export const fetchRentals = () => dispatch => {
  axiosInstance.get(`${apiUrl}/rentals/`).then(rentals => {
    dispatch({ type: FETCH_RENTALS, payload: rentals.data });
  });
};
//the dispatch from the middle ware
export const fetchRentalById = id => dispatch => {
  dispatch({ type: FETCH_RENTAL_By_ID_INIT });

  return axios.get(`${apiUrl}/rentals/${id}`).then(rental => {
    dispatch({ type: FETCH_RENTAL_By_ID, payload: rental.data });
      return rental.data;
  }).catch(err=>{
    debugger
    return Promise.reject(err);
  });
};

//USers

export const register = userData => {
  
  return axios.post(`${apiUrl}/users/register`,userData).then(
    (res) => {
      
   return res.data
  },
  (err)=>{
    
    return Promise.reject(err.response.data.errors);
  }
  );
};

const loginSuccess = () =>{
  
  return {
    type : LOGIN_SUCCESS
  }
}
const loginfailure = errors =>{
  
  return {
    type : LOGIN_FAILURE,
    payload: errors
  }
}
export const checkAuth= () => dispatch => {
  
  if(authService.isAuthenticated()){
    
    dispatch(loginSuccess());
  }
}
// another way of setting thunk's dispatch 
export const loginAction = (userData)=>{
  return dispatch =>{
    axios.post(`${apiUrl}/users/auth`,userData).then(res => res.data)
    .then(token=>{
      authService.saveToken(token);
      dispatch(loginSuccess());
    })
    .catch(err => {
      
      dispatch(loginfailure(err.response.data.errors))
    })
  }
}


export const logout = ()=>{
  authService.removeToken()
  return {
    type: LOGOUT
  }
}



export const createBooking = (booking) =>  {
  debugger
  return axiosInstance.post(`${apiUrl}/bookings/`,booking).then(res => {
    debugger
    return res.data;
  }).catch((response) =>
    Promise.reject(response.response.data.errors));
};

