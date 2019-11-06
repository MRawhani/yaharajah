import React, { Component } from 'react'
import { Link } from "react-router-dom";
import RentalBookings from "./RentalBookings";

import moment from "moment";
export default class RentalManageCard extends Component {
    constructor(){
        super();
        this.state = {
          
            wantDelete: false
          };

        }
    showDeleteMenu = () => {
        debugger
        this.setState({
          wantDelete: true
        });
      };
      hideDeleteMenu = () => {
        this.setState({
          wantDelete: false
        });
      };
    

    render() {
        const {userRental,i,confirmDelete}= this.props;
        return (
            <div key={i} className="col-md-4">
              <div className="card text-center">
                <div className="card-block">
                  <h4 className="card-title">
                    {userRental.title} . {userRental.city}
                  </h4>
                  <Link
                    className="btn bg-primary btn-app"
                    to={`/rentaldetails/${userRental._id}`}
                  >
                    تفاصيل العرض
                  </Link>
                  {userRental.bookings &&
                    userRental.bookings.length > 0 && (
                      <RentalBookings bookings={userRental.bookings} />
                    )}
                </div>
                <div className="card-footer text-muted">
                  Created at{" "}
                  {moment(userRental.createdAt).format("Y/MM/DD")}
                  {!this.state.wantDelete && (
                    <button
                      onClick={this.showDeleteMenu}
                      className="btn btn-danger"
                    >
                      حذف
                    </button>
                  )}
                  {this.state.wantDelete && (
                    <div className="deleteMenu">
                      تأكيد الحذف؟
                      <button
                        onClick={() => {
                         confirmDelete(userRental._id, i);
                        }}
                        className="btn btn-success"
                      >
                        نعم
                      </button>
                      <button
                        onClick={this.hideDeleteMenu}
                        className="btn btn-danger"
                      >
                        لا
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );}
}
