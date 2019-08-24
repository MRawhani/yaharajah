import React, { Component } from "react";
import {Link } from 'react-router-dom';

export default class RentalList extends Component {
  render() {
    const rental = this.props.rental;
    return (
      <div className={`${this.props.col}`}>
        <Link to={`/rentaldetails/${rental.id}`}>
        <div className="card bwm-card">
          <img
            className="card-img-top"
            src="http://via.placeholder.com/350x250"
            alt=""
          />
          <div className="card-block">
            <h6 className="card-subtitle">
              {rental.city} &#183; {rental.street}
            </h6>
            <h4 className="card-title">{rental.title}</h4>
            <h6 className="card-subtitle">
              {rental.category} &#183; {rental.type}
            </h6>
            <p className="card-text">
              {rental.price}
              {rental.coin}&#183;{" "}
              {rental.bargain ? "قابل للتفاوض" : "غير قابل للتفاض"}{" "}
            </p>
           
          </div>
        </div>
    
        </Link>
         </div>
    );
  }
}
