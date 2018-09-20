import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
//you should add your API_key and put this line to /source/components/config/googleApi.js
import { API_GOOGLE } from './config/googleApi.js'
import firebase from 'firebase'
require("firebase/firestore");


var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

const markericon = { url: 'https://cityofsanctuary.org/wp-content/uploads/2018/09/8506DB46-675C-48E8-9081-C4672BF226D6.png', size: { width: 45, height: 46 }, anchor: { x: 17, y: 34 }, scaledSize: { width: 15, height: 15 } }
const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }),
        {
            onToggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen, })
        }),
    withProps({
        googleMapURL: API_GOOGLE,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 53.5500, lng: -2.4333 }}>
        {props.isMarkerShown &&
            (props.address.map((marker, i) => (
                <Marker
                    key={`marker-${i}`}
                    icon={markericon}
                    position={{ lat: parseFloat(props.address[i].latitude), lng: parseFloat(props.address[i].longitude) }}
                    onClick={() => { props.showInfo(i) }}>
                    {(props.showInfoIndex === i) &&
                        <InfoWindow key={`infowindow-${i}`} position={{ lat: parseFloat(props.address[i].latitude) }} onCloseClick={props.onToggleOpen}>
                            <div className="marker-text">
                                <p>{`${props.address[i].name}, ${props.address[i].street_address},
                                    ${props.address[i].city}, ${props.address[i].post_code}`}
                                </p></div>
                        </InfoWindow>}
                </Marker>)))}
    </GoogleMap>
));

class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isMarkerShown: true,
            showInfoIndex: null,
            address: []
        }
    }
    componentDidMount() {
        let arrayOfaddress = []
        db.collection("City of Sanctuar")
            .onSnapshot(
                querySnapshot => {
                    querySnapshot.forEach(function(doc) {
                        let newelement = { id: doc.id }
                        let obj = doc.data()
                        obj = { ...obj, ...newelement }
                        arrayOfaddress.push(obj)
                    });
                    this.setState({ address: arrayOfaddress }, () => { arrayOfaddress = [] })
                })
    }

    showInfo = (e) => { this.setState({ showInfoIndex: e }) }

    render() {
        return (
            <div className="map">
                <h2>Map City of Sanctuary</h2>
                <MyMapComponent isMarkerShown={this.state.isMarkerShown}
                    address={this.state.address} showInfo={this.showInfo}
                    showInfoIndex={this.state.showInfoIndex} />
                <Link to="/form"><Button floated="right" color="blue">Go to Form Data</Button></Link>
            </div>
        )
    }
}

export default MapContainer