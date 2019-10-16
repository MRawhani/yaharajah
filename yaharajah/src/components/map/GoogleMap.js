import React from "react";
import { Cacher } from "./../../services/casher";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";
function mapComponent(props) {
  const { coordinates, isError } = props;

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={coordinates}
      center={coordinates}
      options={{disableDefaultUI: isError ? true : false}}
    >
      {!isError && <Circle center={coordinates} radius={500} />}
      {isError && (
        <InfoWindow position={coordinates}>
          <div>أوبس! في مشكلة في العنوان، راجع صحة العنوان المدخل.</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
function withGeoCode(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false
      };
    }
    componentDidMount() {
      this.geoCodedLocation();
    }

    updateCoordiates=(coordinates)=>{
        this.setState({ coordinates });
    }
    geoCodeLocation = location => {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            this.cacher.cachValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject("ERROR");
          }
        });
      });
    };
    geoCodedLocation = () => {
      const location = this.props.location;

      // if location is chched is cached return values

      if (this.cacher.isVlaueCached(location)) {
        this.updateCoordiates( this.cacher.getCachedValue(location))
      }
      //else geocode location
      else {
        this.geoCodeLocation(location).then(
          coordinates => {
            this.updateCoordiates( coordinates)
          },
          error => {
            this.setState({ isError: true });
          }
        );
      }
    };
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}
export const MapWithGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(mapComponent))
);
