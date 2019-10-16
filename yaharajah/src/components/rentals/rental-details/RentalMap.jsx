import React, { Component } from "react";
import {MapWithGeoCode} from './../../map/GoogleMap'
export default class RentalMap extends Component {
  render() {
      const location = this.props.location;
     
    return (
      <MapWithGeoCode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBp-sz2l9XZTAnBS5HRaZngh98h5ua1HV0&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}
