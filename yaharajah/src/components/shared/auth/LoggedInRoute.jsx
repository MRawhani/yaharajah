import React from "react";
import { Route, Redirect } from "react-router-dom";
import authservice from "../../../services/auth-service";

export default props => {
  const { component: Component, ...rest } = props;
 
  return (
    <Route
      {...rest}
      render={props =>
        authservice.isAuthenticated() ? (
          <Redirect to={{ pathname: "/rentals"}} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};
