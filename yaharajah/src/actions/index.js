import {
  FETCH_RENTALS,
  FETCH_RENTAL_By_ID,
  FETCH_RENTAL_By_ID_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_RENTALS_FAIL,
  FETCH_RENTALS_INIT,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAIL,
  FETCH_BOOKINGS_INIT
} from "./types";
import axios from "axios";
import authService from "../services/auth-service";
import axiosService from "../services/axios-service";
const apiUrl = "http://localhost:3001/api/v1";
const axiosInstance = axiosService.getInstance();
/// Rentals
export const fetchRentals = keyword => dispatch => {
  const url = keyword ? `rentals?city=${keyword}` : "rentals";
  console.log("Log: " + url);

  dispatch({ type: FETCH_RENTALS_INIT });

  axiosInstance
    .get(`${apiUrl}/${url}`)
    .then(rentals => {
      dispatch({ type: FETCH_RENTALS, payload: rentals.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_RENTALS_FAIL,
        payload: err.response
          ? err.response.data.errors
          : [{ detail: err.message }]
      });
    });
};

//the dispatch from the middle ware
export const fetchRentalById = id => dispatch => {
  dispatch({ type: FETCH_RENTAL_By_ID_INIT });

  return axios
    .get(`${apiUrl}/rentals/${id}`)
    .then(rental => {
      dispatch({ type: FETCH_RENTAL_By_ID, payload: rental.data });
      return rental.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

//USers

export const register = userData => {
  return axios.post(`${apiUrl}/users/register`, userData).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    payload: username
  };
};
const loginfailure = errors => {
  return {
    type: LOGIN_FAILURE,
    payload: errors
  };
};
export const checkAuth = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};
// another way of setting thunk's dispatch
export const loginAction = userData => {
  return dispatch => {
    axios
      .post(`${apiUrl}/users/auth`, userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(err => {
        dispatch(loginfailure(err.response.data.errors));
      });
  };
};

export const logout = () => {
  authService.removeToken();
  return {
    type: LOGOUT
  };
};

export const createBooking = booking => {
  debugger
  return axiosInstance
    .post(`${apiUrl}/bookings/`, booking)
    .then(res => {
      return res.data;
    })
    .catch(response => Promise.reject(response.response.data.errors));
};

export const getBookings = () => dispatch => {
  dispatch({ type: FETCH_BOOKINGS_INIT });
  axiosInstance
    .get(`${apiUrl}/bookings/manage`)
    .then(res => {
      dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BOOKINGS_FAIL,
        payload: err.response
          ? err.response.data.errors
          : [{ detail: err.message }]
      });
    });
};

export const getRentals = ()=>{
  return axiosInstance.get(`${apiUrl}/rentals/manage`).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
}
export const creatRental = rentalData => {
  return axiosInstance.post(`${apiUrl}/rentals`, rentalData).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

export const deleteRental = rentalId => {
  return axiosInstance.delete(`${apiUrl}/rentals/${rentalId}`).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};
