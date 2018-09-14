import React, { Component } from 'react';
import { Route, BrowserRouter as Router, } from 'react-router-dom'
import './App.css';
import InputForm from './components/InputForm.js';
import Map from './components/Map.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Map} />
                    <Route path="/form" component={InputForm} />
                </div>
            </Router>
        );
    }
}

export default App;
