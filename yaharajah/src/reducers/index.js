import thunk from "redux-thunk";
import { rentalReducer, rentalDetailReducer } from "./rentalReducer";
import { authReducer } from "./auth-reducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {reducer as formResucer} from 'redux-form'

export const init = () => {
  const reducers = combineReducers({
    rentals: rentalReducer,
    rental: rentalDetailReducer,
    form: formResucer,
    auth:authReducer
  });

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
  return store;
};
