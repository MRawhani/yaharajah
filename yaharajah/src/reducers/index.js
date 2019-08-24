import thunk from "redux-thunk";
import { rentalReducer, rentalDetailReducer } from "./rentalReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

export const init = () => {
  const reducers = combineReducers({
    rentals: rentalReducer,
    rental: rentalDetailReducer
  });

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
  return store;
};
