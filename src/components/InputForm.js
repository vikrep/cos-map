import React from 'react'
import { Button, Form, FormInput, Grid, GridRow, GridColumn, Divider, Popup } from 'semantic-ui-react'
import './styles/inputform.css'
import ListForm from './ListForm'
import firebase from 'firebase'
import { config } from './config/firebase.js'
require("firebase/firestore");



firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});


class InputForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            temp_address: this.initialState(),
            address: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDeleteRow = this.handleDeleteRow.bind(this)
    }
    initialState() {
        return {
            name: '',
            street_address: '',
            city: '',
            county: '',
            post_code: '',
            email: '',
            schools: '',
            universites: '',
            theatre: '',
            googleMapLink: ''
        }
    }
    componentDidMount() {
        this.handleLoad()
    }
    handleLoad = () => {
        let arrayOfaddress = []
        db.collection("City of Sanctuar")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let newelement = { id: doc.id }
                    let obj = doc.data()
                    obj = { ...obj, ...newelement }
                    arrayOfaddress.push(obj)
                });
            })
            .then(() => { this.setState({ address: arrayOfaddress }) })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    handleChange = (event) => {
        let newstate = this.state.temp_address
        newstate[event.target.name] = event.target.value
        this.setState({ temp_address: newstate })
    }

    // Handler for deleting listform row
    handleDeleteRow = (i) => {
        this.setState((prevState) => ({ address: prevState.address.filter((item, index) => (i !== index)) }))
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ address: this.state.address.concat(this.state.temp_address) });
        this.setState({ temp_address: this.initialState() })
        this.handleSend()

    }
    handleSend = () => {
        db.collection("City of Sanctuar").add(
            this.state.temp_address
        )
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div>
                <h3>Add New City of Sanctuar</h3>
                <Grid>
                    <GridRow centered>
                        <GridColumn width={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormInput
                                    type="text"
                                    name={"name"}
                                    value={this.state.temp_address.name}
                                    placeholder={"Name"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="text"
                                    name={"street_address"}
                                    value={this.state.temp_address.street_address}
                                    placeholder={"Street Address"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="text"
                                    name={"city"}
                                    value={this.state.temp_address.city}
                                    placeholder={"City"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="text"
                                    name={"county"}
                                    value={this.state.temp_address.county}
                                    placeholder={"County"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="text"
                                    name={"post_code"}
                                    value={this.state.temp_address.post_code}
                                    placeholder={"Postcode"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="text"
                                    name={"email"}
                                    value={this.state.temp_address.email}
                                    placeholder={"E-mail:"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="number" min={1}
                                    name={"schools"}
                                    value={this.state.temp_address.schools}
                                    placeholder={"Schools"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="number" min={1}
                                    name={"universites"}
                                    value={this.state.temp_address.universites}
                                    placeholder={"Universites"}
                                    onChange={this.handleChange} />
                                <FormInput
                                    type="number" min={1}
                                    name={"theatre"}
                                    value={this.state.temp_address.theatre}
                                    placeholder={"Theatre"}
                                    onChange={this.handleChange} />
                                <Popup
                                    trigger={<Button onSubmit={this.handleSubmit}>Save record</Button>}
                                    content="Save this record to DataBase"
                                />
                            </Form>
                            <Divider horizontal><h4>List of City of Sanctuar</h4></Divider>
                            <ListForm listform={this.state.address} handleDeleteRow={this.handleDeleteRow} />
                            <Divider horizontal></Divider>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        )
    }

}

export default InputForm