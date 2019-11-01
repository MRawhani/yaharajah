import React, { Component } from 'react'

import { connect } from "react-redux";
import RentalList from "./RentalList";
import { fetchRentals } from "../../../actions";
class RentalSearchListing extends Component {

    constructor(){
        super();
        this.state= {
            searchKeyword: '' 
        }
    }
    componentDidMount(){
        this.searchRentals();
   }
   componentDidUpdate(prevProps){
    const cuurentParam = this.props.match.params.city;
    const prevParam= prevProps.match.params.city;
    debugger
    if(cuurentParam !== prevParam){
        this.searchRentals();
    }
   }
   searchRentals=()=>{
    this.setState({
        searchKeyword: this.props.match.params.city
    })
    this.props.fetchRentals(this.props.match.params.city)
   
   }
    renderTitle=()=>{
        
        const {data,errors} = this.props.rentals
        const {searchKeyword} = this.state;
        let title = '';
        if(errors.length > 0){
            debugger
            title= errors[0].detail;
        }
        if(data.length > 0) {
            title = `البيوت والشقق المعروضة لمدينة ${searchKeyword}`
        }
    return  <h1 className="page-title"> {title}</h1>

    }
  render() {
    return (
        <div className="container">
          <section id="rentalListing">
              {this.renderTitle()}
            <RentalList rentals={this.props.rentals.data} />
          </section>
        </div>  
      );
    
  }
}

const mapStateToProps = state => {
    return {
      rentals: state.rentals
    };
  };
  export default connect(
    mapStateToProps,
    { fetchRentals }
  )(RentalSearchListing);
  