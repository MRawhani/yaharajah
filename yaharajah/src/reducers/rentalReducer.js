import {
  FETCH_RENTALS,
  FETCH_RENTAL_By_ID,
  FETCH_RENTAL_By_ID_INIT
} from "./../actions/types";
let INITIAL_STATE = {
  rentals: {
    data: []
  },
  rental: {
    data: []
  }
};
export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
export const rentalDetailReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_By_ID_INIT:
      return { ...state, data: {} };

    case FETCH_RENTAL_By_ID:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
