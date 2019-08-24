import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./shared/header";
import RentalListing from "./components/rentals/rental-listing/RentalListing";

import RerntalDetail from "./components/rentals/rental-details/RentalDetail";
import "./App.scss";

function App() {
  return (
    <React.Fragment>
      <Header />

      <div className="container">
      <Switch>
      <Route path="/rentaldetails/:id" component={props => <RerntalDetail {...props} />}/>
      <Route exact path="/rentals" component={props => <RentalListing {...props} />} />
      <Redirect from="/" exact to="/rentals" />
      </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
