import React, { Component } from "react";
import Modal from "react-responsive-modal";
import moment from "moment";
export default class RentalBookings extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };
 
  render() {
    const { bookings } = this.props;
    return (
      <React.Fragment>
        <button type="button" onClick={this.openModal} className="btn bg-primary btn-app">
          Bookings
        </button>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          little
          classNames={{ modal: "rental-booking-modal" }}
        >
          <h4 className="modal-title title">الحجوزات على العرض</h4>
          <div className="modal-body bookings-inner-container">
            {bookings.map((booking, i) => {
              return (
                <React.Fragment>
                  <p>
                    <span>Date:</span>{" "}
                    {moment(booking.startAt).format("Y/MM/DD")} -{" "}
                    {moment(booking.endAt).format("Y/MM/DD")}
                  </p>
                  <p>
                    <span>ضيوف :</span> {booking.guests}
                  </p>
                  <p>
                    <span>Total Price:</span> {booking.totalPrice}
                  </p>
                  <hr></hr>
                </React.Fragment>
              );
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={this.closeModal}
              className="btn  bg-primary btn-app"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
