import React, { Component } from "react";
import { connect } from "react-redux";
import RentalMap from './RentalMap'
import { fetchRentalById } from "../../../actions";
import RentalAssets from "./RentalAssets";
import helper from "./../../../helpers";
class RentalDetail extends Component {
  componentDidMount() {
    // const rentaId= parseInt(this.props.match.params.id,10);
    this.props.fetchRentalById(this.props.match.params.id);
  }

  render() {
    const { rental } = this.props;
    const colorClassname = helper.getCategoryEnglish(`${rental.category}`);
    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt=""></img>
              </div>
              <div className="col-md-6">
               <RentalMap location={`${rental.city},${rental.street}`}/>
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <div className="rental">
                  <h2 className={`rental-type ${colorClassname}`}>
                    {rental.city} &#183; {rental.street}
                  </h2>
                  <h1 className="rental-title">{rental.title}</h1>
                  <h2 className={`rental-city  ${colorClassname}`}>
                    {rental.category} &#183; {rental.type}
                  </h2>

                  <p className="rental-description">{rental.description}</p>
                  <hr></hr>
                  <RentalAssets rentals={rental} />
                </div>
                <div className="col-md-4"> حجز</div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <h3>loading...</h3>;
    }
  }
}

const mapStateToProps = state => {
  console.log("fdv vg" + state);

  return {
    rental: state.rental.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentalById }
)(RentalDetail);
