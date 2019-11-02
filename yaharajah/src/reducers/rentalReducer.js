import {
  FETCH_RENTALS,
  FETCH_RENTAL_By_ID,
  FETCH_RENTAL_By_ID_INIT,

  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL
} from "./../actions/types";
let INITIAL_STATE = {
  rentals: {
    data: [],
    errors:[]
  },
  rental: {
    data: []
  }
};
export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
    return {...state, data:[], errors:[]}
    case FETCH_RENTALS:
    return { ...state, data: action.payload , errors:[]};
    case FETCH_RENTALS_FAIL:
        return { ...state, errors: action.payload , data:[]};
          
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
