import React, { Component } from 'react'
import { connect } from 'react-redux'

import {fetchRentalById} from '../../../actions';
 class RentalDetail extends Component {

  
  componentDidMount(){
    
    console.log(this.props.match.params.id);
    
    const rentaId= parseInt(this.props.match.params.id,10);
   this.props.fetchRentalById(rentaId)
  }

  render() {
    return (
      <div>
        <h1>I am a detail componenet {this.props.rental.city}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

console.log('fdv vg' + state);

 return {
  rental: state.rental.data
 } 
}



export default connect(mapStateToProps,{fetchRentalById})(RentalDetail)
