import React, { Component } from "react";

import Rental from "./Rental";
class RentalList extends Component {



  renderRentalList = () => {
    return this.props.rentals.map((rental,i) => {
      return <Rental key={i} col="col-md-3 col-xs-6" rental={rental}/>;
    });
  };
  render() {
    return (
 
          <div className="row">{this.renderRentalList()}</div>
  
   
    );
  }
  
}

export default RentalList;