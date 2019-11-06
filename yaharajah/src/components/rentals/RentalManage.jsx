import React, { Component } from "react";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import RentalManageCard from "./RentalManageCard";

export default class RentalManage extends Component {
  constructor() {
    super();
    this.state = {
      userRentals: [],
      errors: [],
      isFetching: true,
    
    };
  }
  componentDidMount() {
    actions
      .getRentals()
      .then(userRentals => this.setState({ userRentals, isFetching: false }))
      .catch(errors => this.setState({ errors, isFetching: false }));
  }
  confirmDelete = (rentalId, rentalIndex) => {
    actions
      .deleteRental(rentalId)
      .then(() => {
        debugger
        this.deleteFromRentalUserState(rentalIndex);
      },(err)=>{
        debugger 
          toast.error(err[0].detail)
      })
    
  }
  deleteFromRentalUserState = index => {
    this.setState((prevState) => ({
      userRentals: prevState.userRentals.filter((_, i) => i !== index)
    }));
  
  };

  render() {
    const { userRentals, isFetching } = this.state;
    return (
      <div>
        <section id="userRentals">
          <ToastContainer />
          <h1 className="page-title">عروضي</h1>
          <div className="row">
            {userRentals.map((userRental, i) => {
              return <RentalManageCard userRental={userRental} i={i} confirmDelete={this.confirmDelete} />;
            })}
          </div>
          {!isFetching && userRentals.length === 0 && (
            <div className="alert alert-warning">
              You dont have any rentals currenty created. If you want advertised
              your property please follow this link.
              <Link
                style={{ marginLeft: "10px" }}
                className="btn  bg-primary btn-app"
                to="/rentals/new"
              >
                أضف عرض
              </Link>
            </div>
          )}
        </section>
      </div>
    );
  }
}
