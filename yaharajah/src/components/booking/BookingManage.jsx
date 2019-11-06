import React, { Component } from "react";
import { connect } from "react-redux";
import { getBookings } from "../../actions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment";
class componentName extends Component {
  componentDidMount() {
    this.props.getBookings();
  }
  renderError = errors => {
    if (errors.length > 0) {
      toast.error("حدث خطأ! جرب مرة أخرى");
      return true;
    }
    return false;
  };
  render() {
    const {  data, isFetching } = this.props.bookings;
    debugger;
    return (
      <div>
        {/* <ToastContainer />
        {!this.renderError(errors) &&
          (data.length > 0 ? (
            data.map((booking, i) => {
              return <h1 key={i}>{booking.rental.title}</h1>;
            })
          ) : (
            <h1>....</h1>
          ))} */}
        <section id="userBookings">
          <h1 className="page-title">حجوزاتي</h1>
          <div className="row">
            {data.map((booking, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <div className="card text-center">
                    <div className="card-header">{booking.rental.category}</div>
                    <div className="card-block">
                      <h4 className="card-title">
                        {" "}
                        {booking.rental.title} -{booking.rental.city}
                      </h4>
                      <p className="card-text booking-desc">
                        {booking.rental.description}
                      </p>
                      <p className="card-text booking-days">
                        {moment(booking.startAt).format("Y/MM/DD")} -{" "}
                        {moment(booking.endAt).format("Y/MM/DD")} |{" "}
                        {booking.days} {"يوم"}
                      </p>
                      <p className="card-text booking-price">
                        <span>السعر: </span>{" "}
                        <span className="booking-price-value">
                          {booking.totalPrice} {booking.rental.coin}
                        </span>
                      </p>
                      <Link
                        className="btn btn-app"
                        to={`/rentaldetails/${booking.rental._id}`}
                      >
                        Go to Rental
                      </Link>
                    </div>
                    <div className="card-footer text-muted">
                      createdAt: {booking.createdAt}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!isFetching && data.length===0 && (
            <div class="alert alert-warning">
                 لايوجد حجوزات لك ، احجز من الحجوزات   
              <Link
                style={{ "margin-left": "10px" }}
                class="btn btn-app"
                to="/rentals"
              >
                كل العروض
              </Link>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookings: state.userBookings
});

export default connect(
  mapStateToProps,
  { getBookings }
)(componentName);
