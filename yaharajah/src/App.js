import React from "react";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
import {connect } from 'react-redux'
import Header from "./components/shared/header";
import RentalListing from "./components/rentals/rental-listing/RentalListing";

import RentalDetail from "./components/rentals/rental-details/RentalDetail";
import "./App.scss";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ProtectedRoute from './components/shared/auth/ProtectedRoute'
import LoggedInRoute from './components/shared/auth/LoggedInRoute';
import NotFound from './components/shared/NotFound';

import {checkAuth,logout} from './actions'
import RentalSearchListing from "./components/rentals/rental-listing/RentalSearchListing";

class  App extends React.Component {
  componentDidMount(){
    this.props.checkAuth()
  }
  logoutUser=()=>{
    this.props.logout()
  }
  render(){
    return (
      <React.Fragment>
        <Header logout={this.logoutUser}/>
  
        <div className="container">
          <Switch>
          <Route
              path="/rentals/:city/homes"
              component={props => <RentalSearchListing {...props} />}
            />
          <Route
              path="/login"
              component={props => <Login {...props} />}
            />
            <LoggedInRoute
              path="/register"
              component={props => <Register {...props} />}
            />
            <ProtectedRoute
              path="/rentaldetails/:id"
              exact
              component={RentalDetail}
            />
            <Route
              exact
              path="/rentals"
              component={props => <RentalListing {...props} />}
            />
             <Route
              path={`/not-found`}
              component={NotFound}
            />
            <Redirect from="/" exact to="/rentals" />
            <Redirect  to="/not-found" />
          </Switch>
        </div>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  null,
  { checkAuth,logout }
)(App));