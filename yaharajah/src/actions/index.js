import {
  FETCH_RENTALS,
  FETCH_RENTAL_By_ID,
  FETCH_RENTAL_By_ID_INIT
} from "./types";
import axios from "axios";

export const fetchRentals = () => dispatch => {
  axios.get(`http://localhost:3001/api/v1/rentals/`).then(rentals => {
    dispatch({ type: FETCH_RENTALS, payload: rentals.data });
  });
};

export const fetchRentalById = id => dispatch => {
  dispatch({ type: FETCH_RENTAL_By_ID_INIT });

  axios.get(`http://localhost:3001/api/v1/rentals/${id}`).then(rental => {
    dispatch({ type: FETCH_RENTAL_By_ID, payload: rental.data });
  });
};
