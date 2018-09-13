import React from 'react'
import { Button, Form, FormInput, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import './styles/inputform.css'

class InputForm extends React.Component {

    constructor(props) {
        super(props)
      
        this.state = {
            temp_address: this.initialState(),
            address: []
        }
        this.autocomplete = null

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleChange(event) {
        let newstate = this.state.temp_address
        newstate[event.target.name] = event.target.value
        this.setState({ temp_address: newstate })
    }

    handleSubmit(event) {
        event.preventDefault()
              this.setState({ address: this.state.address.concat(this.state.temp_address) });
              this.setState({temp_address: this.initialState()})

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
                                <Button onSubmit={this.handleSubmit}>Submit</Button>
                            </Form>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        )
    }

}

export default InputForm