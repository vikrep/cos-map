import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Map extends Component {
    render() {
        return (
            <div className="map">
                <h2>Here should be Map</h2>
                <Link to="/form"><Button floated="center" color="blue">Go to Form Data</Button></Link>
            </div>

        )
    }
}

export default Map