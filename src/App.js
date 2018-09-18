import React, { Component } from 'react';
import { Route, BrowserRouter as Router, } from 'react-router-dom'
import './App.css';
import InputForm from './components/InputForm.js';
import MapContainer from './components/MapContainer.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={MapContainer} />
                    <Route path="/form" component={InputForm} />
                </div>
            </Router>
        );
    }
}

export default App;
