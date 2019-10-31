import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import BookingModal from "./BookoingModal";
import helper from "../../helpers/index";
import moment from "moment";
import {ToastContainer,toast} from 'react-toastify'
import * as actions from './../../actions'
export class Booking extends React.Component {
  constructor() {
    super();
    this.dateRef = React.createRef();
    this.bookedOutValues = [];
    this.state = {
     proposedBooking:{
      startAt: "",
      endAt: "",
      guests: '',
      rental:{}
     },
      open: false,
      errors:[]
    };
  }
  componentDidMount() {
    this.getBookedOutDates();
  }
  getBookedOutDates = () => {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = helper.getRangeOfDates(
          booking.startAt,
          booking.endAt,
          "Y/MM/DD"
        );

        this.bookedOutValues.push(...dateRange);
        console.log(this.bookedOutValues);
      });
    }
  };
  checkInvalidDates = date => {
    return (
      this.bookedOutValues.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  };
  handleOnApply = (event, picker) => {
    const startAt = picker.startDate.format("Y/MM/DD");
    const endAt = picker.endDate.format("Y/MM/DD");
    this.dateRef.current.value = " من " + startAt + " الى " + endAt;
    this.setState({
     proposedBooking:{
       ...this.state.proposedBooking,
      startAt,
      endAt
     }
    });
    console.log(this.state);
  };
  selectGuests = event => {
    this.setState({
     proposedBooking:{
      ...this.state.proposedBooking,
      guests: parseInt(event.target.value)
     }
    });
  };
  canceConformation = () => {
    this.setState({
      open: false,
      errors:[]
    });
  };
  confirmProposedData = () => {
    const {startAt,endAt} = this.state.proposedBooking;
    const days  = helper.getRangeOfDates(startAt,endAt,'YY/MM/DD').length -0;
    const {rental } = this.props;
    this.setState({
      open: true,
     proposedBooking:{
      ...this.state.proposedBooking,
      days,
      rental,
      totalPrice: days * rental.price
     }
    });
  };
    addNewBookingOutDates=(booking)=>{
      const dateRange = helper.getRangeOfDates(
        booking.startAt,
        booking.endAt,
        "Y/MM/DD"
      );

      this.bookedOutValues.push(...dateRange);
    }
    resetInput=()=>{
      this.dateRef.current.value= '';
      this.setState({proposedBooking:{ startAt: "",
      endAt: "",
      guests: 0,
      rental:{}}
    })
    }
    reserveBooking= async ()=>{
    try{
      
      const booking= await actions.createBooking(this.state.proposedBooking);
      this.addNewBookingOutDates(booking);
      this.canceConformation();
      this.resetInput();
      toast.success('تم انشاء الحجز')
    }catch(errors){
      this.setState({
        errors
      })
      
    }
  }
  render() {
    const { rental } = this.props;
    const {startAt,endAt, guests}= this.state.proposedBooking;
    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          $ {rental.price} <span className="booking-per-night">لليلة</span>
        </h3>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="dates">التارريخ</label>
          <DateRangePicker
            onApply={this.handleOnApply}
            opens="right"
            containerStyles={{ display: "block" }}
            isInvalidDate={this.checkInvalidDates}
          >
            <input
              ref={this.dateRef}
              id="dates"
              type="text"
              className="form-control"
            ></input>
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">ضيوف</label>
          <input
            onChange={this.selectGuests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guest"
            placeholder=""
            value={this.state.proposedBooking.guests}
          ></input>
        </div>
        <button
        disabled={!startAt || !endAt || !guests}
          onClick={this.confirmProposedData}
          className="btn btn-primary btn-confirm btn-block"
        >
          قم بالحجز الآن
        </button>

        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          closeModal={this.canceConformation}
          open={this.state.open}
          booking={this.state.proposedBooking}
          confirmModal={this.reserveBooking}
          errors={this.state.errors}
        />
      </div>
    );
  }
}
