import {
  FETCH_BOOKINGS_FAIL,
  FETCH_BOOKINGS_INIT,
  FETCH_BOOKINGS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  bookings: {
    data: [],
    errors: [],
    isFetching:false
  }
};
export const bookingReducer = function(state = INITIAL_STATE.bookings, action) {
  switch (action.type) {
    case FETCH_BOOKINGS_INIT:
      return { ...state, data: [], errors: [],isFetching:true };
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, data: action.payload, errors: [],isFetching:false };
    case FETCH_BOOKINGS_FAIL:
      return { ...state, data: [], errors: action.payload,isFetching:false };

    default:
      return state;
  }
};
