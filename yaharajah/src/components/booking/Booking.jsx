import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import helper from "../../helpers/index";
import moment from "moment";
export class Booking extends React.Component {
  constructor() {
    super();
this.dateRef= React.createRef();
    this.bookedOutValues = [];
    this.state={
        startAt:'',
        endAt:'',
        guests:0

    }
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
  checkInvalidDates = (date) => {
      
    return this.bookedOutValues.includes(date.format('Y/MM/DD') ) || date.diff(moment(),'days') <0


  };
  handleOnApply=(event, picker)=>{
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');
    this.dateRef.current.value = ' من ' + startAt + ' الى ' +endAt  ;
    this.setState({
        startAt,
        endAt
    })
    console.log(this.state);
    
  }
  selectGuests=(event)=>{
      this.setState({
          guests: parseInt(event.target.value)
      })
  }
  render() {
    const { rental } = this.props;
    return (
      <div className="booking">
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
            <input ref={this.dateRef} id="dates" type="text" className="form-control"></input>
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
            value={this.state.guests}
          ></input>
        </div>
        <button className="btn btn-primary btn-confirm btn-block"> </button>
          قم بالحجز الآن
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
      </div>
    );
  }
}
