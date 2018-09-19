import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
//you should add your API_key and put this line to /source/components/config/googleApi.js
import { API_GOOGLE } from './config/googleApi.js'



const markericon = { url: 'https://cityofsanctuary.org/wp-content/uploads/2018/09/8506DB46-675C-48E8-9081-C4672BF226D6.png', size: {width: 45, height: 46}, anchor: {x: 17, y: 34}, scaledSize: {width: 15, height: 15} }
const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpen: false, }),
         { onToggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen, })
      }),
    withProps({
        googleMapURL: API_GOOGLE,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 53.5500, lng: -2.4333 }}>
        {props.isMarkerShown && (
            <Marker icon={markericon} position={{ lat: 53.485905, lng: -2.242330 }} onClick={props.onToggleOpen} />
        )}
        {props.isOpen && <InfoWindow  position={{ lat: 53.485905, lng: -2.242330 }} onCloseClick={props.onToggleOpen}>
        <div className="marker-text">Hello world! This is test mode pop-up window</div>
      </InfoWindow>}
    </GoogleMap>
));


class MapContainer extends Component {
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 1000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }
    render() {
        return (
            <div className="map">
                <h2>Here should be Map</h2>
                <MyMapComponent isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick} />
                <Link to="/form"><Button floated="center" color="blue">Go to Form Data</Button></Link>
            </div>
        )
    }
}

export default MapContainer